import React from 'react';
import { useEffect, useState } from 'react';


const CountdownTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = endTime - new Date();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeft <= 0) {

    return <div className='mt-3 bg-base-300 w-53 p-3 rounded-2xl'>
      <span className="text-red-500 font-semibold text-2xl">🛑 Debate Ended</span>
    </div>


  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (

    <div>

    {/* <span className="text-green-600 font-semibold">
      ⏰ Ends in: {hours}h {minutes}m {seconds}s
    </span> */}


      <h2 className='my-3'>⏰ Ends in: </h2>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max ">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": hours } /* as React.CSSProperties */} aria-live="polite" aria-label={hours}>{hours}</span>
          </span>
          Hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes } /* as React.CSSProperties */} aria-live="polite" aria-label={minutes}>{minutes}</span>
          </span>
          minutes
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds } /* as React.CSSProperties */} aria-live="polite" aria-label={seconds}>{seconds}</span>
          </span>
          seconds
        </div>

      </div>
    </div >
  );
};

export default CountdownTimer;