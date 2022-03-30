import type { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST")
    //TODO: закидывает в Fauna данные из req.body, затем возвращает ID
    res.status(200).json({ name: 'John Doe' })
}
