import React from 'react';
import './Blackout.scss';

const Blackout = props => {
    const cls = ['closeModal'];
    if(props.show){
        cls.push('closeModal--show')
    }
    return(
        <div 
            className = {cls.join(' ')}
            onClick = {(e)=>{props.clickHandler(e)}}
            ></div>
        
    )
}

export default Blackout;