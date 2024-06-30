import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("shareide");

export default db;
