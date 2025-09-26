// Check interval in milliseconds
const CHECK_INTERVAL_MS = 2000;

// Main reconnection logic
function autoReconnect() {
    // Skip if extension is disabled
    if (localStorage.getItem('autoReconnectActive') === 'false') {
        return;
    }

    // Find login elements
    const inputCheck = document.querySelector(".App-Input");
    const btn = document.querySelector(".App-Button");

    // Handle login page
    if (inputCheck) {
        setTimeout(() => {
            // Focus and click input field
            inputCheck.focus();
            inputCheck.click();
            console.log("Simulated interaction on input");

            // Click login button after delay
            if (btn) {
                setTimeout(() => {
                    btn.click();
                    console.log("Login button clicked after delay");
                }, 1000);
            }
        }, 1000);
        return;
    }

    // Handle logout and menu pages
    const links = document.querySelectorAll("a");
    for (let i = 0; i < links.length; i++) {
        const text = links[i].textContent.trim();

        // Click reconnection links
        if (text === "Revenir à la page d'accueil" || text === "Ouvrir une session") {
            setTimeout(() => {
                links[i].click();
                console.log(`Clicked link: '${text}'`);
            }, 0);
            break;
        }
    }
}