

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import moment from 'moment';
import { getToken } from 'next-auth/jwt';

export async function DELETE(request, { params }) {
  const token = await getToken({ req: request });
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { argId } = params;

  try {
    const client = await clientPromise;
    const db = client.db('debateArenaDB');

    const argument = await db.collection('arguments').findOne({ _id: new ObjectId(argId) });

    if (!argument) {
      return new Response('Argument not found', { status: 404 });
    }

    // Only author can delete
    if (argument.author.email !== token.email) {
      return new Response('Forbidden', { status: 403 });
    }

    // Check 5-minute limit from createdAt field
    const postedAt = moment(argument.createdAt);
    const now = moment();
    if (now.diff(postedAt, 'minutes') > 5) {
      return new Response('Delete window expired', { status: 403 });
    }

    const result = await db.collection('arguments').deleteOne({ _id: new ObjectId(argId) });

    return NextResponse.json({ success: result.deletedCount === 1 });
  } catch (error) {
    console.error('Failed to delete argument:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
/*
export async function DELETE(request, { params }) {
  const session = await getServerSession({ req: request }, authOptions);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { argId } = params;

  try {
    const client = await clientPromise;
    const db = client.db('debateArenaDB');

    const argument = await db.collection('arguments').findOne({ _id: new ObjectId(argId) });

    if (!argument) {
      return new Response('Argument not found', { status: 404 });
    }

    if (argument.author.email !== session.user.email) {
      return new Response('Forbidden', { status: 403 });
    }

    const postedAt = moment(argument.createdAt);
    const now = moment();
    if (now.diff(postedAt, 'minutes') > 5) {
      return new Response('Delete window expired', { status: 403 });
    }

    const result = await db.collection('arguments').deleteOne({ _id: new ObjectId(argId) });

    return NextResponse.json({ success: result.deletedCount === 1 });
  } catch (error) {
    console.error('Failed to delete argument:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}*/
