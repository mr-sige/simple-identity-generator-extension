export default class identity {
  static createIdentity(url, email) {
    const hostnameArray = url.hostname.split(".");
    const currentDomain = hostnameArray[hostnameArray.length - 2];
    const [emailLocalPart, emailDomain] = email.split("@");
    return emailLocalPart + "+" + currentDomain + "@" + emailDomain;
  }
}
