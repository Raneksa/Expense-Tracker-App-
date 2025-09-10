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
        if(inputPassword !== inputConfirmPassword) {
            alert('Passwords do not match');
            return;
        }
        if(inputPassword.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }
        if(!/\d/.test(inputPassword)) {
            alert('Password must contain at least one number');
            return;
        }
        if(!/[!@#$%^&*]/.test(inputPassword)) {
            alert('Password must contain at least one special character');
            return;
        }
        if(inputUsername === '' || inputEmail === '' || inputPassword === '') {
            alert('Please fill in all fields');
            return;
        }
         alert('Signup successful!');
          setInputUsername('');
          setInputEmail(''); 
          onSignupSuccess();
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