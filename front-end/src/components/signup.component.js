import React, { Component } from "react";
import { FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';


export default class SignUp extends Component {


    handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: this.firstName,
            login: this.login,
            email: this.email,
            password: this.password
        }
        if(!data.name){
            console.log('Enter name')
        }
        axios.post('contacts', data).then(
            res => {
                console.log(res.body)
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
        console.log(data);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" id="name" placeholder="Name"
                        onChange={e => this.name = e.target.value} />
                </FormGroup>

                <FormGroup>
                    <Label for="login">Login</Label>
                    <Input type="text" id="login" placeholder="login"
                        onChange={e => this.login = e.target.value} />
                </FormGroup>

                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" id="email" placeholder="Email"
                        onChange={e => this.email = e.target.value} />
                </FormGroup>

                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input type="password" id="password" placeholder="Password"
                        onChange={e => this.password = e.target.value} />
                </FormGroup>


                <Button className="btn btn-primary btn-block">Sign Up</Button>

            </form>
        );
    }
}