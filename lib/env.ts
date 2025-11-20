// Load .env.local first, then fallback to .env.
// Do not override any already-set environment variables (e.g., from system or hosting env).
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

function loadIfExists(filename: string) {
    const full = path.resolve(process.cwd(), filename);
    if (fs.existsSync(full)) {
        const contents = fs.readFileSync(full, 'utf8');
        const parsed = dotenv.parse(contents) as Record<string, string>;
        // Only set variables that are not already present
        for (const [k, v] of Object.entries(parsed)) {
            if (process.env[k] === undefined) {
                process.env[k] = v;
            }
        }
    }
}

// Load .env.local (developer overrides) first, then .env
loadIfExists('.env.local');
loadIfExists('.env');

export {};
