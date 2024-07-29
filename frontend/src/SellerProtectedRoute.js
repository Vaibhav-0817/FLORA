import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
import Loader from "./components/Layout/Loader";

const SellerProtectedRoute = ({children})=>{
    const { isSeller,isLoading } = useSelector((state) => state.seller);
    if(isLoading===false){
    if(isSeller===true){
        return children
    }
    return <Navigate to='/shop-login' replace />
}
else{
    return <Loader />
}
}

export default SellerProtectedRoute