import mysql, { RowDataPacket, ResultSetHeader } from "mysql2";

interface SQLQuery {
  queryText: string;
  queryParams: (string | number)[];
}

type QueryResult<T> = Promise<{ resultSetHeader: ResultSetHeader; results: T }>;

export { SQLQuery, QueryResult };
