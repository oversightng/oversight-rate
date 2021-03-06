import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { ToastContainer, toast } from 'react-toastify';

const url = 'https://oversight-ws.herokuapp.com/api/users';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    };
  }

  handleOpen() {
    document.location.href="/oversight-rate/register";
    // this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleFirstname(e) {
    this.setState({ firstname: e.target.value });
  }
  handleLastname(e) {
    this.setState({ lastname: e.target.value });
  }
  handleEmail(e) {
    this.setState({ email: e.target.value });
  }
  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit() {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        password: this.state.password,
        email: this.state.email,
      }),
    })
    .then(response => response.json())
    .then(function (data) {
      localStorage.setItem('token', data.token);
      console.log(data);
      return;
      if(!data.success) {
        toast('Registeration was unsuccessful '+ data.message);
      }
      else {
        toast('Registeration successful, A mail has been sent for verification');
      }
    })
    .catch(function (error) {
      toast('Really Sorry your Request Failed, Please try again');
      console.log('Request failed', error);
    });

    this.setState({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];

    return (
      <div className="float-left">
        <div className="icon-cont">
          <FontIcon className="material-icons nav-icon" onClick={this.handleOpen.bind(this)}>face</FontIcon>
          <p className="register_img_description">Register</p>
        </div>
        <Dialog
          title="Register"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          <div className='col-md-6 col-md-offset-3'>
            <br />
            <TextField
              hintText="First Name"
              value={this.state.firstname}
              onChange={this.handleFirstname.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Last Name"
              value={this.state.lastname}
              onChange={this.handleLastname.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Email Address"
              value={this.state.email}
              onChange={this.handleEmail.bind(this)}
              className="text-field"
            /><br />
            <TextField
              hintText="Password"
              value={this.state.password}
              onChange={this.handlePassword.bind(this)}
              className="text-field"
              type="password"
            /><br />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default Register;
