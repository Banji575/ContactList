import React, {Component} from 'react';
import Auth from '../../Components/Auth/Auth';

export default function withAuth(AuthComponent) {
    const Authen = new Auth('http://localhost:8080');
    
    return class AuthWrapped extends Component {
        constructor() {
            super();
            this.state = {
                user: null
            }
        }
            componentWillMount() {
                if (!Authen.loggedIn()) {
                    this.props.history.replace('/login')
                }
                else {
                    try {
                        const profile = Authen.getProfile()
                        this.setState({
                            user: profile
                        })
                    }
                    catch(err){
                        Authen.logout()
                        this.props.history.replace('/login')
                    }
                }
            }
            render() {
                if (this.state.user) {
                    return (
                        <AuthComponent history={this.props.history} user={this.state.user} />
                    )
                }
                else {
                    return null
                }
            }
        }
    }
