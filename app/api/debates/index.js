import clientPromise from '../../../lib/mongodb'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('debateArenaDB')
  const { id } = req.query

  if (req.method === 'GET') {
    const debate = await db.collection('debates').findOne({ _id: id })
    if (!debate) return res.status(404).json({ message: 'Debate not found' })
    res.json(debate)
  }
}