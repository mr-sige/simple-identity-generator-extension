/* eslint-disable no-undef*/

export default class BrowserApi {

  static getEmail(callback) {
    browser.storage.sync.get('email', callback);
  }

  static setEmail(email, callback) {
    browser.storage.sync.set({'email': email}, callback);
  }

  static getActiveUrl(callback) {
    browser.tabs.query({currentWindow: true, active: true}, tabs => {
      if (tabs && tabs[0]) {
        const url = new URL(tabs[0].url);
        callback(url);
      } else {
        throw new Error('No active Tab found');
      }
    });
  }

}
