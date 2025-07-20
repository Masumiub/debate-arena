// /api/debates/[id]
//import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'

export async function GET(request, { params }) {
  const { id } = params;

  try {
    const client = await clientPromise;
    const db = client.db('debateArenaDB');
    const debate = await db.collection('debates').findOne({ _id: new ObjectId(id) });

    if (!debate) {
      return new Response('Debate not found', { status: 404 });
    }

    return Response.json(debate);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}