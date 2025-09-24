const CHECK_INTERVAL_MS = 2000; // 2s

function autoReconnect() {
    // If logout button exists, click it to go back to menu
    // TODO: rename ID_name_logout with the good name
    const logoutLink = document.querySelector(".{ID_name_logout}");
    if (logoutLink) {
        logoutLink.click();
        console.log(`'.{ID_name_logout}' clicked to go back to menu`);
    } else {
        console.log(`'No '.{ID_name_logout}' found`);
        return;
    }

    // If login button exists, click it to go to the login page
    // TODO: rename ID_name_logout with the good name
    const loginLink = document.querySelector(".{ID_name_login}");
    if (loginLink) {
        loginLink.click();
        console.log(`'.{ID_name_login}' clicked to go to login page`);
    } else {
        console.log(`'No '.{ID_name_logout}' found`);
        return;
    }

    // If login input exists, simulate interaction and click the button
    const inputCheck = document.querySelector(".App-Input");
    if (inputCheck) {
        inputCheck.focus();
        inputCheck.click();
        console.log("Simulated interaction on input");

        const btn = document.querySelector(".App-Button");
        if (btn) {
            btn.click();
            console.log(`'.App-Button' clicked after interaction`);
        } else {
            console.log("No '.App-Button' found");
        }
    } else {
        console.log("Already connected or input not found");
    }
}

// Automatically run on page load
window.addEventListener("load", () => {
    autoReconnect();
    // Continuous check to stay connected
    setInterval(autoReconnect, CHECK_INTERVAL_MS);
});
