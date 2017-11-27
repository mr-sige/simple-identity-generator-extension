/* eslint-disable react/prop-types */
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import chromeApi from '../services/chromeApi';
import identity from '../services/identity';

export default class Identity extends React.Component {
  constructor() {
    super();
    this.handleSettingsClick = this.handleSettingsClick.bind(this);

    chromeApi.getActiveUrl(url => {
      const email = this.props.email;
      const id = identity.createIdentity(url, email);
      this.setState({identity: id});
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
