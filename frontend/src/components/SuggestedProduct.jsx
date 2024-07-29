import React, { useState, useEffect } from "react";
import styles from "../styles/styles";
import ProductCard from './ProductCard/ProductCard'
import { useSelector } from "react-redux";

const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState(null);
  const {allProducts} = useSelector((state)=>state.products)
  useEffect(() => {
    const d =
      allProducts && allProducts.filter((i) => i.category === data.category && i.name !== data.name);
    setProducts(d);
    window.scrollTo(0,0)
  }, [data]);


  return <div>{data && <div className={`${styles.section} p-4`}>
    <h2 className={`${styles.heading} text-[25px] font-[500] border-b mb-5 text-white`}>Similar Blooms</h2>
    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
        {
            products && products.map((i,index)=>{
                return (
                <ProductCard data={i} key={index} />
                )
            })
        }
    </div>
  </div>}</div>;
};

export default SuggestedProduct;
