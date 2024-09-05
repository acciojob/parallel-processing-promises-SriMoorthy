//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

        function downloadImage(image) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = image.url;

                // Resolve when the image is successfully loaded
                img.onload = () => resolve(img);

                // Reject if there's an error while loading the image
                img.onerror = () => reject(new Error(`Failed to load image's URL: ${image.url}`));
            });
        }

        // Function to handle downloading all images in parallel
        function downloadImages() {
            const imagePromises = images.map(image => downloadImage(image));

            Promise.all(imagePromises)
                .then(images => {
                    const outputDiv = document.getElementById('output');
                    outputDiv.innerHTML = '';  // Clear the output div before adding new images

                    images.forEach(img => {
                        outputDiv.appendChild(img);  // Display each loaded image in the output div
                    });
                })
                .catch(error => {
                    console.error(error);  // Log error if any image fails to load
                    alert(error.message);  // Show an alert with the error message
                });
        }

        // Attach event listener to the button
        document.getElementById('download-images-button').addEventListener('click', downloadImages);
