import React, { Component } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

export default class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: this.username,
      password: this.password,
    };
    if (!user.username) {
      alert("Enter Username");
    } else if (!user.password) {
      alert("Enter Password");
    } else {
      console.log("Data will send on server");
    }

    axios
      .post("/users/login", user)
      .then((res) => {
        console.log(res.data.success);
        if (!res.data.success) {
          alert(res.data.msg);
        } else {
          alert("You have successfully loged in!");
          window.location.href = "/dashboard";
          storeUser(res.data.token, res.data.user);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    function storeUser(token, user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Login</h3>

        <FormGroup>
          <Label>Username</Label>
          <Input
            type="Username"
            className=""
            placeholder="Username"
            onChange={(e) => (this.username = e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            type="password"
            className=""
            placeholder="Password"
            onChange={(e) => (this.password = e.target.value)}
          />
        </FormGroup>

        <button className="btn btn-primary btn-block">Login</button>
      </form>
    );
  }
}
