// Function to extract query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
window.addEventListener('DOMContentLoaded', (event) => {
    // Extract the amount from the query parameters
    const amount = getQueryParam('amount'); // Assuming the amount is passed as a URL query parameter
    const html5QrCode = new Html5Qrcode("qr-reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    let scanning = false; // Flag to indicate scanning state
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        // Append the amount parameter to the decoded URL, if it's valid and amount is present
         scanning = false; // Reset scanning flag
        let urlWithAmount = decodedText;
        if (isValidHttpUrl(decodedText) && amount) {
            urlWithAmount += `?amount=${encodeURIComponent(amount)}`;
        }

        // Navigate to the modified URL or show an error message
        if (isValidHttpUrl(urlWithAmount)) {
            window.location.href = urlWithAmount;
        } else {
            document.getElementById('qr-reader-results').innerText = "Error: Invalid QR code or URL.";
        }
    };
    // Define the qrCodeErrorCallback function
    const qrCodeErrorCallback = (errorMessage) => {
         // Minimal error handling to avoid spamming the user with error messages
        if (!scanning) {
            console.error(errorMessage);
            document.getElementById('qr-reader-results').innerText = "Scanning... Please present a QR code.";
            scanning = true; // Set scanning flag to true after the first error to indicate scanning is in progress
        }
    };
  // Function to check if a string is a valid URL
    function isValidHttpUrl(string) {
        let url;
        try {
            url = new URL(string);
        } catch (_) {
            return false;  
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }
    // Start the QR code scanner
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
            const cameraId = cameras[0].id; // or use cameras[1].id for the back camera
            html5QrCode.start(cameraId, config, qrCodeSuccessCallback, qrCodeErrorCallback)
            .catch(err => console.log(`Unable to start QR Code scanner: ${err}`));
        }
    }).catch(err => console.log(`Unable to fetch cameras: ${err}`));
});
