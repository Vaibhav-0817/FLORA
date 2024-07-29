import React from 'react'
import styles from '../../styles/styles'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div className="relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat flex items-center bg-[url('https://static.vecteezy.com/system/resources/previews/030/759/672/large_2x/beautiful-bride-in-wedding-dress-with-bouquet-on-dark-background-bride-with-bouquet-closeup-ai-generated-free-photo.jpg')] bg-cover bg-bottom">
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
            <h1 className='capitalize font-[600] text-white 800px:text-[60px] leading-[1.2] text-[35px] select-none'>
                Best Flowers for <br /> any need
            </h1>
            <p className='text-gray-300 pt-5 800px:text-[16px] text-[9px] font-Poppins font-[400] select-none' style={{textShadow: "1.5px 1.5px 2px #000"}}>Welcome to Flora, where elegance meets nature. Discover curated bouquets and arrangements, sourced directly for freshness. Express emotions with our exquisite blooms, swiftly and securely delivered. Your journey into floral elegance starts here.</p>
            <Link to = '/products' className='inline-block'>
              <div className={`${styles.button} mt-5`}>
                <span className='text-white font-Poppins text-[18px]'>Shop now</span>
              </div>
            </Link>
        </div>
    </div>
  )
}

export default Hero