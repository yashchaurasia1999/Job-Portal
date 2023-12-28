import React from 'react'
import LoginPoster from '../Components/LoginPoster'
import LoginFields from '../Components/LoginFields'

export default function Login() {
  return (
    <>
        <div className='container-fluid'>
            <div className='row' style={{display:'flex'}}>
                <div className='col-md-7'>
                    <LoginFields/>
                </div>
                <div className='col-md-5'>
                    <LoginPoster/>
                </div>
            </div>
        </div>
    </>
  )
}
