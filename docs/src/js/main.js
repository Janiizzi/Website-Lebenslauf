let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
let hideTimeout;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Nach unten scrollen: Navbar ausblenden (mit Verzögerung)
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.transition = 'transform 0.3s';
        }, 150);
    } else {
        // Nach oben scrollen: Navbar einblenden
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

const BLOCKS = 20;

function showLoadingBarRetro() {
    const frame = document.getElementById('loading-bar-frame');
    const blocksContainer = document.getElementById('loading-bar-blocks');
    const percent = document.getElementById('loading-bar-percent');
    const main = document.getElementById('main-content');
    if (main) main.style.display = 'none';

    // Blöcke erzeugen
    blocksContainer.innerHTML = '';
    for (let i = 0; i < BLOCKS; i++) {
        const block = document.createElement('div');
        block.className = 'loading-bar-block';
        block.style.background = '#fff'; // Start: leer
        blocksContainer.appendChild(block);
    }

    frame.style.display = 'block';

    // Schrittweise füllen in 0.8 Sekunden
    let filled = 0;
    percent.textContent = '0%';
    const interval = 600 / BLOCKS;
    function fillNextBlock() {
        if (filled < BLOCKS) {
            blocksContainer.children[filled].style.background = '#111';
            filled++;
            percent.textContent = Math.round((filled / BLOCKS) * 100) + '%';
            setTimeout(fillNextBlock, interval);
        }
    }
    fillNextBlock();
}

function hideLoadingBarRetro() {
    const frame = document.getElementById('loading-bar-frame');
    const main = document.getElementById('main-content');
    setTimeout(() => {
        frame.style.display = 'none';
        if (main) main.style.display = '';
    }, 200);
}

document.querySelectorAll('.nav-link, .navbar-brand').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.charAt(0) !== '#') {
            e.preventDefault();
            showLoadingBarRetro();
            setTimeout(() => { window.location.href = href; }, 600);
        }
    });
});

window.addEventListener('pageshow', hideLoadingBarRetro);