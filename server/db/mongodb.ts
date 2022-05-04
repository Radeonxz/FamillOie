import { MongoClient } from "https://deno.land/x/mongo@v0.29.4/mod.ts";

import { config } from "./../config/config.ts";

const { MONGODB_URI, MONGODB_DB_NAME } = config;

const client = new MongoClient();

await client.connect(MONGODB_URI);

const db = client.database(MONGODB_DB_NAME);

console.log(`DB: ${MONGODB_DB_NAME} connected.`);

export default db;
