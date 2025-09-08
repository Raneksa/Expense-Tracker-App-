import React from 'react'
import { useState } from 'react'
const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleLogin = () => {
            if(inputUsername === 'user' && inputPassword === 'password') {
                isLoggedIn && <Dashboard />;
            }
        setIsLoggedIn(true);
    }
  return (  
    <>
        <nav className='nav'>
          <i style={{color:'white' , fontSize:'2.5rem' , marginLeft:'2ch'}}>Expense Tracker</i>
          <div className='button'>
            <button>
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