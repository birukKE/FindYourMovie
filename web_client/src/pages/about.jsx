
import './page.css'


const About = () => {
    return (
        <div className='container-about-class'> 
            <div className='text-container'>
            <h1 className='title'>About</h1>
            <h2 className='title'>Our website helps you discover and remember movies. You can browse movie titles and click on one to</h2>
            <ul>
                <li> <p> See similar movies</p> </li>
                <li> <p>Enter a movie overview or description you remember</p> </li>
            </ul>
            <br />
            <p className='title'>The more details you provide—like character names, locations, 
                or specific events—the better the suggestions. 
            </p>
             <p className='title'>
                Our system helps you find forgotten movies 
                or discover new ones based on your memories.
            </p>
            </div>
        </div>)
}

export default About