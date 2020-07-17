import React, { Component } from 'react';
import './ContactList.scss';
import Auth from '../../Components/Auth/Auth';
import withAuth from '../../HOC/withAuth/withAuth';
import ContactForm from '../../Components/ContactForm/ContactForm';
import Button from '../../Components/Button/Button';
import Header from '../../Components/Header/Header';
const Authen = new Auth();

class ContactList extends Component{
    state = {
        contacts: [
            {name: 'Sergey', phone:'495-745-88-25'},
            {name: 'Alex', phone:'495-985-43-25'},
            {name: 'Natalia', phone:'495-454-23-20'},
        ],
        filterContact:null,
        newContact:{name:'', phone:''},
        viewContactModal:false,
        typeContactModal:null
    }

    handlerAddContact = (e) => {
            e.preventDefault();
            console.log(this.state.newContact)
            const contacts = this.state.contacts.concat();
            const {name, phone, index} = this.state.newContact
            if(index){
                contacts[index].name = name || '';
                contacts[index].phone = phone || '';
            }else{
                contacts.push(this.state.newContact)
            }
            this.setState({
                contacts,
                filterContact:contacts,
                viewContactModal:false,
                newContact:{name:'', phone:''},
            })
    }

    HandlerOpenModal = () =>{
        const form = document.getElementById('addContactForm')
            form.reset();
            this.setState({
                viewContactModal : !this.state.viewContactModal,
                typeContactModal: 'add'
            })
    }

    handlerDelContact = (e,i) =>{
          const index = this.state.newContact.index
        console.log(this.state.newContact.index)
        const contacts = this.state.contacts.concat()
        contacts.splice(index,1)
        this.setState({
            contacts,
            filterContact:contacts,
            viewContactModal:false

        })
    }
    
    handlerInput = (e) =>{
        const data = e.target.value
        const key = e.target.name
        const newContact = {...this.state.newContact}
        newContact[key] = data
        this.setState({
           newContact
        })
    }

   

    handleLogout = () =>{
        Authen.logout()
        this.props.history.replace('/login');
     }
     contactEditHandler = ((e,i)=>{
        const value = this.state.contacts[i]
        this.setState({
            viewContactModal:true,
            typeContactModal: 'edit',
            newContact:{name:value.name, phone: value.phone, index:i}
        })

     })

     closeModal = (e) =>{
        if(e.target === e.currentTarget){
            this.setState({
                viewContactModal:false,
                newContact:{name:'', phone:''},
            })
        }
     }
     searchHandler = (e) =>{
         const arr = this.state.contacts.concat();
         const value = e.target.value.toLowerCase()
         const filterContact = []
         console.log(filterContact)
         if(value!==''){
            arr.forEach(el=>{
                const key = Object.keys(el);
                key.forEach(field=>{
                    console.log(el[field], value)
                    if(el[field].toLowerCase().includes(value)){
                        filterContact.push(el)
                    }
                })
             })
             this.setState({
                filterContact,
            })
         }else{
             this.setState({
                 filterContact:this.state.contacts
             })
         }
     }
     componentWillMount(){
         this.setState({
             filterContact:this.state.contacts
         })
     }

     render(){
        const {name, phone} = this.state.newContact
        const contacts = this.state.filterContact
        return( 
            <div className="App">
            <Header 
            searchHandler = {this.searchHandler}
            clickHandler={this.handleLogout}/>
            <ContactForm
            handlerAddContact = {this.handlerAddContact}
            handlerInput = {this.handlerInput}
            handlerOnClick = {this.closeModal}
            handlerDelete = {this.handlerDelContact}
            viewContactModal = {this.state.viewContactModal}
            valueName = {this.state.newContact.name}
            valuePhone = {this.state.newContact.phone}
            inputName = {name}
            inputPhone = {phone}
            type = {this.state.typeContactModal}
            />
            <div className="App-header">
                <h2>Hello {this.props.user.username}</h2>
                <div className='contacts'>
                {contacts.map((el,i)=>{
                return <div
                key = {i}
                    className='contact__conteiner'
                    onClick = {(e)=>this.contactEditHandler(e,i)}
                    >
                                <p>{el.name} </p>
                                <p>{el.phone}</p>
                            </div>
                })}
                <div className = 'button__conteiner'>
                <Button
                type='add' 
                className = ''
                clickHandler = {this.HandlerOpenModal}
                />
                </div>
            </div>
        </div>

         
        </div>
        )
     }
        
}

export default withAuth(ContactList)