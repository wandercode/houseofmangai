document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }
})
const navbar = document.getElementById("navbar");
const navLink = document.getElementById("navLink");
const mobileMenu = document.getElementById("mobileMenu");

function openMenu() {
    mobileMenu.style.transform = 'translateX(-16rem)';
}

function closeMenu() {
    mobileMenu.style.transform = 'translateX(0)';
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');

    if (document.documentElement.classList.contains('dark')) {
        localStorage.theme = 'dark';
    } else {
        localStorage.theme = 'light';
    }
}

window.addEventListener('scroll', () => {
    if (scrollY > 50) {
        navbar.classList.add('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLink.classList.remove('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', "dark:bg-transparent");
    } else {
        navbar.classList.remove('bg-white', 'bg-opacity-50', 'backdrop-blur-lg', 'shadow-sm', 'dark:bg-darkTheme', 'dark:shadow-white/20');
        navLink.classList.add('bg-white', 'shadow-sm', 'bg-opacity-50', 'dark:border', 'dark:border-white/30', "dark:bg-transparent");
    }
})

// Lightbox Gallery Logic
const galleryItems = document.querySelectorAll('#work .aspect-square.group');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
let currentImageIndex = 0;
const imagesList = [];

if (galleryItems.length > 0 && lightbox && lightboxImg) {
    galleryItems.forEach((item, index) => {
        // Extract background image url
        const bgImg = item.style.backgroundImage;
        if (bgImg) {
            const urlMatch = bgImg.match(/url\(["']?(.*?)["']?\)/);
            if (urlMatch && urlMatch[1]) {
                imagesList.push(urlMatch[1]);
            } else {
                imagesList.push('');
            }
        } else {
            imagesList.push('');
        }

        item.addEventListener('click', (e) => {
            // Check if clicking on the send icon bubble to not trigger lightbox if intended otherwise?
            // "when click the image", we trigger lightbox. The whole div is the image.
            currentImageIndex = index;
            openLightbox(imagesList[currentImageIndex]);
        });
    });
}

function openLightbox(imgSrc) {
    if(!imgSrc) return;
    lightboxImg.src = imgSrc;
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // prevent scrolling
}

function closeLightbox() {
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto'; // enable scrolling
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = imagesList.length - 1;
    } else if (currentImageIndex >= imagesList.length) {
        currentImageIndex = 0;
    }
    lightboxImg.src = imagesList[currentImageIndex];
}

// Close lightbox when clicking outside the contained image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') changeImage(-1);
            if (e.key === 'ArrowRight') changeImage(1);
        }
    });
}