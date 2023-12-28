import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterFields() {

    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [mobile,setMobile]=useState('')
    const [err,setError]=useState('')
    const navigator=useNavigate()
    const handleRegister=(e)=>{
        e.preventDefault()
        alert(name+" " +email+" "+password+" "+mobile)
        getData()
    }
    
    const getData=async()=>{
        if(!name || !email || !password || !mobile)
        {
            setError('All Fields are required') 
            setTimeout(() => {
                setError('') 
            }, 2000);

            return;
        }
        const res=await fetch('http://localhost:4000/register',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({name,email,password,mobile})
        })
        console.log(res)
        const data=await res.json()
        console.log(data)
       
        if(data.status=='Success')
        {
            alert('loggedIn')
            navigator('/home-page')
        }
        else if(data.status=='Already exist')
        {
            setError('This email is exist') 
            setTimeout(() => {
                setError('') 
            }, 2000);

            return;
        }

    }
    


  return (
    <>
    <div className='container'>
        <form method='POST'>
        <div className='login-form' style={{position:'relative'}}>
            <h2 style={{position:'absolute',left:'25px',top:'90px',fontWeight:'bold'}}>Create an account</h2>
            <p style={{position:'absolute',left:'25px',top:'140px'}}>Your personal job finder is here</p>
            <p style={{color:'red',position:'absolute',left:'25px',top:'190px'}}>{err}</p>
            <div className="input-group" style={{position:'absolute',left:'25px',top:'220px',width:'700px' }}>
                <input style={{height:'50px'}} type="text" value={name} onChange={(e)=>{setName(e.target.value)}}name="Name" className="form-control" placeholder='Name' autoComplete='off'/>
                
            </div>
            <div className="input-group" style={{position:'absolute',left:'25px',top:'290px',width:'700px'}}>
                <input style={{height:'50px',width:'200px'}} value={email} type="email" onChange={(e)=>{setEmail(e.target.value)}} name='Email' className="form-control" placeholder='Email'  autoComplete='off'/>
            </div>
            <div className="input-group" style={{position:'absolute',left:'25px',top:'360px',width:'700px'}}>
                <input style={{height:'50px',width:'200px'}} value={mobile} type="text" name="Mobile" className="form-control" onChange={(e)=>{setMobile(e.target.value)}} placeholder='Mobile' autoComplete='off'/>
            </div>
            
            <div className="input-group" style={{position:'absolute',left:'25px',top:'430px',width:'700px'}}>
                <input style={{height:'50px',width:'200px'}} value={password} type="password" name="Password" className="form-control" onChange={(e)=>{setPassword(e.target.value)}} placeholder='Password' autoComplete='off'/>
            </div>
           
           
            <button style={{position:'absolute',left:'25px',top:'500px',width:'230px'}} onClick={(e)=>handleRegister(e)} className='btn btn-danger'>Create Account</button>
            <p style={{position:'absolute',left:'25px',top:'545px'}}>Already have an account? <Link to='/' style={{fontWeight:'bold', color:'black'}}>Sign In</Link> </p>
        </div>
        </form>
       
    </div>
    </>
  )
}
