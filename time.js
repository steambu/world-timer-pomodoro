// Get the elements we need to work with
const timeDisplay = document.querySelector(".time");
const timezoneSelect = document.querySelector("#timezone");
const formatButtons = document.querySelectorAll(".format button");

// Update the time display
function updateTime() {
  const now = new Date();
  const timezone = timezoneSelect.value;
  const options = {
    timeZone: timezone,
    hour12: formatButtons[0].classList.contains("active"),
  };
  let time = now.toLocaleTimeString([], options);
  timeDisplay.textContent = time;
}

// Update the time display every second
setInterval(updateTime, 1000);

// Handle the format button clicks
formatButtons.forEach((button) => {
  button.addEventListener("click", () => {
    formatButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const timeFormat = button.id === "12h" ? "short" : "long";
    const timezone = timezoneSelect.value;
    const options = { timeZone: timezone, hour12: button.id === "12h" };
    timeDisplay.textContent = new Date().toLocaleTimeString([], options);
  });
});
