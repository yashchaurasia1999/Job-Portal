import React, { useEffect, useState } from "react";
import styles from '../Components/Styles.module.css'
import { useNavigate } from "react-router-dom";
export default function NavBar() {

  const [isLoggedIn,setIsLoggedIn]=useState(true)

  useEffect(()=>{
    const jwt=localStorage.getItem('jwt')
    if(jwt==null)
    {
      setIsLoggedIn(false)
    }
  })

  const navigator=useNavigate()
  const handleLogout=()=>{
      localStorage.removeItem('jwt')
      localStorage.removeItem('User Name')
      navigator('/')
  }
  const handleLogin=()=>{

    navigator('/')
  }
  const handleRegister=()=>{
  
    navigator('/register')
  }
  return (

    <>
      <nav className='navbar navbar-expand-lg navbar-light' style={{backgroundColor:'#ED5353',borderBottomLeftRadius:'50px',borderBottomRightRadius:'50px',height:'80px'}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#" style={{fontWeight:'500',color:'white',paddingLeft:'60px'}}>
            JobFinder
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
      
          </div>
          {
            isLoggedIn ? (
              <>
                <p className={styles.navLogout} onClick={handleLogout}>Logout</p>
                <p className={styles.navUser}>Hello! Recruiter</p>
              </>
             
            ) : (
              <>
              <div>
                <button className="btn btn-outline-light" onClick={handleLogin}>Login</button>
                <button style={{marginLeft:'50px',marginRight:'50px', color:'red', fontWeight:'400'}} onClick={handleRegister} className="btn btn-light">Register</button>
              </div>
              
              </>
            )
          }
          
        </div>
      </nav>
    </>
  );
}
