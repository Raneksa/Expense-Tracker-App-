import React from 'react'
import './Signup.css'
export const Signup = ({ closeModal }) => {
  return (
    <div className='Overlay'> 
      <fieldset className='Signing' >
        <button className='Quit' onClick={closeModal}>X</button>
        <div className='Signing-Text'>
          <h1>Sign Up</h1>
          <p>Join Us ! </p>
        </div>
        <div className='Signing-input'>
          <input type="text" placeholder='UserName' />
          <input type="text" placeholder='Email' />
          <input type="password" placeholder='Password' />
          <input type="password" placeholder='Confirm your password' />
          <button>Sign up</button>           
          <p>Already have an Account ??</p>
        </div>
      </fieldset>
    </div> 
  )
}