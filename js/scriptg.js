
// Catálogo enriquecido de obras con Ficha Técnica Formal y soporte de estados
const artworks = [
    {
        id: 1,
        title: "AJehová es mi Pastor",
        technique: "Óleo sobre lienzo",
        dimensions: "100 x 80 cm",
        year: "2026",
        status: "Vendido",
        statusClass: "status-sold",
        description: "Óleo sobre lienzo. Una exploración de la luz y el color cálido para una escena de campo.",
        image: "https://www.datocms-assets.com/234127/1792260676-jesus-pastor-wide.webp"
    },
    {
        id: 2,
        title: "Geometría del Pensamiento",
        technique: "Técnica mixta y acrílico",
        dimensions: "120 x 90 cm",
        year: "2023",
        status: "Colección Privada",
        statusClass: "status-private",
        description: "Estructuras abstractas superpuestas que representan la dualidad entre el orden geométrico del razonamiento y el flujo orgánico de las emociones.",
        image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=2000&q=85"
    },
    {
        id: 3,
        title: "Bosque Encantado",
        technique: "Acuarela sobre papel Canson",
        dimensions: "70 x 50 cm",
        year: "2024",
        status: "En Exposición",
        statusClass: "status-exhibition",
        description: "Capas sucesivas de veladuras en tonos fríos. Explora la bruma y la atmósfera serena de la naturaleza profunda mediante pigmentos botánicos.",
        image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=2000&q=85"
    },
    {
        id: 4,
        title: "Retrato en Azul",
        technique: "Óleo sobre madera",
        dimensions: "60 x 60 cm",
        year: "2023",
        status: "Disponible",
        statusClass: "status-available",
        description: "Exploración monocrática basada en la paleta del azul ultramar y cobalto, buscando trasmitir introspección y profundidad expresiva.",
        image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=2000&q=85"
    }
];

let currentIndex = 0;
let isLightboxOpen = false;

// Referencias a los elementos del DOM principal
const mainArtwork = document.getElementById('mainArtwork');
const artworkContainer = document.getElementById('artworkContainer');
const artworkTitle = document.getElementById('artworkTitle');
const artworkStatus = document.getElementById('artworkStatus');
const artworkDescription = document.getElementById('artworkDescription');
const artworkTechnique = document.getElementById('artworkTechnique');
const artworkDimensions = document.getElementById('artworkDimensions');
const artworkYear = document.getElementById('artworkYear');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const thumbnailsContainer = document.getElementById('thumbnailsContainer');

// Referencias al Modal de Modo Exposición (Lightbox)
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const closeLightbox = document.getElementById('closeLightbox');
const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
const lightboxNextBtn = document.getElementById('lightboxNextBtn');

// Renderizar la Galería e Inicializar eventos
function renderGallery() {
    // Renderizar miniaturas
    thumbnailsContainer.innerHTML = '';
    artworks.forEach((art, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumb-card ${index === currentIndex ? 'active' : ''}`;
        thumb.setAttribute('title', art.title);
        thumb.innerHTML = `<img src="${art.image}" alt="${art.title}">`;
        thumb.addEventListener('click', (e) => {
            e.stopPropagation();
            updateActiveArtwork(index);
        });
        thumbnailsContainer.appendChild(thumb);
    });

    // Cargar datos de la obra inicial
    updateActiveArtwork(currentIndex, false);
}

// Transición de Fundido Elegante (Fade Effect) y actualización de datos
function updateActiveArtwork(index, useFade = true) {
    currentIndex = index;
    const current = artworks[currentIndex];

    if (useFade) {
        // Iniciar efecto fundido (Fade Out)
        mainArtwork.classList.add('fading');
        if (isLightboxOpen) lightboxImage.style.opacity = '0';

        setTimeout(() => {
            applyArtworkData(current);
            // Finalizar efecto fundido (Fade In)
            mainArtwork.classList.remove('fading');
            if (isLightboxOpen) lightboxImage.style.opacity = '1';
        }, 300); // Duración coordinada con CSS
    } else {
        applyArtworkData(current);
    }

    // Actualizar miniatura activa y scroll automático
    const thumbs = thumbnailsContainer.children;
    Array.from(thumbs).forEach((thumb, i) => {
        if (i === currentIndex) {
            thumb.classList.add('active');
            thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
            thumb.classList.remove('active');
        }
    });
}

// Aplicar los datos de la ficha técnica al DOM
function applyArtworkData(art) {
    mainArtwork.src = art.image;
    mainArtwork.alt = art.title;

    artworkTitle.textContent = art.title;
    artworkDescription.textContent = art.description;
    artworkTechnique.textContent = art.technique;
    artworkDimensions.textContent = art.dimensions;
    artworkYear.textContent = art.year;

    // Actualizar estado (Disponible, Colección Privada, etc.)
    artworkStatus.textContent = art.status;
    artworkStatus.className = `status-badge ${art.statusClass}`;

    // Actualizar lightbox si está activo
    if (isLightboxOpen) {
        lightboxImage.src = art.image;
        lightboxTitle.textContent = art.title;
    }
}

// Controles de navegación (Anterior / Siguiente)
function navigatePrev() {
    const newIndex = currentIndex === 0 ? artworks.length - 1 : currentIndex - 1;
    updateActiveArtwork(newIndex);
}

function navigateNext() {
    const newIndex = currentIndex === artworks.length - 1 ? 0 : currentIndex + 1;
    updateActiveArtwork(newIndex);
}

// Gestión del Modo Exposición (Lightbox)
function openExhibitionMode() {
    isLightboxOpen = true;
    lightboxImage.src = artworks[currentIndex].image;
    lightboxTitle.textContent = artworks[currentIndex].title;
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Bloquear scroll del fondo
}

function closeExhibitionMode() {
    isLightboxOpen = false;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = ''; // Restablecer scroll
}

// Event Listeners
prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigatePrev(); });
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateNext(); });

lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigatePrev(); });
lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateNext(); });

artworkContainer.addEventListener('click', openExhibitionMode);
closeLightbox.addEventListener('click', closeExhibitionMode);

// Cerrar Lightbox si se hace clic fuera de la imagen
lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-image-container')) {
        closeExhibitionMode();
    }
});

// Navegación accesible con Teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') navigatePrev();
    if (e.key === 'ArrowRight') navigateNext();
    if (e.key === 'Escape' && isLightboxOpen) closeExhibitionMode();
});

// Inicialización al cargar la página
window.addEventListener('DOMContentLoaded', renderGallery);
