import type { NextApiRequest, NextApiResponse } from 'next'
import { Collection, Get, Ref } from "faunadb"
import Fauna from '../../../src/utils/faunaDB'


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await Fauna.client.query(
    Get(
      Ref(
        Collection("pages"),
        String(req.query.pageId)
      )
    )
  ).catch(res.send)

  res.send(result)
}