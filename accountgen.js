
window.onload = function () {

    var gmailFirstPart = 'sigeqa',
        copyAccount = function (account) {
            var copyDiv = document.createElement('div');
            copyDiv.contentEditable = true;
            document.body.appendChild(copyDiv);
            copyDiv.innerHTML = account;
            copyDiv.unselectable = 'off';
            copyDiv.focus();
            document.execCommand('SelectAll');
            document.execCommand('Copy', false, null);
            document.body.removeChild(copyDiv);
        },
        account = gmailFirstPart + '+' + new Date().getTime() + '@gmail.com';

    copyAccount(account);
    document.getElementById('accountDiv').innerHTML = account;
}