import type { NextApiRequest, NextApiResponse } from 'next'

export default ({ query: { pageId } }: NextApiRequest, res: NextApiResponse) => {
  //TODO: запрос в Fauna для доставки поста с параметром запроса
  res.status(200).json({ pageId })
}