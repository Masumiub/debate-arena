import React from 'react';
import CountUp from 'react-countup';
import Img from '../public/assets/Animation - study.json'
import Lottie from 'lottie-react';
import { Fade } from 'react-awesome-reveal';

const Counts = () => {
    return (
        <div className='flex flex-col md:flex-row gap-10 mt-25 items-center'>
            <div className='w-full md:w-1/2'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <Fade cascade>
                        <div className='p-6 bg-base-200 rounded-2xl shadow-lg '>
                            <img width="48" height="48" src="https://img.icons8.com/3d-fluency/94/megaphone.png" alt="debates" />
                            <h1 className='text-2xl lg:text-3xl mt-3 font-semibold'> <CountUp end={120} />+ </h1>
                            <p className='mt-2'>Debates</p>
                        </div>

                        <div className='p-6 bg-base-200 rounded-2xl shadow-lg '>
                            <img width="48" height="48" src="https://img.icons8.com/3d-fluency/94/user-group-man-woman--v1.png" alt="participants" />
                            <h1 className='text-2xl lg:text-3xl mt-3 font-semibold'> <CountUp end={750} />+ </h1>
                            <p className='mt-2'>Participants </p>
                        </div>

                        <div className='p-6 bg-base-200 rounded-2xl shadow-lg '>
                            <img width="48" height="48" src="https://img.icons8.com/3d-fluency/94/communication.png" alt="arguments" />
                            <h1 className='text-2xl lg:text-3xl mt-3 font-semibold'> <CountUp end={2140} />+ </h1>
                            <p className='mt-2'>Arguments</p>
                        </div>

                        <div className='p-6 bg-base-200 rounded-2xl shadow-lg'>
                            <img width="48" height="48" src="https://img.icons8.com/3d-fluency/94/star.png" alt="votes" />
                            <h1 className='text-2xl lg:text-3xl mt-3 font-semibold'> <CountUp end={8650} />+ </h1>
                            <p className='mt-2'>Votes</p>
                        </div>
                    </Fade>
                </div>
            </div>

            <div className='w-full md:w-1/2 flex justify-center mx-auto'>
                <Lottie
                    className="w-[290px] md:w-[560px] lg:w-[1000px] mx-auto"
                    animationData={Img}
                    loop={true}
                />
            </div>
        </div>
    );
};

export default Counts;