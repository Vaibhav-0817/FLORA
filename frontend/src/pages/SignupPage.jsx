import React, {useEffect} from 'react'
import Signup from '../components/sign-up/Signup.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const {isAuthenticated } = useSelector((state)=>state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if(isAuthenticated){
      navigate('/');
    }
    
  })
  return (
    <Signup />
  )
}

export default SignupPage