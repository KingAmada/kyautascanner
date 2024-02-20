window.addEventListener('DOMContentLoaded', (event) => {
    // Extract the amount from the query parameters
    const amount = getQueryParam('amount'); // Assuming the amount is passed as a URL query parameter

    const html5QrCode = new Html5Qrcode("qr-reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        // Append the amount parameter to the decoded URL, if it's valid and amount is present
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

    // Start the QR code scanner
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
            const cameraId = cameras[0].id; // or use cameras[1].id for the back camera
            html5QrCode.start(cameraId, config, qrCodeSuccessCallback, qrCodeErrorCallback)
            .catch(err => console.log(`Unable to start QR Code scanner: ${err}`));
        }
    }).catch(err => console.log(`Unable to fetch cameras: ${err}`));
});
