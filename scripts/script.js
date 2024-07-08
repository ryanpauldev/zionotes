document.addEventListener('DOMContentLoaded', function() {
    const videoUrlField = document.getElementById('video-url');
    const emailField = document.getElementById('email');

    videoUrlField.addEventListener('input', function(event) {
        const videoUrl = event.target.value;
        if (validateUrl(videoUrl)) {
            displayThumbnail(videoUrl);
        } else {
            removeThumbnail();
        }
    });

    emailField.addEventListener('input', function() {
        // Optional: you can perform any real-time email validation or actions here
    });

    document.getElementById('zionotes-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const videoUrl = document.getElementById('video-url').value;
        const email = document.getElementById('email').value;

        if (validateUrl(videoUrl) && validateEmail(email)) {
            Swal.fire({
                icon: 'success',
                title: 'Zionotes Generation Underway',
                text: `Check your email in a few minutes to view your personalized Zionotes pdf and video player`
            });
            console.log(`YouTube URL: ${videoUrl}`);
            console.log(`Email: ${email}`);
            // Perform your submission actions here
        } else {
            let errorMessage = '';

            if (!validateUrl(videoUrl) && !validateEmail(email)) {
                errorMessage = 'Both the URL and email inputs are invalid.';
            } else if (!validateUrl(videoUrl)) {
                errorMessage = 'The URL input is invalid.';
            } else if (!validateEmail(email)) {
                errorMessage = 'The email input is invalid.';
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: errorMessage
            });
        }
    });

    function validateUrl(url) {
        const pattern = new RegExp('^(https?:\\/\\/)?(www\\.)?(youtube\\.com|youtu\\.be)\\/.*$','i');
        if (!pattern.test(url)) {
            return false;
        }
        const urlObj = new URL(url);
        const params = new URLSearchParams(urlObj.search);
        if (urlObj.hostname === 'youtu.be') {
            return true; // youtu.be short link is valid if it reaches here
        }
        return urlObj.hostname === 'www.youtube.com' && params.has('v');
    }

    function validateEmail(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }

    function extractVideoId(url) {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            return urlObj.pathname.slice(1);
        }
        const params = new URLSearchParams(urlObj.search);
        return params.get('v');
    }

    function displayThumbnail(videoUrl) {
        const videoId = extractVideoId(videoUrl);
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
        const thumbnailLink = `https://www.youtube.com/watch?v=${videoId}`;

        const videoUrlField = document.getElementById('video-url');
        const existingThumbnail = document.getElementById('video-thumbnail');

        if (existingThumbnail) {
            existingThumbnail.src = thumbnailUrl;
            existingThumbnail.parentNode.href = thumbnailLink;
        } else {
            videoUrlField.style.display = 'none';

            const thumbnailElement = document.createElement('a');
            thumbnailElement.href = thumbnailLink;
            thumbnailElement.target = '_blank';

            const imgElement = document.createElement('img');
            imgElement.id = 'video-thumbnail';
            imgElement.src = thumbnailUrl;
            imgElement.alt = 'YouTube Video Thumbnail';
            imgElement.style.maxWidth = '100%';

            thumbnailElement.appendChild(imgElement);
            videoUrlField.parentNode.insertBefore(thumbnailElement, videoUrlField.nextSibling);

            const undoButton = document.createElement('button');
            undoButton.id = 'undo-button';
            undoButton.innerHTML = '<i class="fas fa-undo-alt"></i>';
            undoButton.addEventListener('click', function() {
                removeThumbnail();
                videoUrlField.value = '';
            });

            // Apply styles to center the button
            undoButton.style.display = 'block';
            undoButton.style.margin = '10px auto';
            undoButton.style.textAlign = 'center';

            thumbnailElement.parentNode.insertBefore(undoButton, thumbnailElement.nextSibling);
        }
    }

    function removeThumbnail() {
        const videoUrlField = document.getElementById('video-url');
        const thumbnailElement = document.getElementById('video-thumbnail');
        const undoButton = document.getElementById('undo-button');

        if (thumbnailElement) {
            thumbnailElement.parentElement.remove();
        }

        if (undoButton) {
            undoButton.remove();
        }

        videoUrlField.style.display = 'block';
        //videoUrlField.value = '';
    }
});
