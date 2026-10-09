import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

/* ==========================================================================
   Tiny data store for project enquiries ("leads").

   - Default: a JSON file at .data/db.json — perfect for local dev or a
     single VPS / Node server (`npm start`).
   - Serverless (Vercel, Netlify…): set UPSTASH_REDIS_REST_URL and
     UPSTASH_REDIS_REST_TOKEN and it switches to Upstash Redis automatically
     (free tier is plenty). No extra packages needed.
   ========================================================================== */

export type Lead = {
  id: string;
  createdAt: string;
  service: string;
  budget: string;
  name: string;
  phone: string;
  email?: string;
  note?: string;
  source?: string;
};

type DB = { leads: Lead[] };

interface Store {
  addLead(lead: Lead): Promise<void>;
  listLeads(): Promise<Lead[]>;
}

/* ------------------------------ JSON file ------------------------------ */
class FileStore implements Store {
  private file = path.join(process.cwd(), ".data", "db.json");
  private queue: Promise<unknown> = Promise.resolve();

  private async read(): Promise<DB> {
    try {
      const raw = await fs.readFile(this.file, "utf8");
      const db = JSON.parse(raw) as Partial<DB>;
      return { leads: db.leads ?? [] };
    } catch {
      return { leads: [] };
    }
  }

  private async write(db: DB) {
    await fs.mkdir(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
    await fs.rename(tmp, this.file);
  }

  /** Serialise writes so two requests can't clobber each other. */
  private mutate<T>(fn: (db: DB) => T | Promise<T>): Promise<T> {
    const run = this.queue.then(async () => {
      const db = await this.read();
      const result = await fn(db);
      await this.write(db);
      return result;
    });
    this.queue = run.catch(() => undefined);
    return run;
  }

  addLead(lead: Lead) {
    return this.mutate((db) => {
      db.leads.unshift(lead);
    });
  }
  async listLeads() {
    return (await this.read()).leads;
  }
}

/* ------------------------------ Upstash ------------------------------ */
class UpstashStore implements Store {
  constructor(
    private url: string,
    private token: string,
  ) {}

  private async cmd<T = unknown>(...args: (string | number)[]): Promise<T> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(args),
      cache: "no-store",
    });
    const data = (await res.json()) as { result?: T; error?: string };
    if (!res.ok || data.error) throw new Error(`Upstash error: ${data.error ?? res.status}`);
    return data.result as T;
  }

  async addLead(lead: Lead) {
    await this.cmd("LPUSH", "tsh:leads", JSON.stringify(lead));
  }
  async listLeads() {
    const rows = await this.cmd<string[]>("LRANGE", "tsh:leads", 0, 499);
    return rows.map((r) => JSON.parse(r) as Lead);
  }
}

let instance: Store | null = null;

export function store(): Store {
  if (!instance) {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    instance = url && token ? new UpstashStore(url, token) : new FileStore();
  }
  return instance;
}

/** Short, human-friendly IDs like TSH-7K3QX (no 0/O/1/I confusion). */
export function makeId(prefix = "TSH") {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `${prefix}-${Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("")}`;
}
