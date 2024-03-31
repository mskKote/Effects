import faunaDB from "faunadb";

class FaunaDBServer {
  static client = new faunaDB.Client({
    secret: process.env.FAUNA_SECRET as string,
    domain: "db.eu.fauna.com",
  });
}

export default FaunaDBServer;
