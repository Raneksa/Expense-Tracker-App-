import React from 'react'
import '../components/Login.css'
const Login = ({ closeModal }) => {
  return (
<>
<div className='Overlay'> 
    <fieldset className='Login' >
            <button className='Quit' onClick={closeModal}>X</button>
        <div className='Login-Text'>
            <h1>Login</h1>
            <p>Glad to see you again !</p>
        </div>
        <div className='Login-input'>
            <input type="text" placeholder='UserName' />
            <input type="password" placeholder='Password' />
            <button>Login</button>           
            <p>Forgot Password ??</p>
        </div>
    </fieldset>
</div>
</>
  )
}

export default Login
