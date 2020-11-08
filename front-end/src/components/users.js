import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  FormGroup,
  ModalFooter,
  Label,
  Input,
  ModalBody,
  Table,
  Button,
} from "reactstrap";
import axios from "axios";

export default class Users extends Component {
  state = {
    users: [],
    newUserData: {
      name: "",
      username: "",
      email: "",
    },
    editUserData: {
      name: "",
      username: "",
      email: "",
    },
    newUserModal: false,
    editUserModal: false,
  };
  async UNSAFE_componentWillMount() {
    this._refreshList();
  }

  toggleNewUserModal() {
    this.setState({
      newUserModal: !this.state.newUserModal,
    });
  }

  toggleEditUserModal() {
    this.setState({
      editUserModal: !this.state.editUserModal,
    });
  }

  addUser() {
    axios.post("users", this.state.newUserData).then((response) => {
      let { users } = this.state;
      users.push(response.data);

      this.setState({
        users,
        newUserModal: false,
        newUserData: {
          name: "",
          username: "",
          email: ""
        },
      });
    });
  }
  updateUser() {
    let { name, username, email } = this.state.editUserData;

    axios.put("users/" + this.state.editUserData._id, {
        name,
        username,
        email,
      })
      .then((response) => {
        console.log(response.data);
        this._refreshList();
        this.setState({
          editUserModal: false,
          editUserData: { name: "", email: "", username: "" },
        });
      });
  }
  editUser(id, name, email, username) {
    this.setState({
      editUserData: { id, name, email, username },
      editUserModal: !this.state.editUserModal,
    });
  }
  deleteUser(id) {
    axios.delete("/users/" + id).then((response) => {
      this._refreshList();
    });
  }
  
  _refreshList() {
    const data={
      "accessToken": localStorage.getItem("accessToken")
    }
    axios.post("/users/", data).then((res) => {
      if (res.data.status == "success") {
        this.setState({
          users: res.data.user,
        });
      } else {
        alert(res.data.message)
        window.location.href = "/";
      }
    });
  }

  render() {
    let users = this.state.users.map((user) => {
      return (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>
          <Button
              color="success"
              size="sm"
            >
              Add friend
            </Button>
           
          </td>
        </tr>
      );
    });
    return (
      <div className="App container">
        <h1>Users</h1>
        <Modal
          isOpen={this.state.newUserModal}
          toggle={this.toggleNewUserModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleNewUserModal.bind(this)}>
            Add a new user
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="first_name">First name</Label>
              <Input
                id="first_name"
                value={this.state.newUserData.name}
                onChange={(e) => {
                  let { newUserData } = this.state;
                  newUserData.name = e.target.value;
                  this.setState({ newUserData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last name</Label>
              <Input
                id="last_name"
                value={this.state.newUserData.last_name}
                onChange={(e) => {
                  let { newUserData } = this.state;
                  newUserData.last_name = e.target.value;
                  this.setState({ newUserData });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                value={this.state.newUserData.email}
                onChange={(e) => {
                  let { newUserData } = this.state;
                  newUserData.email = e.target.value;
                  this.setState({ newUserData });
                }}
              />
            </FormGroup>

            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                value={this.state.newUserData.password}
                onChange={(e) => {
                  let { newUserData } = this.state;
                  newUserData.password = e.target.value;
                  this.setState({ newUserData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addUser.bind(this)}>
              Add user
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleNewUserModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.editUserModal}
          toggle={this.toggleEditUserModal.bind(this)}
        >
          <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>
            Edit a new user
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="first_name">First name</Label>
              <Input
                id="first_name"
                value={this.state.editUserData.first_name}
                onChange={(e) => {
                  let { editUserData } = this.state;
                  editUserData.first_name = e.target.value;
                  this.setState({ editUserData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="last_name">Last name</Label>
              <Input
                id="last_name"
                value={this.state.editUserData.last_name}
                onChange={(e) => {
                  let { editUserData } = this.state;
                  editUserData.last_name = e.target.value;
                  this.setState({ editUserData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                value={this.state.editUserData.email}
                onChange={(e) => {
                  let { editUserData } = this.state;
                  editUserData.email = e.target.value;
                  this.setState({ editUserData });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                value={this.state.editUserData.password}
                onChange={(e) => {
                  let { editUserData } = this.state;
                  editUserData.password = e.target.value;
                  this.setState({ editUserData });
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateUser.bind(this)}>
              Update user
            </Button>{" "}
            <Button
              color="secondary"
              onClick={this.toggleEditUserModal.bind(this)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Request</th>
            </tr>
          </thead>
          <tbody>{users}</tbody>
        </Table>
      </div>
    );
  }
}
