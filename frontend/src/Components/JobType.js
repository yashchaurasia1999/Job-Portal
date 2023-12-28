import React, { useEffect, useState } from "react";
import styles from "../Components/Styles.module.css";
import { useNavigate } from "react-router-dom";
import logo from "../Images/logo.png";
import indiaFlag from "../Images/indiaFlag.png";
import employee from "../Images/employee.png";
import rs from "../Images/rs.png";
import cross from "../Images/cross.png";

export default function JobType() {
  const [jobType, setJobType] = useState("");
  const [jobTypeData, setJobTypeData] = useState([]);
  const [selectSkill,setSelectSkill]=useState([])

  const [allJobs, setAllJobs] = useState([]);
  const [isLoggedIn,setIsLoggedIn]=useState(true)

  useEffect(()=>{
    const jwt=localStorage.getItem('jwt')
    console.log(jwt)
    if(jwt==null)
    {
      setIsLoggedIn(false)
    }
  })
  const navigator = useNavigate();
  useEffect(() => {
    const fetchJobList = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgwOTRmMDIxMGI1N2NhM2YzNzgxZGIiLCJlbWFpbCI6InZpcmF0QGdtYWlsLmNvbSIsImlhdCI6MTcwMzA5NjUzOH0.0FRgKBF4P8DLXwTy2eQA3mXsYm4OZi_VmY4ZD37yOpM";
      const res = await fetch("http://localhost:4000/all-jobs", {
        headers: {
          token: token,
        },
      });
      const data = await res.json();

      setAllJobs(data.jobData);
    };
    fetchJobList();
  }, []);
  const handleViewDetails = (jobId) => {
    
    navigator(`/singleJobPost/${jobId}`);
  };

  const handleSearchJob = async () => {
    const res = await fetch("http://localhost:4000/edit-job", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgwOTRmMDIxMGI1N2NhM2YzNzgxZGIiLCJlbWFpbCI6InZpcmF0QGdtYWlsLmNvbSIsImlhdCI6MTcwMzI0MjYwOH0.Epu2EiCgKwUDrqrjFm2oNGziH1kC229WKZspTEOsBMA",
      },
      body: JSON.stringify({ skillReq: selectSkill,
                             jobPosition:jobType
       }),
    });
    // console.log(res)
    const data = await res.json();
  
    console.log(data)
    setJobTypeData(data.data);
    // console.log(jobTypeData)
    setJobType("");
  };
  const handleSelect = (e) => {
    const selectedValue = e.target.value;
    if (!selectSkill.includes(selectedValue)) {
      setSelectSkill((prevSkills) => [...prevSkills, selectedValue]);
    }
  };
  const handleSkill=(ele)=>{
   
    if(selectSkill.includes(ele))
    {
     let newArr=selectSkill.filter((eachEle)=>{
        return ele!=eachEle
      })
      setSelectSkill(newArr)
    }
  }
  return (
    <>
      <div className={`container ${styles.jobType}`}>
        <div className={styles.content}>
          <div className={styles.inputGroup}>
            <input
              className={styles.inputText}
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              placeholder="Type any job title"
              
            />
          
        </div>
        <div>
          <select className={styles.select}  value={selectSkill} name="skillReq" onChange={(e)=>handleSelect(e)}style={{position:'absolute',top:'100px',left:'200px'}}>
            <option disabled='true'>Select</option>
            <option>React</option>
            <option>javascript</option>
            <option>HTML/CSS</option>
            <option>Express</option>
            <option>Mongo db</option>
            <option>Node</option>
          </select>
          
          <div style={{display:'flex',marginLeft:'20px',marginTop:'145px'}}>
          {selectSkill.map((ele,idx)=>{
           return <ul style={{listStyle:'none'}}>
                    <li style={{background:'#FFEEEE',height:'30px',width:'auto',fontWeight:'500',border:'1px solid black'}}>{ele}<img src={cross} onClick={()=>handleSkill(ele)} style={{background:'#FF6B6B'}}/></li>
                  </ul>
                  
          })}
          </div>
       
          </div>
         
          
          <button
            className="btn btn-danger"
            style={{ position: "absolute", top: "90px", right: "80px" }}
            onClick={handleSearchJob}
          >
            Search Job
          </button>
          </div>
      </div>
      {jobTypeData && jobTypeData.length >= 1 ? (
        <div className={`container ${styles.mainContainer}`}>
          <div className={`row ${styles.jobListContent}`}>
            <div className="col-md-12">
              {jobTypeData.map((ele, idx) => (
                <>
                  <div className={styles.singleJob} style={{ display: "flex" }}>
                    <div className="col-md-6">
                      <p className={styles.singleJobType}>{ele.jobPosition}</p>
                      <div
                        className=""
                        style={{ display: "flex", marginTop: "50px" }}
                      >
                        <img
                          style={{
                            height: "12px",
                            width: "12px",
                            marginTop: "7px",
                            marginLeft: "60px",
                          }}
                          src={employee}
                        />
                        <p style={{ paddingLeft: "10px" }}>11-12</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <img
                          style={{
                            height: "12px",
                            width: "12px",
                            marginTop: "7px",
                          }}
                          src={rs}
                        />
                        <p style={{ paddingLeft: "10px" }}>{ele.salary}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <img
                          style={{
                            height: "19px",
                            width: "19px",
                            marginTop: "4px",
                          }}
                          src={indiaFlag}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;<p>{ele.location}</p>
                      </div>
                      <div className="remOff" style={{ display: "flex" }}>
                        <p style={{ paddingLeft: "60px", color: "red" }}>
                          {ele.remoteOff}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="skills"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {ele.skillReq.map((ele, idx) => (
                          <p>{ele}</p>
                        ))}
                      </div>
                      {
                        isLoggedIn ? (
                          <>
                            <div
                        className="skills"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "20px",
                        }}
                      >
                        <button className="btn btn-outline-danger">
                          Edit Jobs
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleViewDetails(ele._id)}
                        >
                          View details
                        </button>
                      </div>
                          </>
                        ): (
                          <>
                            <div
                        className="skills"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "20px",
                        }}
                      >
                        <button
                          className="btn btn-danger"
                          onClick={() => handleViewDetails(ele._id)}
                        >
                          View details
                        </button>
                      </div>
                          </>
                        )
                      }
                      
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={`container ${styles.mainContainer}`}>
          <div className={`row ${styles.jobListContent}`}>
            <div className="col-md-12">
              {allJobs.map((ele, idx) => (
                <>
                  <div className={styles.singleJob} style={{ display: "flex" }}>
                    <div className="col-md-6">
                      <p className={styles.singleJobType}>{ele.jobPosition}</p>
                      <div
                        className=""
                        style={{ display: "flex", marginTop: "50px" }}
                      >
                        <img
                          style={{
                            height: "12px",
                            width: "12px",
                            marginTop: "7px",
                            marginLeft: "60px",
                          }}
                          src={employee}
                        />
                        <p style={{ paddingLeft: "10px" }}>11-12</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <img
                          style={{
                            height: "12px",
                            width: "12px",
                            marginTop: "7px",
                          }}
                          src={rs}
                        />
                        <p style={{ paddingLeft: "10px" }}>{ele.salary}</p>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <img
                          style={{
                            height: "19px",
                            width: "19px",
                            marginTop: "4px",
                          }}
                          src={indiaFlag}
                        />
                        &nbsp;&nbsp;&nbsp;&nbsp;<p>{ele.location}</p>
                      </div>
                      <div className="remOff" style={{ display: "flex" }}>
                        <p style={{ paddingLeft: "60px", color: "red" }}>
                          {ele.remoteOff}
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div
                        className="skills"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                        }}
                      >
                        {ele.skillReq.map((ele, idx) => (
                          <p>{ele}</p>
                        ))}
                      </div>
                      {
                        isLoggedIn ? (
                          <>
                            <div
                        className="skills"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "20px",
                        }}
                      >
                        <button className="btn btn-outline-danger">
                          Edit Jobs
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleViewDetails(ele._id)}
                        >
                          View details
                        </button>
                      </div>
                          </>
                        ): (
                          <>
                            <div
                        className="skills"
                        style={{
                          display: "flex",
                          justifyContent: "space-evenly",
                          marginTop: "20px",
                        }}
                      >
                        <button
                          className="btn btn-danger"
                          onClick={() => handleViewDetails(ele._id)}
                        >
                          View details
                        </button>
                      </div>
                          </>
                        )
                      }
                     
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
