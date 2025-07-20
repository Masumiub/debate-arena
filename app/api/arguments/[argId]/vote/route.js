import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import clientPromise from '../../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { argId } = params;
  const userEmail = session.user.email;
  const client = await clientPromise;
  const db = client.db('debateArenaDB');

  const argument = await db.collection('arguments').findOne({ _id: new ObjectId(argId) });
  if (!argument) return new Response('Argument not found', { status: 404 });

  // Prevent self-voting
  if (argument.author.email === userEmail) {
    return new Response('You cannot vote on your own argument.', { status: 403 });
  }

  // Check if already voted
  const alreadyVoted = await db.collection('votes').findOne({
    argumentId: argId,
    userEmail
  });

  if (alreadyVoted) {
    return new Response('You have already voted.', { status: 400 });
  }

  // Register vote
  await db.collection('arguments').updateOne(
    { _id: new ObjectId(argId) },
    { $inc: { votes: 1 } }
  );

  await db.collection('votes').insertOne({
    argumentId: argId,
    userEmail,
    createdAt: new Date()
  });

  return NextResponse.json({ success: true });
}
