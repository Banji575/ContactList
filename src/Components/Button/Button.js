import React from 'react';
import './Button.scss';

const Button = props => {
    const cls = ['form-submit']
    if(props.type === 'button'){
        cls.push('contacts__add')
    }else if(props.type === 'Logout'){
        cls.push('logout')
    }
    const type = props.type === 'add'? 'submit' : 'button'

 return(
     <button
     className= {cls.join(' ')}
     value = {props.value}
     type={type}
     onClick={(e)=>(props.onClick(e,props.type))}
     disabled = {props.disabled}
 >{props.type}</button>
 )
}

export default Button;