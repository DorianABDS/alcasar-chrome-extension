# Alcasar Chrome Extension

![GitHub Release (latest by semver)](https://img.shields.io/github/v/release/DorianABDS/alcasar-chrome-extension)
![License](https://img.shields.io/github/license/DorianABDS/alcasar-chrome-extension)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Web%20Store-Visit%20Extension-blue?logo=google-chrome)](https://chrome.google.com/webstore/detail/alcasar-chrome-extension)

This Chrome extension allows you to **automatically handle the authentication flow** on the [Alcasar](https://alcasar.laplateforme.io) portal. It clicks buttons and simulates user interactions to maintain connection without manual intervention.

---

## Features

* **Auto-click on navigation and authentication links** based on link text (`Revenir à la page d'accueil` and `Ouvrir une session`).
* **Login page handling**: waits 1 second for credentials to appear before interacting with input and button.
* **Immediate action on other pages**: clicks navigation links instantly.
* **Auto-reconnect**: if logged out, the script navigates to the login page and interacts automatically.
* **Session maintenance**: checks continuously every 2 seconds to prevent accidental logouts.
* **No UI required**: everything runs in the background.

---

## Installation

### From Source

1. Clone this repository or download the zip:

   ```bash
   git clone https://github.com/DorianABDS/alcasar-chrome-extension.git
   cd alcasar-chrome-extension
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install `standard-version` to manage releases:

   ```bash
   npm install --save-dev standard-version
   ```

4. Load the extension in Chrome:

   * Open `chrome://extensions/`
   * Enable **Developer mode**
   * Click **Load unpacked extension**
   * Select the cloned project folder

---

## Configuration

* Interval for continuous checking can be set in `content.js`:

  ```javascript
  const CHECK_INTERVAL_MS = 2000; // 2 seconds
  ```

* Delays for login input and button are set in `setTimeout` (1 second each in this version).

* The script relies on link text to identify navigation (`Revenir à la page d'accueil` and `Ouvrir une session`).

---

## How It Works

1. **Login page**:

   * Waits 1 second for credentials.
   * Focuses and clicks the input field.
   * Clicks the login button after 1 second.
2. **Other pages**:

   * Clicks the first navigation link (`Revenir à la page d'accueil` or `Ouvrir une session`) immediately.
3. **Continuous checking**:

   * Every 2 seconds, the script repeats to maintain session.

---

## Contributions

Contributions are welcome!

[![Contributors](https://contrib.rocks/image?repo=UntitledProject-MC-1/minecraft-server-core)](https://github.com/UntitledProject-MC-1/minecraft-server-core/graphs/contributors)

---

## License

This project is licensed under the [MIT](LICENSE) license.
