import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState("Login")
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  console.log("token: ", token);
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      //--------- Sign Up -------------
      if (currentState === 'Signup') {
        const res = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })

        if (res?.data?.success) {
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
          toast.success(res.data.message)
          formCleanUp()
        } else {
          toast.error(res.data.message)
        }
      } else {
        // ------ log in -------
        const res = await axios.post(`${backendUrl}/api/user/login`, { email, password })
        console.log("res: ", res);
        if (res?.data.success) {
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
          toast.success(res.data.message)
          formCleanUp()
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log("error: ", error);
      console.log(error.message);
    }
  }

  const formCleanUp = () => {
    setEmail("")
    setPassword("")
    setName("")
  }

  useEffect(() => {
    if (token) {
      navigate("/")
    }
  }, [token])

  return (
    <form 
  onSubmit={onSubmitHandler} 
  className='flex flex-col item-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 dark:text-gray-100'
>
  <div className='inline-flex justify-center items-center gap-2 mb-2 mt-10'>
    <p className='prata-regular text-3xl'>{currentState}</p>
    <hr className='border-none h-[1.5px] w-8 bg-gray-800 dark:bg-gray-100' />
  </div>

  <input 
    onChange={(e) => setName(e.target.value)} 
    value={name} 
    type="text" 
    className={`w-full px-3 py-2 border border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-800 ${currentState === "Login" ? "hidden" : ""}`} 
    placeholder='Name' 
  />
  
  <input 
    onChange={(e) => setEmail(e.target.value)} 
    value={email} 
    type="email" 
    className='w-full px-3 py-2 border border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-800' 
    placeholder='Email' 
    required 
  />

  <input 
    onChange={(e) => setPassword(e.target.value)} 
    value={password} 
    type="password" 
    className='w-full px-3 py-2 border border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-800' 
    placeholder='Password' 
    required 
  />

  <div className='w-full flex justify-between text-sm mt-[-8px]'>
    <p className={`cursor-pointer ${currentState === "Login" ? "" : "hidden"}`}>Forgot your password?</p>
    {
      currentState === 'Login' 
      ? <p onClick={() => setCurrentState('Signup')} className='cursor-pointer text-blue-600 dark:text-blue-400'>Create account</p> 
      : <p onClick={() => setCurrentState('Login')} className='cursor-pointer text-blue-600 dark:text-blue-400'>Login here</p>
    }
  </div>

  <button className='bg-black dark:bg-white text-white dark:text-black font-light px-8 py-2 mt-4 hover:bg-gray-900 dark:hover:bg-gray-300'>
    {currentState === 'Login' ? "Sign in" : "Sign Up"}
  </button>
</form>

  )
}

export default Login