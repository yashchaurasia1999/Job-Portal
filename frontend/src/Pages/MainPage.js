import React from 'react'
import NavBar from '../Components/NavBar'
import JobType from '../Components/JobType'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function MainPage() {

  
  const navigator=useNavigate()

  useEffect(()=>{
    const fetchJWT=()=>{
      const jwt=localStorage.getItem('jwt')
      if(jwt==null)
      {
        navigator('/home-page')
      }
    }
    fetchJWT()
  })
  return (
    <>
        <NavBar/>
        <JobType/>
        {/* <JobList/> */}
    </>
  )
}
