'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { use } from 'react'

import CountdownTimer from '../../../components/CountdownTimer'
import { FaHeart } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { IoMdArrowRoundForward } from 'react-icons/io'


import Swal from 'sweetalert2'


export default function DebatePage({ params }) {
    const { id } = use(params)
    const { data: session, status } = useSession()
    const router = useRouter()
    const [debate, setDebate] = useState(null)
    const [side, setSide] = useState(null)
    const [argumentsList, setArgumentsList] = useState([])
    const [argumentText, setArgumentText] = useState('')
    const [winner, setWinner] = useState('')
    const bannedWords = ['stupid', 'idiot', 'dumb', 'nonsense', 'fool', 'silly'];
    const [hasPosted, setHasPosted] = useState(false);


const [isDebateOver, setIsDebateOver] = useState(false);
const [endTime, setEndTime] = useState(null);


    useEffect(() => {
        if (status === 'unauthenticated') router.push('/')
        if (status === 'authenticated') {
            axios.get(`/api/debates/${id}`).then(res => {
                setDebate(res.data)

                // Check if current user has already joined
                const userJoin = res.data.participants?.find(p => p.email === session.user.email);
                if (userJoin) {
                    setSide(userJoin.side)
                }
            })

            axios.get(`/api/debates/${id}/arguments`).then(res => setArgumentsList(res.data))
        }
    }, [status])

    useEffect(() => {
        const fetchUserParticipation = async () => {
            const res = await axios.get(`/api/debates/${id}/arguments`);
            const existing = res.data.find(arg => arg.author?.email === session?.user?.email);
            if (existing) {
                setSide(existing.side);
                setHasPosted(true);
            }
            setArgumentsList(res.data);
        };

        if (session?.user?.email) {
            fetchUserParticipation();
        }
    }, [id, session]);

    useEffect(() => {
    if (debate) {
        const parseDuration = (durationStr) => {
            const hours = parseInt(durationStr.replace('h', ''));
            return hours * 60 * 60 * 1000;
        };

        const calculatedEnd = new Date(new Date(debate.createdAt).getTime() + parseDuration(debate.duration));
        setEndTime(calculatedEnd);
        setIsDebateOver(new Date() > calculatedEnd);
    }
}, [debate]);


    useEffect(() => {
        if (!isDebateOver || !argumentsList.length) return;

        const supportVotes = argumentsList
            .filter(arg => arg.side === 'support')
            .reduce((acc, curr) => acc + (curr.votes || 0), 0);

        const opposeVotes = argumentsList
            .filter(arg => arg.side === 'oppose')
            .reduce((acc, curr) => acc + (curr.votes || 0), 0);

        const result =
            supportVotes > opposeVotes
                ? 'Support Side Wins 🎉'
                : opposeVotes > supportVotes
                    ? 'Oppose Side Wins 🎉'
                    : 'It’s a Tie 🤝';

        setWinner(result);
    }, [isDebateOver, argumentsList]);



    const handleJoin = (selectedSide) => {
        setSide(selectedSide);
    };
    const containsBannedWords = (text) => {
        const lowerText = text.toLowerCase();
        return bannedWords.some(word => lowerText.includes(word));
    };


    const handlePostArgument = () => {
        if (hasPosted) {
            //alert("You have already posted an argument.");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have already posted an argument.",
            });
            return;
        }

        if (!argumentText.trim()) return;

        if (containsBannedWords(argumentText)) {
            // alert("⚠️ Your argument contains inappropriate language. Please rephrase and try again.");
            Swal.fire({
                icon: "error",
                title: "⚠️ Your argument contains inappropriate language.",
                text: "Please rephrase and try again.",
            });
            return;
        }

        axios.post(`/api/debates/${id}/arguments`, {
            author: session.user,
            content: argumentText,
            side,
            postedAt: new Date().toISOString(),
            vote: 0
        }).then(async () => {
            setArgumentText('');
            setHasPosted(true);

            const res = await axios.get(`/api/debates/${id}/arguments`);
            setArgumentsList(res.data);


            Swal.fire({
                icon: "success",
                title: "Great!",
                text: "Your Argument was posted!",
            });
        });
    };


    const handleDelete = (argId) => {
        axios.delete(`/api/arguments/${argId}`)
            .then((res) => {
                if (res.data.success) {
                    setArgumentsList(prev => prev.filter(arg => arg._id !== argId));
                    Swal.fire({
                        icon: "success",
                        title: "Deleted",
                        text: "Your Argument was deleted",
                    });
                } else {
                    //alert('Failed to delete argument.');
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Failed to delete argument.",
                    });
                }
            })
            .catch(err => {
                console.error('Delete failed', err);
                if (err.response?.status === 403) {
                    // alert('Delete not allowed. Either you are not the author or the time window has expired.');
                    Swal.fire({
                        icon: "error",
                        title: "Delete not allowed",
                        text: "Either you are not the author or the time window has expired.",
                    });
                } else if (err.response?.status === 401) {
                    //alert('You must be signed in to delete arguments.');
                    Swal.fire({
                        icon: "error",
                        title: "Delete not allowed",
                        text: "You must be signed in to delete arguments.",
                    });
                } else {
                    // alert('Something went wrong while deleting.');
                    Swal.fire({
                        icon: "error",
                        title: "Ooops",
                        text: "Something went wrong while deleting.",
                    });
                }
            });
    };


    const handleVote = (argId) => {
        axios.patch(`/api/arguments/${argId}/vote`)
            .then(() => {
                setArgumentsList(prev =>
                    prev.map(arg => arg._id === argId ? { ...arg, votes: arg.votes + 1 } : arg)
                );
                Swal.fire({
                    icon: "success",
                    title: "Great!",
                    text: "Vote was successful.",
                });
            })
            .catch(err => {
                if (err.response?.status === 403) {
                    // alert('You cannot vote on your own argument.');
                    Swal.fire({
                        icon: "error",
                        title: "Ooops",
                        text: "You cannot vote on your own argument.",
                    });
                } else if (err.response?.status === 400) {
                    //alert('You have already voted.');
                    Swal.fire({
                        icon: "error",
                        title: "Ooops",
                        text: "You have already voted.",
                    });
                } else {
                    //alert('Failed to vote.');
                    //console.error(err);
                    Swal.fire({
                        icon: "error",
                        title: "Ooops",
                        text: "Failed to vote.",
                    });
                }
            });

    };




    if (debate) {
        const parseDuration = (durationStr) => {
            const hours = parseInt(durationStr.replace('h', ''));
            return hours * 60 * 60 * 1000;
        };

        endTime = new Date(new Date(debate.createdAt).getTime() + parseDuration(debate.duration));
        isDebateOver = new Date() > endTime;
    }


    if (status === 'loading' || !debate) return <div className='text-center'><p className='text-center'><span className="loading loading-spinner text-primary"></span></p> </div>

    return (
        <div className="p-6 space-y-6 w-full md:w-10/12 mx-auto mt-10">

            <div className='flex flex-col md:flex-row gap-10 items-center'>
                <div className='w-full md:w-2/3'>
                    <h2 className="text-3xl font-bold">{debate.title}</h2>

                    <p className='mt-3'>{debate.description}</p>

                    {endTime && <CountdownTimer endTime={endTime} />}
                </div>

                <div className='w-full md:w-1/3'>
                    <img src={debate.image} alt="banner" className='w-full rounded-2xl' />
                </div>
            </div>




            {!isDebateOver && (
                <div className="flex gap-4">
                    {!side ? (
                        <>
                            <button onClick={() => handleJoin('support')} className="btn btn-success text-white rounded-full">Join as Support</button>
                            <button onClick={() => handleJoin('oppose')} className="btn btn-error rounded-full text-white">Join as Oppose</button>
                        </>
                    ) : (
                        <p>You joined as: <strong>{side}</strong></p>
                    )}
                </div>)}

            {side && !isDebateOver && (
                <div className="space-y-2 mt-4">
                    <textarea
                        className="textarea textarea-bordered w-full"
                        placeholder="Write your argument"
                        value={argumentText}
                        onChange={(e) => setArgumentText(e.target.value)}
                    />
                    <div className="flex gap-4">
                        <button className="btn btn-primary rounded-full" onClick={handlePostArgument}>
                            <IoMdArrowRoundForward /> Post Argument
                        </button>
                        <button className="btn btn-outline rounded-full" onClick={() => {
                            setSide(null)
                            setArgumentText('')
                        }}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-semibold">All Arguments</h3>
            <div className="grid gap-4">
                {
                    argumentsList.length > 0 ? (
                        argumentsList.map(arg => (
                            <div key={arg._id} className="p-4 rounded-md bg-base-100 shadow-lg border-2 border-base-200">
                                <div className="flex justify-between">
                                    <p><strong>{arg.author.name}</strong> - {moment(arg.createdAt).fromNow()}</p>
                                    <span className={`badge ${arg.side === 'support' ? 'badge-success text-white' : 'badge-error text-white'}`}>{arg.side}</span>
                                </div>
                                <p className="my-2">{arg.content}</p>
                                <div className="flex justify-between items-center">
                                    <p>Votes: {arg.votes}</p>
                                    {arg.author.email === session.user.email &&
                                        moment().diff(moment(arg.createdAt), 'minutes') <= 5 && (
                                            <button className="btn btn-sm btn-outline btn-error rounded-full" onClick={() => handleDelete(arg._id, arg.createdAt)}>
                                                <MdDelete />  Delete
                                            </button>
                                        )}

                                    {!isDebateOver && arg.author.email !== session.user.email && (
                                        <button
                                            className="btn btn-sm btn-outline btn-info ml-2 rounded-full"
                                            onClick={() => handleVote(arg._id)}
                                        >
                                            <FaHeart /> Vote
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : <p>No arguments posted.</p>
                }
            </div>

            <div>

                {
                    isDebateOver && (
                        <div>
                            <h1 className='mt-10 text-3xl font-bold'>Winner</h1>
                            <h2 className='mt-2'>{winner}</h2>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
