window.addEventListener('DOMContentLoaded', (event) => {
    const html5QrCode = new Html5Qrcode("qr-reader");
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        // Handle the decoded text
        console.log(`Decoded text: ${decodedText}`, decodedResult);
        document.getElementById('qr-reader-results').innerText = `Decoded Text: ${decodedText}`;
    };
    const qrCodeErrorCallback = (errorMessage) => {
        // parse error, ignore it.
    };

    // If facingMode: environment is not working, try to set the cameraId explicitly
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
            const cameraId = cameras[0].id; // or use cameras[1].id for the back camera
            html5QrCode.start(
              cameraId, 
              config, 
              qrCodeSuccessCallback,
              qrCodeErrorCallback)
            .catch(err => console.log(`Unable to start QR Code scanner: ${err}`));
        }
    }).catch(err => console.log(`Unable to fetch cameras: ${err}`));
});
