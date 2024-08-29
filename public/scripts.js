const statusElement = document.getElementById('status');

(async () => {
    await fetch('/bot/status', { method: "POST" }).then(res => res.text()).then(data => statusElement.textContent = "Status: " + data);
})();

document.getElementById('startBot').addEventListener('click', () => {
    statusElement.textContent = "Status: Waiting...";

    fetch('/bot/start', { method: 'POST' })
        .then(response => response.text())
        .then(data => {
            statusElement.textContent = `Status: ${data}`;
        })
        .catch(error => {
            console.error('Error starting the bot:', error);
        });
});

document.getElementById('stopBot').addEventListener('click', () => {
    statusElement.textContent = "Status: Stopping...";

    fetch('/bot/stop', { method: 'POST' })
        .then(response => response.text())
        .then(data => {
            statusElement.textContent = `Status: ${data}`;
        })
        .catch(error => {
            console.error('Error stopping the bot:', error);
        });
});
