import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Toggle from '../components/toggle.jsx';
import TextField from "../components/textField";
import './page.css'
import Loader from "../components/loader"
import TextStyle from "../components/textStyle"




const Row = (props) =>{
    const {movieImages, movieTitle} = props
    return(
        <tr>
            <td className="table-data"> <img  src = {movieImages} alt = "No image" className="movie__image"/> </td> 
            <td>{movieTitle} <br/> </td>
        </tr>
        
    )
}

const Table = (props) =>{
    const {movieListData, movieImageUrlsData} = props
    let tempMovieListData = movieListData
    return(
        <table className="table table-striped">
            <tbody>
                    <td>Movies</td>
                    <td>Picture</td>

                     {tempMovieListData.map((row, index) => 
                        {
                        return <Row
                            key = {index}
                            movieTitle={row}
                            movieImages={movieImageUrlsData[index]}
                        />}
                )}
                
            </tbody>
        </table>
    )
    
}

const handleApiRequest = async(titleOfMovie) =>{ 
        const apiKey = "6720af32"
        let tempImage = ""
        try{
            let res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&t=${titleOfMovie}`)
            const data = await res.json()
            tempImage = data.Poster
        }catch(error) 
            {
            }
        return tempImage
    }

const typeOfInput = (toggleState, handleValChange, postValToBackend, val) =>{
    const tempOnKeyDown = (e) =>{
        if(e.key == "Enter"){
            postValToBackend()}
    }
    if(!toggleState){
        return <input className='user-input' type="text"  placeholder="Name a Movie" onChange={handleValChange} onKeyDown={e => tempOnKeyDown(e)}  value={val} />
    }
    return <TextField onKeyDownFunction={tempOnKeyDown} onChangeFunction={handleValChange} valueFunction = {val}/>

}


export function Home(){
 
    const [val, setVal] = useState("")
    const [movieList, setMovieList] = useState([])
    const [movieImageUrls, setMovieImageUrls] = useState([])
    const [toggleState, setToggleState] = useState(false)
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [isMovieFound, setIsMovieFound] = useState(true)
    
    const postValToBackend = () => {
        setIsButtonClicked(true)
        if(val !== ""){
                fetch(`/api/handleUserInput`, {
                method: "POST",
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({"value" : val, "isDescription": toggleState})
            })
            .then(res => res.json())   
            .then(myData =>{
                
                let parsed = myData
                if (typeof myData === "string") {
                    parsed = JSON.parse(myData);
                }
                setMovieList(parsed)
                if(parsed.length > 0){
                    setVal("")
                    setIsMovieFound(true)
                    setIsButtonClicked(false)
                }else if(myData.length === 0){
                    setIsMovieFound(false)
                }
                })
            .catch(error => { console.error(`ERROR! ${error}`)})}

    }


    const getImage = async(filmTitle) =>{
        const tempImage = await (handleApiRequest(filmTitle))
        return tempImage
    }

    const fetAllImageUrls = async () => 
        await Promise.all(movieList.map(m => getImage(m)));

    useEffect(() =>{
        const extractingListItems = async() =>{
            const urls = await fetAllImageUrls()
            setMovieImageUrls(urls)
        }
        extractingListItems()
    }, [movieList])

    useEffect(() => {
        if(isMovieFound === false){
            alert("No similar movies found!")
        }
    
    }, [isMovieFound])


    const handleValChange = (e) =>{
        setVal(e.target.value)
    }
    

    const handleTogggleSwitch = () => {
        setToggleState(!toggleState)
    }


    const handleLoading = () =>{
        if(movieList<0 && isButtonClicked){}
            
    }


    return(
            <div className={`container-class ${movieList.length > 0?"change":""}`}>
                <span className="top-span"></span>
                <TextStyle/>
                <p className="instruction"> Enter a movie title to find similar films, or a description to identify the movie. </p>

                {isButtonClicked && isMovieFound && (
                <div className="overlay">
                    <Loader/>
                </div>
                )}


                <div className="input-container">
                    <Toggle isToggled = {toggleState} handleTogggleSwitch = {handleTogggleSwitch} />
                    <button  className="go-button" onClick={postValToBackend} > Go </button>
                </div>

                {typeOfInput(toggleState, handleValChange, postValToBackend, val)}
                <Table  movieListData = {movieList}  movieImageUrlsData = {movieImageUrls}/> 
                <span className="bottom-span"></span>
                
        </div>
    )

}




