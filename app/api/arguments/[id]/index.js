//import clientPromise from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
//import { authOptions } from '@/auth'
import { ObjectId } from 'mongodb'
import clientPromise from '../../../../lib/mongodb'
import { authOptions } from '../../auth/[...nextauth]/route'

export default async function handler(req, res) {
  const client = await clientPromise
  const db = client.db('debateArenaDB')
  const { id } = req.query
  const session = await getServerSession(req, res, authOptions)

  const argument = await db.collection('arguments').findOne({ _id: new ObjectId(id) })
  if (!argument) return res.status(404).json({ message: 'Argument not found' })

  if (!session || session.user.email !== argument.author.email) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const now = new Date()
  const createdAt = new Date(argument.createdAt)
  const diffMinutes = (now - createdAt) / (1000 * 60)
  if (diffMinutes > 5) return res.status(403).json({ message: 'Edit/delete window expired' })

  if (req.method === 'PATCH') {
    const { content } = req.body
    const result = await db.collection('arguments').updateOne(
      { _id: new ObjectId(id) },
      { $set: { content } }
    )
    res.json(result)
  }

  if (req.method === 'DELETE') {
    const result = await db.collection('arguments').deleteOne({ _id: new ObjectId(id) })
    res.json(result)
  }
}