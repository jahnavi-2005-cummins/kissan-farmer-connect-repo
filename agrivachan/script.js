// Wait for the DOM to load


document.addEventListener("DOMContentLoaded", function () {
    // Always show the location popup when the site loads
    showLocationPopup();

    // Auto-slide the product carousel every 3 seconds
    setInterval(scrollProductCarousel, 1000);

    // Auto-slide the main image carousel every 3 seconds
    setInterval(slideMainCarousel, 3000);
});

// Function to show the location popup manually (if needed)
function showLocationPopup() {
    document.getElementById("location-popup-overlay").style.display = "flex";
}

// Function to close the location popup
function closePopup() {
    document.getElementById("location-popup-overlay").style.display = "none";
}

// Function to save selected location
function saveLocation() {
    let location = document.getElementById("location-select").value;
    if (location) {
        localStorage.setItem("userLocation", location);
        closePopup();
    } else {
        alert("Please select a location!");
    }
}

// 🔹 Auto-Sliding **Main Image Carousel**
let index = 0;

function slideMainCarousel() {
    const carousel = document.querySelector(".carousel-images");
    const totalImages = document.querySelectorAll(".carousel-item").length;

    if (!carousel || totalImages === 0) return; // Avoid errors if elements are missing

    index = (index + 1) % totalImages; // Loop back after the last image
    carousel.style.transform = `translateX(-${index * 100}vw)`;
}

// 🔹 Auto-Sliding **Product Cards Carousel**
function scrollProductCarousel() {
    let carousel = document.querySelector(".product-carousel");
    let card = document.querySelector(".product-card");

    if (!carousel || !card) return; // Avoid errors if elements are missing

    let cardWidth = card.offsetWidth; // Get card width

    // Scroll right by one card width
    if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
        carousel.scrollLeft = 0; // Reset to start when reaching the end
    } else {
        carousel.scrollLeft += cardWidth;
    }
}