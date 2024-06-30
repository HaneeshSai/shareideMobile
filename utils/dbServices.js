import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("shareide");

const createDb = async () => {
  try {
    await db.execAsync(`

      DROP TABLE IF EXISTS user;

      CREATE TABLE IF NOT EXISTS user (
        id INTEGER NOT NULL PRIMARY KEY,
        name TEXT,
        phone TEXT,
        gender TEXT,
        age INTEGER,
        type TEXT,
        vehicle TEXT,
        contacts TEXT,
        status TEXT
      );

      CREATE TABLE IF NOT EXISTS rideHistory (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        pickup TEXT,
        destination TEXT,
        type TEXT,
        fare TEXT,
        partner INTEGER,
        date TEXT
      );
    `);
    console.log("Database tables created successfully.");
  } catch (error) {
    console.error("Error creating database tables:", error);
  }
};

const insert = async (params) => {
  const { table, data } = params;
  console.log("enterinr");
  try {
    const columns = Object.keys(data);
    const values = Object.values(data);
    const placeholders = columns.map(() => "?").join(", ");

    const query = `INSERT INTO ${table} (${columns.join(
      ", "
    )}) VALUES (${placeholders})`;
    await db.runAsync(query, values);
  } catch (error) {
    console.error("Error inserting data:", error);
  }
};

const update = async (params) => {
  const { table, data, where } = params;

  try {
    const setClause = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(data);

    const conditionClause = Object.keys(where)
      .map((key) => `${key} = ?`)
      .join(" AND ");
    const conditionValues = Object.values(where);

    const query = `UPDATE ${table} SET ${setClause} WHERE ${conditionClause}`;
    await db.runAsync(query, [...values, ...conditionValues]);
  } catch (error) {
    console.error("Error updating data:", error);
  }
};

const select = async (params) => {
  const { table, columns, where } = params;

  try {
    const columnsClause = columns ? columns.join(", ") : "*";

    const conditionClause = where
      ? "WHERE " +
        Object.keys(where)
          .map((key) => `${key} = ?`)
          .join(" AND ")
      : "";
    const conditionValues = where ? Object.values(where) : [];

    const query = `SELECT ${columnsClause} FROM ${table} ${conditionClause}`;
    return await db.getAllAsync(query, conditionValues);
  } catch (error) {
    console.error("Error selecting data:", error);
  }
};

module.exports = {
  createDb,
  insert,
  update,
  select,
};
