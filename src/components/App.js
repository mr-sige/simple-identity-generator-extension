import React from 'react';
import EmailForm from './EmailForm';
import Identity from './Identity';

export default class App extends React.Component {

  constructor() {
    super();
    this.state ={
      'email': ''
    };
    this.handleStoredEmail = this.handleStoredEmail.bind(this);
// eslint-disable-next-line no-undef
    chrome.storage.sync.get('email', (result) => {
      this.handleStoredEmail(result.email);
    });
  }

  handleStoredEmail(email) {
    this.setState({'email': email});
  }

  render() {
    const email = this.state.email;
    return (
      <div>
        {email ? (
          <Identity email={email} onClear={this.handleStoredEmail}/>
        ) : (
          <EmailForm onSubmit={this.handleStoredEmail}/>
        )}
      </div>
    );
  }
}
