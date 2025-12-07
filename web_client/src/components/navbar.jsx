import './navbar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'


const Navbar = () => {

    const[isActive, setISActive] = useState(false)
    console.log("my value", isActive)
    const handleMenuBarClick = () =>{
        setISActive(!isActive)
        console.log("I was pressed", isActive)
    }

    return (
        <nav className = {`navbar-container ${isActive ? "active" : ""}`} >
            <div className='list-holder'>
                <li className='logo-containter'> <Link to ="/" onClick={() => window.location.href = "/"}><img className='logo-img' src={"src/assets/movie_logo.png"} alt = "Logo"/></Link> </li>
                <ul className='list-container'>  
                    <li className='home-link'> <Link to ="/"  className='redirection-link'> <li className='home-button'> Home </li> </Link> </li>
                    <li className='about-link'> <Link to ="/about" className='redirection-link'> <li className='about-button'> About</li> </Link> </li>
                </ul> 
            </div>
            <div className='ham-menu' onClick={handleMenuBarClick}>
                <span className={isActive?"first-span-after":""}></span> 
                <span className={isActive?"second-span-after":""}></span> 
                <span className={isActive?"third-span-after":""}></span>
            </div>

             {/* <div className='ham-menu'><span></span> <span></span> <span></span></div> */}
        </nav>
        )
}

export default Navbar