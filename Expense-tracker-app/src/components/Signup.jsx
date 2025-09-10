import React from 'react'
import './Signup.css'


import { useState } from 'react'
export const Signup = ({ closeModal , onSignupSuccess}) => {
    const [inputUsername, setInputUsername] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputConfirmPassword, setInputConfirmPassword] = useState('');

    const handleSignup = (e) => {
      e.preventDefault();
        if(inputUsername && inputEmail && inputPassword && (inputPassword === inputConfirmPassword)) {
            onSignupSuccess();
        } else {
            alert('Info Invalide');
        }
    }
  return (
    <div className='Overlay'> 
      <fieldset className='Signing' >
        <button className='Quit' onClick={closeModal}>X</button>
        <div className='Signing-Text'>
          <h1>Sign Up</h1>
          <p>Join Us ! </p>
        </div>
        <form onSubmit={handleSignup} className='Signing-input'>
          <input type="text" placeholder='UserName' value={inputUsername} onChange={e => setInputUsername(e.target.value)} />
          <input type="text" placeholder='Email'  value={inputEmail} onChange={e => setInputEmail(e.target.value)}/>
          <input type="password" placeholder='Password' value={inputPassword} onChange={e => setInputPassword(e.target.value)}/>
          <input type="password" placeholder='Confirm your password' value={inputConfirmPassword} onChange={e => setInputConfirmPassword(e.target.value)} />
          <button type='submit'>Sign up</button>           
          <p>Already have an Account ??</p>
        </form>
      </fieldset>
    </div> 
  )
}