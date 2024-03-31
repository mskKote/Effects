import FaunaDB from "faunadb";
import type { NextApiRequest, NextApiResponse } from "next";
import FaunaDBServer from "../../../src/utils/faunaDB";

async function CreatePage(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") res.send("Use POST");

  const result = await FaunaDBServer.client.query(
    FaunaDB.Create(FaunaDB.Collection("pages"), { data: req.body })
  );
  const ref = (result as any).ref;
  res.send(ref);
}

export default CreatePage;
