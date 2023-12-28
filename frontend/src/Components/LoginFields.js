import React, { useState } from 'react'
import styles from '../Components/Styles.module.css';
import { Link, useNavigate } from 'react-router-dom';


export default function LoginFields() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')

    const navigator=useNavigate()

    const handleLogin=(e)=>{
        e.preventDefault()
        getLoggedIn()
        
    }

    const getLoggedIn=async()=>{

        if(email=='' || password=='')
        {
            setError('Fields are empty')
            setInterval(() => {
                setError('')
            }, 2000);
            return;
        }
        const res=await fetch('http://localhost:4000/login',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({email,password})
        })
        const data=await res.json()

        
        if(data.status=='Success')
        {
            // alert('success')
            
            localStorage.setItem('jwt',data.jwttoken)
            localStorage.setItem('User Name',data.userName) 
            navigator('/home-page')
        }
        else if(data.status=='Failed')
        {
            // alert('failed')
            setError('Invalid Credentials')
            setInterval(() => {
                setError('')
            }, 2000);
        }
    }

  return (
    <>
        <div className={styles.container}>
            <form method='POST' >
            <div className={styles.loginForm} >
                <h2 className={styles.heading} >Already have an account?</h2>
                <p className={styles.formPara}>Your personal job finder is here</p>
                <p className={styles.handleErr}>{error}</p>
                <div className={styles.inputGroupEmail}>
                    <input className={styles.inputEmail} type="text" name={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='Email' required/>
                    
                </div>
                <div className={styles.inputGroupPass} >
                    <input className={styles.inputPass}  type="password" name={password} onChange={(e)=>{setPassword(e.target.value)}}  placeholder='Password' required/>
                </div>
               
                <button className={`${styles.loginBtn} btn btn-danger`}  onClick={(e)=>handleLogin(e)} >LogIn</button>
                <p className={styles.buttonPara} >Don’t have an account?  <Link to='/register' className={styles.signupPara}>Sign Up</Link></p>
            </div>
            </form>
        </div>
    </>
  )
}
