document.addEventListener('DOMContentLoaded', function() {
const cameraGrid = document.getElementById('cameraGrid');
const numCameras = 15;

for (let i = 1; i <= numCameras; i++) {
    const cameraId = `cam${i}`;
    const cameraName = `Camera ${i}`;

    // Create camera container
    const cameraContainer = document.createElement('div');
    cameraContainer.className = 'camera';

    // Create camera name heading
    const cameraHeading = document.createElement('h3');
    cameraHeading.textContent = `${cameraName}`;

    // Create video element
    const videoElement = document.createElement('video');
    videoElement.id = cameraId;
    videoElement.autoplay = true;
    videoElement.muted = true;

    // Append elements to camera container
    cameraContainer.appendChild(cameraHeading);
    cameraContainer.appendChild(videoElement);

    // Append camera container to grid
    cameraGrid.appendChild(cameraContainer);

    // Simulated video source (replace with actual camera URL)
    const videoSource = 'https://www.w3schools.com/html/mov_bbb.mp4'; // Example video source

    // Set video source
    videoElement.src = videoSource;
}

});
