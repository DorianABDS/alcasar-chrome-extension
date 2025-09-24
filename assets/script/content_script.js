const CLICK_DELAY_MS = 2000; // 2s

window.addEventListener("load", () => {
  setTimeout(() => {
    // Simulate a click on the first input to trigger user interaction
    const inputCheck = document.querySelector(".App-Input");
    if (!inputCheck) {
      console.log("Already connected, no action taken.");
      return;
    }

    inputCheck.focus();
    inputCheck.click();
    console.log("Simulated interaction on input");

    // Wait a short moment before clicking the button
    setTimeout(() => {
      const btn = document.querySelector(".App-Button");
      if (btn) {
        btn.click();
        console.log(`'.App-Button' clicked after interaction`);
      } else {
        console.log("No '.App-Button' found");
      }
    }, 200); // 0.2s
  }, CLICK_DELAY_MS);
});
