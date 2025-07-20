'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function AllDebatesPage() {
  const [debates, setDebates] = useState([])
  const { data: session, status } = useSession()
  const [filteredDebates, setFilteredDebates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('newest')
  const [loading, setLoading] = useState(true);
  const router = useRouter()

  useEffect(() => {
    const fetchDebates = async () => {
      try {
        const res = await fetch('../api/debates')
        const data = await res.json()
        setDebates(data)
      } catch (error) {
        console.error('Failed to fetch debates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDebates()
  }, [])


  // Filter and sort logic
  useEffect(() => {
    let filtered = debates.filter((debate) => {
      const query = searchTerm.toLowerCase()
      return (
        debate.title.toLowerCase().includes(query) ||
        debate.category.toLowerCase().includes(query) ||
        debate.tags?.some((tag) => tag.toLowerCase().includes(query))
      )
    })

    // Sorting
    if (sortOption === 'newest') {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sortOption === 'shortestDuration') {
      const getDurationHours = (debate) =>
        parseInt(debate.duration.replace('h', '')) || 1;

      filtered = filtered.sort((a, b) => getDurationHours(a) - getDurationHours(b));
    }

    setFilteredDebates(filtered)
  }, [searchTerm, sortOption, debates])

  const handleJoin = (id) => {
    if (!session) {
      router.push('/Login') // 
    } else {
      router.push(`/debate/${id}`)
    }
  }

  return (
    <div className="p-6 w-full md:w-8/12 mx-auto">

      <div className='mt-15 mb-10'>

        <h1 className="text-4xl font-bold mb-6 text-center">💬 Browse & Join Debates</h1>

        <p className="text-center text-gray-500 mb-6">
          Explore trending debates and join the discussion. Use filters to search by title, tag, or category.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search debates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full md:w-1/2"
          />

          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="select select-bordered w-full md:w-1/3">
            <option value="newest">📅 Newest</option>
            <option value="shortestDuration">⏳ Shortest Duration</option>
          </select>

        </div>

      </div>


      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-20">
          {filteredDebates.length > 0 ? (
            filteredDebates.map((debate) => (
              <div key={debate._id} className="card bg-base-100 shadow-sm">
                <figure>
                  <img
                    src={debate.image || 'https://via.placeholder.com/600x300?text=Debate'}
                    alt={debate.title}
                    className="w-full h-48 object-cover"
                  />
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
            ))
          ) : (
            <p className="text-gray-500 mt-8 text-center col-span-3">No debates found!</p>
          )}
        </div>
      )}
    </div>
  )
}
