import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";



const client = await MongoClient.connect(process.env.MONGODB_URI);
const usersCollection = client.db('debateArenaDB').collection("users");

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: {},
//         password: {},
//       },
//       async authorize(credentials) {
//         const user = await usersCollection.findOne({ email: credentials.email });
//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(credentials.password, user.password);
//         if (!isValid) throw new Error("Incorrect password");

//         return {
//           id: user._id,
//           name: user.name,
//           email: user.email,
//         };
//       },
//     }),
//   ],
//   //secret: process.env.NEXTAUTH_SECRET,
//   session: { strategy: "jwt" },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.user = user;
//       return token;
//     },
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//   },
// };

//const handler = NextAuth(authOptions);

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // async authorize(credentials) {
       
      //   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/custom-auth`, {
      //     method: "POST",
      //     body: JSON.stringify(credentials),
      //     headers: { "Content-Type": "application/json" },
      //   })
      //   const user = await res.json()

      //   if (res.ok && user) {
      //     return user
      //   }
      //   return null
      // },
      async authorize(credentials) {
        const client =  await MongoClient.connect(process.env.MONGODB_URI);
        const users = client.db('debateArenaDB').collection("users");

        const user = await users.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image || null,
        };
      },
    }),
  ],

  
  callbacks: {
    async jwt({ token, user }) {
      
      if (user) {
        token.name = user.name
        token.email = user.email
        token.picture = user.image
      }
      return token
    },
    async session({ session, token }) {
      
      session.user.name = token.name
      session.user.email = token.email
      session.user.image = token.picture
      return session
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/Login',
  }
}


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
