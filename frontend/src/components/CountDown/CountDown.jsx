import React, { useEffect, useState } from 'react'

const CountDown = ({data}) => {
    const [timeLeft,setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
      const timer = setTimeout(()=>{
        setTimeLeft(calculateTimeLeft())
      },1000)
      return ()=>clearTimeout(timer);
    })

    function calculateTimeLeft(){
        const difference = new Date(data?.Finish_Date) - new Date();
        let timeLeft ={};
        if(difference > 0)
        {
            timeLeft={
                days: 0 || Math.floor(difference/(1000*60*60*24)),
                hours: 0 || Math.floor((difference/(1000*60*60))%24),
                minutes:0 ||  Math.floor((difference/(1000*60))%60),
                seconds: 0 || Math.floor((difference/(1000))%60),
            }
        }
        return timeLeft;
    }
    const timerComponents = Object.keys(timeLeft).map((interval)=>{
        return (
            <span className='text-[22px] text-pink-600 font-Poppins font-[500]'>
                {timeLeft[interval]} {interval} {interval!=="seconds" ? " " : " Left"}
            </span>
        )
    })
    
  return (
    <div>
        {
            timerComponents.length ? (timerComponents) : (<span className='text-red-900 text-[25px] font-Poppins'>Offer ended</span>)
        }
    </div>
  )
}

export default CountDown