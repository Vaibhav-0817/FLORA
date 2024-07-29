import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../styles/styles';

const Dropdown = ({categoriesData, setDropdown}) => {
    const navigate = useNavigate();
    const submitHandle = (i)=>{
        navigate(`/products?category=${i.title}`);
        setDropdown(false);
        window.location.reload();
    }
  return (
    <div className='pb-4 bg-white absolute w-[270px] z-30 rounded-b-md shadow-sm'>
    {
        categoriesData && categoriesData.map((i,index)=>{
            return (
            <div key={index} onClick={()=>submitHandle(i)} className={`${styles.normalFlex}`}>
            <img src={i.image_Url} className='w-[30px] h-[30px] object-contain select-none ml-[10px]' alt=''>
            </img>
            <h3 className='m-3 select-none cursor-pointer'>{i.title}</h3>
            </div>
         ) })
    }
    </div>
)
}

export default Dropdown