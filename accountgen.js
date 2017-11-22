const submitButton = document.getElementById('submit');
const emailInput = document.getElementById('emailInput');
const messageDiv = document.getElementById("message");
const clearLink = document.getElementById('clear');
let userEmail = "";

submitButton.onclick = () => {
    storeUserEmail(emailInput.value);
    setUiState();
};

clearLink.onclick = () => {
    chrome.storage.sync.clear(() => {
        setUiState();
    });
};

window.onload = () => {
    setUiState();
};

function setUiState(){
    loadUserEmail();
    const emailIsSet = !!userEmail;
    if (emailIsSet){
        submitButton.style.display = 'none';
        emailInput.style.display = 'none';
        messageDiv.style.display = '';
    } else {
        submitButton.style.display = '';
        emailInput.style.display = '';
        messageDiv.style.display = 'none';
    }
}

function generate() {
    const emailOriginal = userEmail || 'john@example.com';
    chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
        let url = new URL(tabs[0].url);
        let hostnameArray = url.hostname.split(".");
        let currentDomain = hostnameArray[hostnameArray.length - 2];
        createAccount(emailOriginal, currentDomain);
    });

    function copyAccountToClipboard(account) {
        var copyDiv = document.createElement("div");
        copyDiv.contentEditable = true;
        document.body.appendChild(copyDiv);
        copyDiv.innerHTML = account;
        copyDiv.unselectable = "off";
        copyDiv.focus();
        document.execCommand("SelectAll");
        document.execCommand("Copy", false, null);
        document.body.removeChild(copyDiv);
    }

    function createAccount(email, currentDomain) {
        var [emailLocalPart, emailDomain] = email.split("@");
        account = emailLocalPart + "+" + currentDomain + "@" + emailDomain;
        copyAccountToClipboard(account);
        showMessage(account);
    }
}

function storeUserEmail(email) {
    chrome.storage.sync.set({ 'email': email }, () => {
        showMessage("Saved!");
        setUiState();
    });
}

function loadUserEmail() {
    chrome.storage.sync.get('email', (result) => {
        userEmail = result.email;
    });
};

function showMessage(message) {
    messageDiv.innerHTML = message;
};