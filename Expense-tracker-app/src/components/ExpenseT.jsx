import './ExpenseT.css'
import Lottie from 'lottie-react'
import animation from '../assets/Welcome Animation.json'
const Welcome = () => {
  return (
    <>
    <nav className='nav'>
          <i style={{color:'white' , fontSize:'2.5rem' , marginLeft:'2ch'}}>Expense Tracker</i>
          <div className='button'>
          <button>
            Login
          </button>
          <button>
            Sign Up
          </button>
          </div>
    </nav>
    <div className='Text' style={{display:'flex' , flexDirection:'row' , justifyContent:'space-around' , alignItems:'center' , alignItems:'center'}}>
        <div className='about' style={{marginTop:'30ch' , marginLeft:'10ch'}}>
          <h1 style={{fontSize:'4rem',color:'rgb(35, 60, 107)'}}>Expense Tracker App</h1>
          <p style={{fontSize:'1.5rem', color:'rgb(35, 60, 107)'}}>
              Welcome to the <em style={{fontWeight:'bolder' , color:'white'}}>SET</em>  (Smart Expense Tracker) app! <br /> Easily manage your expenses, track your financial habits, <br />
              and achieve your goals with ease. Start now to take control of your budget.
           <br /> This app is built using React, JavaScript, HTML, and CSS.
          </p>
          <div className='Icon'>
            <i class="fa-brands fa-react"></i>
            <i class="fa-brands fa-js"></i>
            <i class="fa-brands fa-html5"></i>
            <i class="fa-brands fa-css3-alt"></i> 
          </div>
        </div>
        <div className='svg'  style={{width:'24%' , height:'30ch' , marginRight:'10ch'}}>
          <Lottie animationData={animation} loop={true} style={{borderRadius:'100%' ,textAlign:'center',border:"none", padding:'2ch' , background:' rgb(35, 60, 107)' , boxShadow:'0px 4px 5px black'}}/>        
        </div>
    </div>
    <footer>
        
    </footer>
    </>    
)
}

export default Welcome