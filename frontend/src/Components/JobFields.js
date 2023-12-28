import React, { useState} from 'react'
import styles from '../Components/Styles.module.css'
// import { useNavigate } from 'react-router-dom';

export default function JobFields() {



    const initialFormData = {
        compName: '',
        logoUrl: '',
        jobPos: '',
        monthlySala: '',
        jobType: '',
        remOff: '',
        location: '',
        jobDes: '',
        aboutComp: '',
        skillReq: [],
        info: ''
      };
    
      const [formData, setFormData] = useState(initialFormData);
    const { compName, logoUrl, jobPos, monthlySala, jobType, remOff,location,jobDes,aboutComp,skillReq,info } = formData;
    const handleFormData=async(e)=>{
        e.preventDefault()
        // alert(compName+" "+logoUrl+" "+jobPos+" "+monthlySala+" "+jobType+" "+remOff+" "+location+" "+jobDes+" "+aboutComp+" "+skillReq+" "+info)
        sendJobData()
    }
    const sendJobData=async()=>{

        if(!compName || !logoUrl || !jobPos || !monthlySala || !jobType || !remOff || !location || !jobDes || !aboutComp || !skillReq || !info)
        {
            alert('All fields are required')
        }
        else
        {
            try {
                const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgwOTRmMDIxMGI1N2NhM2YzNzgxZGIiLCJlbWFpbCI6InZpcmF0QGdtYWlsLmNvbSIsImlhdCI6MTcwMzA3NDgwNX0.zIBTGtVpmzoXyBlwbQo_1FQKFfKWxwBouhlx4AfbCWY'
                const res=await fetch('http://localhost:4000/create-job',{
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                        
                    },
                    body: JSON.stringify({
                        companyName: compName,
                        addLogoURL: logoUrl,
                        jobPosition: jobPos,
                        salary: monthlySala,
                        jobType: jobType,
                        remoteOff: remOff,
                        location: location,
                        jobDes: jobDes,
                        aboutComp: aboutComp,
                        skillReq: skillReq,
                        info: info,
                      }),
                })

                console.log(res)
                const data=await res.json()
                console.log(data.data)

            
            } catch (error) {
                console.error('Error:', error);
                if (error.response) {
                    console.error('Response:', error.response);
                }
            }
        }
        setFormData(initialFormData);
        
        
    }
    
    const handleChange=(e)=>{
        const { name, value } = e.target;
        setFormData({...formData,[name]:value})

    }
  


  return (
        <>
            <div className='container'>
                <div>
                    <h3>Add job description</h3>
                </div>
                <div>
                    <form method='POST'>
                        <div>
                        <label>Company Name</label>
                        <input style={{width:'500px',marginLeft:'50px'}} type="text" name='compName' value={compName} onChange={handleChange}  placeholder='Enter Your company name here'/>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>Add logo URL</label>
                        <input style={{width:'500px',marginLeft:'68px'}} type="text" name='logoUrl' value={logoUrl} onChange={handleChange} placeholder='Enter the link'/>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>Job position</label>
                        <input style={{width:'500px',marginLeft:'80px'}} type="text" name='jobPos' value={jobPos} onChange={handleChange} placeholder='Enter job position'/>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>Monthly salary</label>
                        <input style={{width:'500px',marginLeft:'65px'}} type="text" name='monthlySala' value={monthlySala} onChange={handleChange} placeholder='Enter Amount in rupees'/>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>Job Type</label>
                        <select style={{marginLeft:'110px'}} name='jobType' value={jobType} onChange={handleChange}>
                            <option>Part-Time</option>
                            <option>Full-Time</option>
                            <option>Intern</option>
                        </select>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>Remote/office</label>
                        <select style={{marginLeft:'70px'}} name='remOff' value={remOff} onChange={handleChange}>
                            <option>Remote</option>
                            <option>Office</option>
                        </select>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>Location</label>
                        <input style={{width:'500px',marginLeft:'110px'}} name='location' type="text" value={location} onChange={handleChange} placeholder='Enter Location'/>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>Job Description</label>
                        <textarea style={{width:'500px',marginLeft:'60px'}} name='jobDes' value={jobDes} onChange={handleChange}  rows='3' cols='100' placeholder='Type the job description'/>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>About Company</label>
                        <textarea style={{width:'500px',marginLeft:'55px'}} name='aboutComp' value={aboutComp} onChange={handleChange} rows='3' cols='100' placeholder='Type about your company'/>
                        </div>
                        <div style={{marginTop:'18px'}}>
                        <label>Skills Required</label>
                        <input style={{width:'500px',marginLeft:'70px'}} name='skillReq' type="text" value={skillReq} onChange={handleChange} placeholder='Enter the must have skills'/>
                        </div>

                        <div style={{marginTop:'18px'}}>
                        <label>Information</label>
                        <input style={{width:'500px',marginLeft:'90px'}} name='info' type="text" value={info} onChange={handleChange} placeholder='Enter the additional information'/>
                        </div>
                        <div style={{marginTop:'18px',textAlign:'end'}}>
                        <button  className='btn btn-warning'>Cancel</button>
                            <button className='btn btn-danger' onClick={(e)=>handleFormData(e)}>Add Job</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </>
  )
}
