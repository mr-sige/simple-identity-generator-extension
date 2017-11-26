/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class Identity extends React.Component {
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
    const empty = '';
    chrome.storage.sync.set({'email':empty}, () => {
      this.props.onClear(empty);
    });
  }

  render(){
    const settingsIcon = require('../assets/settings.svg');
    return(
      <div>
        <div className="alert alert-primary">{this.state.identity}</div>
        <CopyToClipboard text={this.state.identity}>
          <button className="btn btn-primary copybutton">Copy to clipboard</button>
        </CopyToClipboard>
        <img src={settingsIcon} className="settings" onClick={this.handleClear}/>
      </div>
    );
  }
}
