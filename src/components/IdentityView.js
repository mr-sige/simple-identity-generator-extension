/* eslint-disable react/prop-types */
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import Browser from '../services/ChromeApi';
import Identity from '../services/Identity';

export default class IdentityView extends React.Component {
  constructor() {
    super();
    this.handleSettingsClick = this.handleSettingsClick.bind(this);

    Browser.getActiveUrl(url => {
      const identity = Identity.createIdentity(url, this.props.email);
      this.setState({identity: identity});
    });

    this.state = {
      identity: ''
    };
  }

  handleSettingsClick() {
    this.props.onSettingsClick('');
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
            <div onClick={this.handleSettingsClick}>
              <FontIcon className="material-icons">settings</FontIcon>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
