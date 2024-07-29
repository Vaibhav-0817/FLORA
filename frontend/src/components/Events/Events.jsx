import React from 'react'
import styles from '../../styles/styles'
import EventCard from '../EventCard/EventCard.jsx'
import { useSelector } from 'react-redux'
import Loader from '../Layout/Loader.jsx'

const Events = () => {
const {allEvents,isLoading} = useSelector((state)=>state.events)
  return (
    <>
    { isLoading ? (<Loader />) : (<div className="select-none">
      <div className={`${styles.section} `}>
        <div className={`${styles.heading}`}>
          <h1 className="text-white">Popular Events</h1>
        </div>
        <div className='w-full grid'>
            <EventCard data={allEvents && allEvents[0]}/>
        </div>
    </div>
</div>)}
    
</>
  )
}

export default Events