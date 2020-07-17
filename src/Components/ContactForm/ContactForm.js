import React from 'react';
import './ContactForm.scss';
import Button from '../../Components/Button/Button';
import Blackout from '../../Components/Blackout/Blackout';

const ContactForm = props => {
    const cls = ['center', 'addContact']
    const buttonDelete = (
        <Button
        value={props.type || ''}
        clickHandler={props.handlerDelete}
        type = 'delet'
        />)
   if(props.viewContactModal){
       cls.push('show-modal')
   }
    return(
        <React.Fragment>
           <Blackout
            show = {props.viewContactModal}
            clickHandler = {props.handlerOnClick}/>
           <div className={cls.join(' ')}>
        <div className="add">
        
            <h1>{props.type} contact</h1>
            <form id='addContactForm'>
                <input
                    id = 'nameField'
                    className="form-item"
                    placeholder="Name..."
                    value = {props.valueName}
                    name="name"
                    type="text"
                    onChange = {(e)=>{props.handlerInput(e)}}
                />
                <input
                    id = 'nameField'
                    className="form-item"
                    placeholder="Phone..."
                    value = {props.valuePhone}
                    name = 'phone'
                    type="text"                   
                    onChange = {(e)=>{props.handlerInput(e)}}
                />
                <div className = 'button__conteiner'>
                    <Button
                    value={props.type || ''}
                    clickHandler={props.handlerAddContact}
                    type = {props.type}
                    />
                    {props.type === 'edit' ? buttonDelete : null}
                </div>
               
                
            </form>
        </div>
    </div>
        </React.Fragment>
       
    )
}

export default ContactForm;