document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const shareContainer = document.querySelector('.share-container');

    logo.addEventListener('mouseenter', () => {
        logo.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            logo.style.transform = 'rotate(0deg)';
        }, 600);
    });

    const sections = document.querySelectorAll('main, .related-posts, footer');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });

    window.addEventListener('scroll', () => {
        const scrollProgress = document.getElementById('progress-bar');
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';
    });

    document.addEventListener('click', (event) => {
        if (!shareContainer.contains(event.target) && !event.target.closest('.floating-action-button')) {
            shareContainer.classList.remove('active');
        }
    });
});

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}

function shareTo(platform) {
    let url = '';
    switch (platform) {
        case 'whatsapp':
            url = `https://api.whatsapp.com/send?text=${document.location.href}`;
            break;
        case 'linkedin':
            url = `https://www.linkedin.com/sharing/share-offsite/?url=${document.location.href}`;
            break;
        case 'twitter':
            url = `https://twitter.com/share?url=${document.location.href}`;
            break;
        case 'telegram':
            url = `https://t.me/share/url?url=${document.location.href}&text=Check%20this%20out!`;
            break;
    }
    window.open(url, '_blank');
    toggleShareOptions(); // Hide the share options container after clicking
}

function copyLink(event) {
    if (event) event.preventDefault();
    navigator.clipboard.writeText(document.location.href).then(() => {
        const notification = document.getElementById('copy-notification');
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 500);
        }, 3000);
    });
    toggleShareOptions(); // Hide the share options container after copying link
}

function toggleShareOptions() {
    const shareContainer = document.querySelector('.share-container');
    shareContainer.classList.toggle('active');
}
