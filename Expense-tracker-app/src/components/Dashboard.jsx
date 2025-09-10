import React from 'react'
import { useState } from 'react'
import './Dashboard.css'
import Welcome from './ExpenseT'

const Dashboard = () => {

  return (  
    <>
        <nav className='nav'>
          <i style={{color:'white' , fontSize:'2.5rem' , marginLeft:'2ch'}}>Dashboard</i>
          <div className='button'>
            <button type='submit'>
              Logout
            </button>
          </div>
        </nav>
        <div>
        </div> 
    </>
  )
}

export default Dashboard