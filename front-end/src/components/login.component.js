import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';




export default class Login extends Component {

  

    handleSubmit = e => {
        e.preventDefault();
        const user = {
            login: this.login,
            password: this.password
        }
        if (!user.login) {
            alert('Enter Login');
        } else if (!user.password) {
            alert('Enter Password'); 
        } else {
            console.log('Data will send on server')
        }

  

        axios.post('auth', user)
        .then(res => {
            console.log(res.data.success);
           if (res.data.success) {
               storeUser(res.data.token, res.data.user)
           
               window.location.href = '/home';
            } else {
            alert(res.data.msg)
           }
        })
        .catch(err => {console.log(err)});

       function storeUser(token, user){
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            // this.token = token;
            // this.user = user;
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Login</h3>

                <FormGroup>
                    <Label>Login</Label>
                    <Input type="login" className="" placeholder="Login"
                        onChange={e => this.login = e.target.value} />
                </FormGroup>

                <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" className="" placeholder="Password"
                        onChange={e => this.password = e.target.value} />
                </FormGroup>


                <button className="btn btn-primary btn-block">Login</button>
            </form>
        )
    }
}

