'use client'

import { useEffect, useState } from 'react'

export default function ScoreBoardPage() {
  const [leaderboard, setLeaderboard] = useState([])
  const [range, setRange] = useState('all')

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const res = await fetch(`/api/leaderboard?range=${range}`)
      const data = await res.json()
      setLeaderboard(data)

      //console.log('Leaderboard result:', data) 
    }
    fetchLeaderboard()
  }, [range])

  return (
    <div className="p-8 w-full md:w-8/12 mx-auto">


      <h1 className="text-4xl font-bold text-center mb-6 mt-12">🏆 Leaderboard</h1>

      <div className="flex justify-center gap-4 mb-6">
        {['weekly', 'monthly', 'all'].map(r => (
          <button
            key={r}
            className={`btn btn-sm ${range === r ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setRange(r)}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto mt-15">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Total Votes</th>
              <th>Debates Participated</th>
            </tr>
          </thead>
          <tbody>
            {
              leaderboard.map((user, index) => (
                <tr key={user.email}>
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-3">
                    <img src={user.photo || '/default-avatar.png'} alt="Avatar" className="w-8 h-8 rounded-full" />
                    <span>{user.name}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.totalVotes}</td>
                  <td>{user.debatesCount}</td>
                </tr>
              ))
            }

          </tbody>
        </table>
      </div>
    </div>
  )
}
