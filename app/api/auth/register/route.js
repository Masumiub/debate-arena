import { hash } from "bcryptjs";
import { MongoClient } from "mongodb";

export async function POST(req) {
  const { name, email, password, image  } = await req.json();

  if (!email || !password || !name) {
    return new Response(JSON.stringify({ message: 'Missing fields' }), { status: 400 });
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const usersCollection = client.db('debateArenaDB').collection("users");

  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    await client.close();
    return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  const result = await usersCollection.insertOne({
    name,
    email,
    image,
    password: hashedPassword,
  });

  await client.close();
  return new Response(JSON.stringify({ message: 'User registered' }), { status: 201 });
}
