const CHECK_INTERVAL_MS = 2000; // 2s

function autoReconnect() {
    const inputCheck = document.querySelector(".App-Input"); // login input
    const btn = document.querySelector(".App-Button"); // login button

    // Login page
    if (inputCheck) {
        // wait 2s to let credentials appear
        setTimeout(() => {
            inputCheck.focus();
            inputCheck.click();
            console.log("Simulated interaction on input");

            if (btn) {
                setTimeout(() => {
                    btn.click();
                    console.log("Login button clicked after delay");
                }, 1000);
            }
        }, 1000);
        return;
    }

    // Logout and menu pages
    const links = document.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
        const text = links[i].textContent.trim();

        // click the first valid link immediately
        if (text === "Revenir à la page d'accueil" || text === "Ouvrir une session") {
            setTimeout(() => {
                links[i].click();
                console.log(`Clicked link: '${text}'`);
            }, 0); // 0s
            break;
        }
    }
}

// Run on page load
window.addEventListener("load", () => {
    setTimeout(() => {
        autoReconnect();

        // check continuously every 2s
        setInterval(() => {
            autoReconnect();
        }, CHECK_INTERVAL_MS);
    }, 0); // immediate start for non-login pages
});
