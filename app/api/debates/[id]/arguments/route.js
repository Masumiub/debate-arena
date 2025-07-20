
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import clientPromise from '../../../../../lib/mongodb'
import { authOptions } from '../../../auth/[...nextauth]/route'


export async function GET(request, { params }) {
  const client = await clientPromise
  const db = client.db('debateArenaDB')
  const { id } = await params

  const args = await db.collection('arguments').find({ debateId: id }).toArray()
  return NextResponse.json(args)
}

export async function POST(req, { params }) {
  const { id } = params;
  const body = await req.json();
  const { content, side, author } = body;

  if (!content || !author?.name || !author?.email) {
    return new Response('Invalid data', { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('debateArenaDB');
    const argument = {
      content,
      side,
      author,
      debateId: id,
      createdAt: new Date(),
      votes: 0,
    };

    const result = await db.collection('arguments').insertOne(argument);
    return Response.json(result);
  } catch (error) {
    console.error(error);
    return new Response('Internal Server Error', { status: 500 });
  }
}



// export async function DELETE(request, { params }) {
//   const session = await getServerSession(authOptions);
//   if (!session) {
//     return new Response('Unauthorized', { status: 401 });
//   }

//   const { argId } = params;

//   try {
//     const client = await clientPromise;
//     const db = client.db('debateArenaDB');

//     // Optional: Ensure the user deleting the argument is the author
//     const argument = await db.collection('arguments').findOne({ _id: new ObjectId(argId) });

//     if (!argument) {
//       return new Response('Argument not found', { status: 404 });
//     }

//     if (argument.author.email !== session.user.email) {
//       return new Response('Forbidden', { status: 403 });
//     }

//     const result = await db.collection('arguments').deleteOne({ _id: new ObjectId(argId) });

//     return Response.json({ success: result.deletedCount === 1 });
//   } catch (error) {
//     console.error('Failed to delete argument:', error);
//     return new Response('Internal Server Error', { status: 500 });
//   }
// }