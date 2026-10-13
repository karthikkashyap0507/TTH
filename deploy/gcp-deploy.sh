#!/usr/bin/env bash
# Deploy The Scale House website to Google Cloud.
#
#   Cloud Run (Mumbai, asia-south1)  ← runs the site from the Dockerfile
#   Global HTTPS load balancer       ← one static IP for thescalehouse.in + www
#   Google-managed SSL certificate   ← free, issued and renewed automatically
#                                      (nothing to download or install)
#
# Run from the repo root in Cloud Shell:   bash deploy/gcp-deploy.sh
# Safe to re-run after code changes: existing resources are kept, the site is rebuilt.
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-$(gcloud config get-value project 2>/dev/null)}"
REGION="${REGION:-asia-south1}"
SERVICE="${SERVICE:-thescalehouse}"
DOMAINS="thescalehouse.in,www.thescalehouse.in"

step() { printf '\n\033[1;31m==> %s\033[0m\n' "$*"; }
exists() { "$@" >/dev/null 2>&1; }

if [ -z "$PROJECT_ID" ]; then
  echo "No Google Cloud project selected. Run: gcloud config set project YOUR_PROJECT_ID"
  exit 1
fi
if [ ! -f Dockerfile ]; then
  echo "Run this from the website folder (the one with the Dockerfile)."
  exit 1
fi
gcloud config set project "$PROJECT_ID" >/dev/null
echo "Project: $PROJECT_ID   Region: $REGION   Service: $SERVICE"

step "1/7  Enabling Google Cloud APIs"
gcloud services enable run.googleapis.com cloudbuild.googleapis.com \
  artifactregistry.googleapis.com compute.googleapis.com || {
  echo
  echo "Couldn't enable the APIs. If the error mentions billing, link a billing account and re-run:"
  echo "  gcloud billing accounts list"
  echo "  gcloud billing projects link $PROJECT_ID --billing-account=YOUR_BILLING_ACCOUNT_ID"
  exit 1
}

step "2/7  Allowing Cloud Build to build the site"
PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
BUILD_SA="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"
for attempt in 1 2 3 4 5 6; do
  if gcloud projects add-iam-policy-binding "$PROJECT_ID" --member="serviceAccount:$BUILD_SA" \
    --role="roles/cloudbuild.builds.builder" --condition=None --quiet >/dev/null; then
    break
  fi
  [ "$attempt" = 6 ] && { echo "Couldn't grant the build permission to $BUILD_SA"; exit 1; }
  echo "Waiting for the default service account to appear…"
  sleep 10
done

step "3/7  Building and deploying to Cloud Run (takes about 3–6 minutes)"
gcloud run deploy "$SERVICE" --source . --region "$REGION" --allow-unauthenticated \
  --port 8080 --memory 512Mi --cpu 1 --min-instances 0 --max-instances 5 --quiet

step "4/7  Reserving a static IP address"
exists gcloud compute addresses describe tsh-ip --global ||
  gcloud compute addresses create tsh-ip --global --ip-version=IPV4
IP="$(gcloud compute addresses describe tsh-ip --global --format='value(address)')"

step "5/7  Connecting the load balancer to Cloud Run"
exists gcloud compute network-endpoint-groups describe tsh-neg --region="$REGION" ||
  gcloud compute network-endpoint-groups create tsh-neg --region="$REGION" \
    --network-endpoint-type=serverless --cloud-run-service="$SERVICE"
if ! exists gcloud compute backend-services describe tsh-backend --global; then
  gcloud compute backend-services create tsh-backend --global --load-balancing-scheme=EXTERNAL_MANAGED
  gcloud compute backend-services add-backend tsh-backend --global \
    --network-endpoint-group=tsh-neg --network-endpoint-group-region="$REGION"
fi
exists gcloud compute url-maps describe tsh-urlmap --global ||
  gcloud compute url-maps create tsh-urlmap --global --default-service=tsh-backend

step "6/7  SSL certificate + HTTPS (443)"
exists gcloud compute ssl-certificates describe tsh-cert --global ||
  gcloud compute ssl-certificates create tsh-cert --global --domains="$DOMAINS"
exists gcloud compute target-https-proxies describe tsh-https-proxy --global ||
  gcloud compute target-https-proxies create tsh-https-proxy --global \
    --url-map=tsh-urlmap --ssl-certificates=tsh-cert
exists gcloud compute forwarding-rules describe tsh-https-rule --global ||
  gcloud compute forwarding-rules create tsh-https-rule --global --load-balancing-scheme=EXTERNAL_MANAGED \
    --address=tsh-ip --target-https-proxy=tsh-https-proxy --ports=443

step "7/7  Redirecting http:// to https:// (80)"
if ! exists gcloud compute url-maps describe tsh-http-redirect --global; then
  cat >/tmp/tsh-http-redirect.yaml <<'YAML'
name: tsh-http-redirect
defaultUrlRedirect:
  redirectResponseCode: MOVED_PERMANENTLY_DEFAULT
  httpsRedirect: true
YAML
  gcloud compute url-maps import tsh-http-redirect --global --source=/tmp/tsh-http-redirect.yaml --quiet
fi
exists gcloud compute target-http-proxies describe tsh-http-proxy --global ||
  gcloud compute target-http-proxies create tsh-http-proxy --global --url-map=tsh-http-redirect
exists gcloud compute forwarding-rules describe tsh-http-rule --global ||
  gcloud compute forwarding-rules create tsh-http-rule --global --load-balancing-scheme=EXTERNAL_MANAGED \
    --address=tsh-ip --target-http-proxy=tsh-http-proxy --ports=80

RUN_URL="$(gcloud run services describe "$SERVICE" --region "$REGION" --format='value(status.url)')"
CERT_STATUS="$(gcloud compute ssl-certificates describe tsh-cert --global --format='value(managed.status)')"

cat <<EOF

────────────────────────────────────────────────────────────────────
 Deployed.

 Preview link (works now):  $RUN_URL
 Load balancer IP:          $IP

 Add these 2 DNS records where you bought thescalehouse.in.
 Delete any other A / AAAA / CNAME records for "@" and "www" first.
 Keep MX and TXT records (they run your email).

   Type   Name   Value
   A      @      $IP
   A      www    $IP

 SSL certificate: $CERT_STATUS
 It turns ACTIVE on its own 15–60 minutes after the DNS records point here.
 Check it with:
   gcloud compute ssl-certificates describe tsh-cert --global --format="yaml(managed)"
────────────────────────────────────────────────────────────────────
EOF
