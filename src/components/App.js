import React from 'react';
import EmailForm from './EmailForm';
import IdentityView from './IdentityView';
import Browser from '../services/ChromeApi';

export default class App extends React.Component {

  constructor() {
    super();
    this.state ={
      email: ''
    };
    this.updateStoredEmail = this.updateStoredEmail.bind(this);
    Browser.getEmail((result) => {
      this.updateStoredEmail(result.email);
    });
  }

  updateStoredEmail(email) {
    Browser.setEmail(email);
    this.setState({email: email});
  }

  render() {
    const email = this.state.email;
    return (
      <div>
        {email ? (
          <IdentityView email={email} onSettingsClick={this.updateStoredEmail}/>
        ) : (
          <EmailForm onSubmit={this.updateStoredEmail}/>
        )}
      </div>
    );
  }
}
