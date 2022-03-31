import { Create, Collection } from 'faunadb'
import type { NextApiRequest, NextApiResponse } from 'next'
import FaunaDBServer from '../../../src/utils/faunaDB'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") res.send("Use POST")

  const result = await FaunaDBServer.client.query(
    Create(
      Collection("pages"),
      { data: req.body }
    )
  )
  const ref = (result as any).ref
  res.send(ref)
}