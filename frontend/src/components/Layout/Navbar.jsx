import React from 'react'
import styles from '../../styles/styles'
import { navItems } from '../../static/data'
import { Link } from 'react-router-dom'

const Navbar = ({active}) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
        {
            navItems && navItems.map((i,index)=>{
                return (
                    <div className='flex'>
                      <Link to={i.url} className={`${active === index + 1 ? "800px:text-white text-pink-500" : "text-gray-900"} font-[500] px-6 cursor-pointer pb-[30px] 800px:pb-0`}>
                      {i.title}
                      </Link>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Navbar