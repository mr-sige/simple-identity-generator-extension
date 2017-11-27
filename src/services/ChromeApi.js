/* eslint-disable no-undef*/

export default class ChromeApi {

  static getEmail(callback) {
    chrome.storage.sync.get('email', callback);
  }

  static setEmail(email, callback) {
    chrome.storage.sync.set({'email': email}, callback);
  }

  static getActiveUrl(callback) {
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
      if (tabs && tabs[0]) {
        const url = new URL(tabs[0].url);
        callback(url);
      } else {
        throw new Error('No active Tab found');
      }
    });
  }

}
