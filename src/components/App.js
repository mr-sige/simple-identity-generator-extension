import React from 'react';
import EmailForm from './EmailForm';
import Identity from './IdentityView';
import chromeApi from '../services/chromeApi';

export default class App extends React.Component {

  constructor() {
    super();
    this.state ={
      'email': ''
    };
    this.updateStoredEmail = this.updateStoredEmail.bind(this);
    chromeApi.getEmail((result) => {
      this.updateStoredEmail(result.email);
    });
  }

  updateStoredEmail(email) {
    chromeApi.setEmail(email);
    this.setState({'email': email});
  }

  render() {
    const email = this.state.email;
    return (
      <div>
        {email ? (
          <Identity email={email} onSettingsClick={this.updateStoredEmail}/>
        ) : (
          <EmailForm onSubmit={this.updateStoredEmail}/>
        )}
      </div>
    );
  }
}
