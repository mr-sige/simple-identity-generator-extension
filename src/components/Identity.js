/* eslint-disable react/prop-types,no-undef */
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

export default class Identity extends React.Component {
  constructor() {
    super();
    this.handleTabs = this.handleTabs.bind(this);
    this.handleClear = this.handleClear.bind(this);

    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
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
    chrome.storage.sync.set({'email': empty}, () => {
      this.props.onClear(empty);
    });
  }

  render() {
    return (
      <div>
        <TextField id="identity" value={this.state.identity}/>
        <div className="controls">
          <CopyToClipboard text={this.state.identity}>
            <RaisedButton label="Copy to clipboard" secondary/>
          </CopyToClipboard>
          <div className="settings">
            <div onClick={this.handleClear}>
              <FontIcon className="material-icons">settings</FontIcon>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
