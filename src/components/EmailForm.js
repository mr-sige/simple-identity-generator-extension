/* eslint-disable react/prop-types */
import React from 'react';

class EmailForm extends React.Component {

  constructor() {
    super();
    this.state = {email: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    const email = this.state.email;
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({'email': email}, () => {
      this.props.onSubmit(email);
    });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({email: event.target.value});
  }

  render() {
    return (
      <div id="emailform">
        <input type="text" className="form-control" id="emailinput" placeholder="john@example.com"
               onChange={this.handleChange}/>
        <button id="submit" type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
      </div>
    );
  }
}

export default EmailForm;
