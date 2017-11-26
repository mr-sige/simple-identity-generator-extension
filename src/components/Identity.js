/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

class Identity extends React.Component {
  constructor() {
    super();
    this.handleTabs = this.handleTabs.bind(this);
    this.handleClear = this.handleClear.bind(this);

    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
      this.handleTabs(tabs);
    });
    this.state = {
      identity: ''
    };
  }

  handleTabs(tabs) {
    const email = this.props.email;
    let url = new URL(tabs[0].url);
    let hostnameArray = url.hostname.split(".");
    let currentDomain = hostnameArray[hostnameArray.length - 2];
    const [emailLocalPart, emailDomain] = email.split("@");
    const identity = emailLocalPart + "+" + currentDomain + "@" + emailDomain;
    this.setState({identity: identity});
  }

  handleClear() {
    chrome.storage.sync.set('email', () => {
      this.props.onClear('');
    });
  }

  render(){
    return(
      <div>
        <div className="alert alert-primary">{this.state.identity}</div>
        <a onClick={this.handleClear} href="#">Change setting</a>
        <CopyToClipboard text={this.state.identity}>
          <button className="btn btn-primary">Copy to clipboard</button>
        </CopyToClipboard>
      </div>
    );
  }
}

export default Identity;
