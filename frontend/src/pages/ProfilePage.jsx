import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import styles from '../styles/styles'
import ProfileSidebar from '../components/Profile/ProfileSidebar.jsx'
import ProfileContent from '../components/Profile/ProfileContent.jsx'

const ProfilePage = () => {
    const [active,setActive] = useState(1);
  return (
    <div>
        <Header />
        <div className={`${styles.section} flex py-10 items-center`}>
            <div className='w-[50px] 800px:w-[335px]'>
                <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
        </div>
    </div>
  )
}

export default ProfilePage