import React from 'react'
import RegisterFields from '../Components/RegisterFields'
import RegisterPoster from '../Components/RegisterPoster'
export default function () {
  return (
    <>
        <div className='container-fluid'>
            <div className='row' style={{display:'flex'}}>
                <div className='col-md-7'>
                    <RegisterFields/>
                </div>
                <div className='col-md-5'>
                    <RegisterPoster/>
                </div>
            </div>
        </div>
    </>
  )
}
