import { NextResponse } from 'next/server'

import { ObjectId } from 'mongodb'
import clientPromise from '../../../lib/mongodb'


export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const range = searchParams.get('range') || 'all'

        const client = await clientPromise
        const db = client.db('debateArenaDB')
        const argumentsCollection = db.collection('arguments')

        // Time filter
        let matchStage = {}
        if (range === 'weekly') {
            const oneWeekAgo = new Date()
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
            matchStage.createdAt = { $gte: oneWeekAgo }
        } else if (range === 'monthly') {
            const oneMonthAgo = new Date()
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
            matchStage.createdAt = { $gte: oneMonthAgo }
        }

        const leaderboard = await argumentsCollection.aggregate([
            { $match: matchStage },
            {
                $group: {
                    _id: '$author.email',
                    userName: { $first: '$author.name' },
                    userPhoto: { $first: '$author.image' },
                    totalVotes: { $sum: '$votes' },
                    debates: { $addToSet: '$debateId' },
                }
            },
            {
                $project: {
                    _id: 0,
                    email: '$_id',
                    name: '$userName',
                    photo: '$userPhoto',
                    totalVotes: 1,
                    debatesCount: { $size: '$debates' }
                }
            },
            { $sort: { totalVotes: -1 } },
            { $limit: 20 },
        ]).toArray()

        return NextResponse.json(leaderboard)
    } catch (err) {
        console.error('Leaderboard fetch failed:', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
