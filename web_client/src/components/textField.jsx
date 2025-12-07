
import React from "react" 
import './textField.css' 

const TextField = ({onKeyDownFunction, onChangeFunction, valueFunction}) =>{ 
    
    return ( 
            <div className="description-container"> 
                <textarea className="description-field" placeholder="Description" onKeyDown={e => onKeyDownFunction(e)} 
                 onChange={onChangeFunction} value={valueFunction}></textarea>
            </div> 
    )}

export default TextField