'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AllDebates() {
  const [debates, setDebates] = useState([])
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    const fetchDebates = async () => {
      const res = await fetch('/api/debates')
      const data = await res.json()
      setDebates(data)
    }
    fetchDebates()
  }, [])

  const handleJoin = (id) => {
    if (!session) {
      router.push('/Login') 
    } else {
      router.push(`/debate/${id}`)
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🔥 Current Debates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-10">
        {debates.slice(0, 6).map((debate) => (
          <div key={debate._id} className="card bg-base-100  shadow-sm">
            <figure>
              <img src={debate.image || 'https://via.placeholder.com/600x300?text=Debate'} alt={debate.title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{debate.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{debate.description}</p>
              <div className="text-xs mt-2 space-x-2 text-accent">
                {debate.tags.map((tag, index) => (
                  <span key={index} className="badge badge-outline">{tag}</span>
                ))}
              </div>
              <p className="text-sm mt-2">⏳ Duration: <span className="font-medium">{debate.duration}</span></p>
              <p className="text-sm">📂 Category: {debate.category}</p>
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-primary btn-sm" onClick={() => handleJoin(debate._id)}>
                 💬 Join the Debate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center'>
            <Link href='/all-debates' className='btn btn-primary rounded-full my-10'>Show More</Link>
      </div>
    </div>
  )
}
