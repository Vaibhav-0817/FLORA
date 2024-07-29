import React, { useState, useEffect } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/ProductDetails.jsx'
import { useParams, useSearchParams } from 'react-router-dom'
import SuggestedProduct from '../components/SuggestedProduct.jsx'
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const {name} = useParams();
  const [data, setData] = useState(null);

    useEffect(() => {
      if (eventData !== null) {
        const data = allEvents && allEvents.find((i) => i._id === name);
        setData(data);
      } else {
        const data = allProducts && allProducts.find((i) => i._id === name);
        setData(data);
      }
    }, [allProducts, allEvents, name]);
    
  return (
    <div>
        <Header activeHeading={3} />
        <ProductDetails data={data} />
        {
          !eventData && (
            <>
            {data && <SuggestedProduct data={data} />}
            </>
          )
        }
        <Footer />
    </div>
  )
}

export default ProductDetailsPage