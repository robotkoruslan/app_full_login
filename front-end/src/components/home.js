import React, { Component , } from "react";
import axios from "axios"



export default class Home extends Component {
    componentDidMount(){

        const config = {
            headers: {
                Authorization: '1@1.com'
            }
        }
        axios.get('register', config).then(
            res => {
                console.log(res);
            },
            err => {
                console.log(err);
            }
        )
    }
    render() {
        return(
            <h2>You are not logged in!</h2>
        )
    }
}