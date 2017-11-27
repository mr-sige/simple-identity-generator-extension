/* eslint-disable react/prop-types,no-useless-escape */
import React from 'react';
import Message from './Message';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

export default class EmailForm extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      message: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSubmit() {
    const email = this.state.email;

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      this.setState({message: 'Invalid email'});
    } else {
      // eslint-disable-next-line no-undef
      chrome.storage.sync.set({'email': email}, () => {
        this.props.onSubmit(email);
      });
    }
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSubmit();
    }
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  render() {
    return (
      <div>
        <TextField hintText="sige@example.com" onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
        <FlatButton label="Save" secondary onClick={this.handleSubmit}/>
        {!!this.state.message && <Message message={this.state.message}/>}
      </div>
    );
  }
}
