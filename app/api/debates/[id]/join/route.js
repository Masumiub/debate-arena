import { getServerSession } from 'next-auth'
import clientPromise from '../../../../../lib/mongodb'
import { authOptions } from '../../../auth/[...nextauth]/route'
import { NextResponse } from 'next/server'


export async function POST(request, { params }) {
  //const session = await getServerSession(request, authOptions)
const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const { side } = body
  const email = session.user.email

  const client = await clientPromise
  const db = client.db('debateArenaDB')

  const existing = await db.collection('participants').findOne({ debateId: id, email })
  if (existing) {
    return NextResponse.json({ message: 'Already joined' }, { status: 400 })
  }

  const result = await db.collection('participants').insertOne({ debateId: id, email, side })
  return NextResponse.json(result)
}
