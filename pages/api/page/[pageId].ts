import { Collection, Get, Ref } from "faunadb";
import type { NextApiRequest, NextApiResponse } from "next";
import Fauna from "@utils/faunaDB";

async function GetPage(req: NextApiRequest, res: NextApiResponse) {
  const result = await Fauna.client
    .query(Get(Ref(Collection("pages"), String(req.query.pageId))))
    .catch(res.send);

  res.send(result);
}

export default GetPage;
