import React from 'react'
import '../components/Login.css'
import Dashboard from './Dashboard'
import { useState } from 'react'
const Login = ({ closeModal, onLoginSuccess }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const handleLogin = (e) => {
      e.preventDefault();
        if(inputUsername === 'Nekena' && inputPassword === 'Axen17') {
            onLoginSuccess();
        } else {
            alert('Info Invalide');
        }
    }
  return (
<>
<div className='Overlay'> 
    <fieldset className='Login' >
            <button className='Quit' onClick={closeModal}>X</button>
        <div className='Login-Text'>
            <h1>Login</h1>
            <p>Glad to see you again !</p>
        </div>
        <form className='Login-input' onSubmit={handleLogin}>
            <input value={inputUsername} type="text" placeholder='UserName' onChange={e => setInputUsername(e.target.value)}/>
            <input value={inputPassword} type="password" placeholder='Password' onChange={e => setInputPassword(e.target.value)} />
            <button type='submit' >
              Login
            </button>           
            <p>Forgot Password ??</p>
        </form>
    </fieldset>
</div>
</>
  )
}

export default Login
