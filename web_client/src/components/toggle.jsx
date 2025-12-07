
import React from "react"
import './toggle.css'

const Toggle = ({isToggled, handleTogggleSwitch}) =>{
    console.log("isToggled: ", isToggled)
    return (
        <div className="toggle-container" onClick={handleTogggleSwitch}>
            <div className= {`toggle-btn ${!isToggled?"disable":""}`}>{isToggled?"Movie Description":"Movie Name"}</div>
        </div>
    )
}

export default Toggle