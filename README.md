# 🗣️ Debate Arena

A full-stack web application where users can join or create public debates, choose sides (Support/Oppose), share their arguments, vote on others' points, and engage in meaningful discussions. Built with **Next.js 15**, **Tailwind CSS**, **MongoDB**, and **NextAuth.js**, the platform fosters critical thinking through organized, user-moderated debates.

## 🌐 Live Link
👉 [Visit Debate Arena](https://debate-arena-coral.vercel.app/)

---

## ✨ Features

- 🔐 Google & Email/Password Authentication via **NextAuth.js**
- 🧠 Create or join existing debates
- ⚖️ Choose a side: **Support** or **Oppose**
- ✍️ Add arguments with edit/delete within 5 minutes
- 👍 One-vote-per-user per argument (except your own)
- 🧭 Publicly accessible debates and discussions
- 👤 Protected routes for authenticated actions
- 🔍 SEO-friendly routing using **App Router** (Next.js 15)

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [MongoDB (native driver)](https://www.mongodb.com/)
- **Form Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)
- **Hosting**: [Vercel](https://vercel.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

---

## 📦 Packages Used

- "next": "15.x",
- "react": "18.x",
- "next-auth": "^4.x",
- "react-hook-form": "^7.x",
- "zod": "^3.x",
- "axios": "^1.x",
- "mongodb": "^6.x",
- "tailwindcss": "^3.x",
- "react-icons": "^4.x"


## 🚀 How to Run Locally
1. Clone the repository
- git clone https://github.com/Masumiub/debate-arena.git
- cd debate-arena

2. Install dependencies
- npm install

3. Configure environment variables
- Create a .env.local file in the root and add the following:

- NEXTAUTH_SECRET=your_random_secret
- NEXTAUTH_URL=http://localhost:3000

# Google Auth
- GOOGLE_CLIENT_ID=your_google_client_id
- GOOGLE_CLIENT_SECRET=your_google_client_secret

# MongoDB
- MONGODB_URI=your_mongodb_connection_string

4. Run the development server
- npm run dev