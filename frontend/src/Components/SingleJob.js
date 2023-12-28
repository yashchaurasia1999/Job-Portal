import React from 'react'
import styles from '../Components/Styles.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function () {

  const {jobId}=useParams()
  const [singleJobData,setSingleJobData]=useState([])
  const [skill,setSkill]=useState([])
  const [isLoggedIn,setIsLoggedIn]=useState(true)
  const navigator=useNavigate()
  useEffect(()=>{
    const jwt=localStorage.getItem('jwt')
    if(jwt==null)
    {
      setIsLoggedIn(false)
    }
  })
  useEffect(() => {
    const fetchSingleJob=async()=>{
      const res=await fetch(`http://localhost:4000/show-job-post/${jobId}`,{
        headers:{
          token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgwOTRmMDIxMGI1N2NhM2YzNzgxZGIiLCJlbWFpbCI6InZpcmF0QGdtYWlsLmNvbSIsImlhdCI6MTcwMzA5NjUzOH0.0FRgKBF4P8DLXwTy2eQA3mXsYm4OZi_VmY4ZD37yOpM'
        }
        
      })
      const data=await res.json()
      
      setSingleJobData(data.data)
      setSkill(data.data.skillReq)
    
    }
    fetchSingleJob()
  
  }, [jobId])

  const handleEdit=()=>{
    navigator(`/add-jobPost`)
  }

  
  return (
    <>
        <div className={styles.singleJobBox}>
            <div className={styles.jobContent}>
                <h4>WordPress Development work from home job/internship at Adyaka Infosec Private Limited</h4>
            </div>
        </div>
        <div className={styles.fullJobDescription}>
            <div className={styles.description}>
              <div className={styles.jobTitle}> 
                <h2>{singleJobData.jobPosition}</h2>
                {
                  isLoggedIn && (<button className='btn btn-danger' style={{width:'120px'}} onClick={handleEdit}>Edit Job</button>)
                }
                
              </div>
              <p>{singleJobData.location}</p>
              <div className={styles.aboutComp}>
                <h4>About company</h4>
                <p>{singleJobData.aboutComp}</p>
                <h4>About the  job/internship</h4>
                <p>{singleJobData.jobDes}</p>
                <h4>Skill(s) Required</h4>
                <div>
                  <ul style={{display:'flex'}}>
                  {     
                    skill.map((ele,idx)=>(
                      <li style={{paddingRight:'20px',listStyle:'none'}}>{ele}</li>
                    ))
                  }
                  
                  </ul>
                </div>
                <h4>Additional Information</h4>
                <p>{singleJobData.info}</p>
              </div>
              
                
              
            </div>
        </div>
    </>
  )
}
