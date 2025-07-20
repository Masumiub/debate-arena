import clientPromise from '../../../lib/mongodb'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../api/auth/[...nextauth]/route' // see note below



export async function POST(req) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const debateData = await req.json()

  try {
    const client = await clientPromise
    const db = client.db('debateArenaDB') // defaults to DB from MONGODB_URI
    const debatesCollection = db.collection('debates')

    const result = await debatesCollection.insertOne(debateData)

    return NextResponse.json(result, { status: 201 })
  } catch (error) {
    console.error('Failed to insert debate:', error)
    return NextResponse.json({ message: 'Failed to create debate' }, { status: 500 })
  }
}


export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('debateArenaDB')
    const debates = await db.collection('debates').find({}).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(debates)
  } catch (error) {
    console.error('Failed to fetch debates:', error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

