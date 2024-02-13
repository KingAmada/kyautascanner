window.addEventListener('DOMContentLoaded', (event) => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        // Check if the decoded text is a valid URL
        if (isValidHttpUrl(decodedText)) {
            // If it's a valid URL, navigate to it
            window.location.href = decodedText;
        } else {
            // If it's not a valid URL, display an error message
            document.getElementById('qr-reader-results').innerText = "Error: This is not the right QR code.";
        }
    };
    const qrCodeErrorCallback = (errorMessage) => {
        // Handle scan error, ignore or log
        console.error(errorMessage);
    };

    // Check if a string is a valid URL
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
