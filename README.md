# Alcasar Chrome Extension

![GitHub Release (latest by semver)](https://img.shields.io/github/v/release/DorianABDS/alcasar-chrome-extension)
![License](https://img.shields.io/github/license/DorianABDS/alcasar-chrome-extension)
[![Chrome Extension](https://img.shields.io/badge/Chrome%20Web%20Store-Visit%20Extension-blue?logo=google-chrome)](https://chrome.google.com/webstore/detail/alcasar-chrome-extension)

This Chrome extension allows you to **automatically handle the authentication flow** on the [Alcasar](https://alcasar.laplateforme.io) portal. It clicks buttons and simulates user interactions to maintain connection without manual intervention.

---

## Features

* **Auto-click on authentication and navigation buttons** including `.App-Button`, `.{ID_name_login}`, and `.{ID_name_logout}` after a configurable delay.
* **Interaction preparation**: detects `.App-Input` before triggering clicks to prevent disconnections.
* **Auto-reconnect**: if the user is logged out, the script navigates to the login page and simulates interaction to reconnect.
* **Session maintenance**: continuously checks connection status to prevent accidental logouts.
* **Configurable delay** (in milliseconds) before interactions to match page rendering times.
* **No user interface required**: all operations are done in the background.

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

* The delay before automatic actions can be configured in the main script file (`content.js`) using:

  ```javascript
  const CHECK_INTERVAL_MS = 2000; // 2 seconds by default
  ```

* All CSS selectors for buttons and inputs (`.App-Button`, `.App-Input`, `.{ID_name_login}`, `.{ID_name_logout}`) can be customized to match updates to the portal interface.

---

## How It Works

1. **Logout detection**: the script clicks `. {ID_name_logout}` if found to return to the menu.
2. **Login navigation**: clicks `. {ID_name_login}` to reach the login page.
3. **Input interaction**: focuses and clicks `.App-Input` to simulate user activity.
   > ⚠️ **Note:** As soon as the login page loads, it is important to perform a manual interaction, like clicking anywhere on the page or pressing a key, so that the page detects human activity. Without this, the login may constantly fail.
4. **Authentication**: clicks `.App-Button` to log in.
5. **Continuous checking**: every `CHECK_INTERVAL_MS`, the script repeats the process to maintain the session.

---

## Contributions

Contributions are welcome!

[![Contributors](https://contrib.rocks/image?repo=UntitledProject-MC-1/minecraft-server-core)](https://github.com/UntitledProject-MC-1/minecraft-server-core/graphs/contributors)

---

## License

This project is licensed under the [MIT](LICENSE) license.
