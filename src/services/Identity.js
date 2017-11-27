export default class Identity {

  static createIdentity(url, email) {
    if (!email || !url) {
      throw new Error('Missing parameter!');
    }
    const hostnameArray = url.hostname.split(".");
    const currentDomain = hostnameArray[hostnameArray.length - 2];
    if (!currentDomain) {
      return email;
    }
    const [emailLocalPart, emailDomain] = email.split("@");
    return emailLocalPart + "+" + currentDomain + "@" + emailDomain;
  }
}
