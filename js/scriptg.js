
// Catálogo enriquecido de obras con Ficha Técnica Formal y soporte de estados
const artworks = [


    {
        id: 8,
        title: "Jehová es mi Pastor",
        technique: "Óleo sobre lienzo",
        dimensions: "70 x 60 cm",
        year: "2026",
        status: "Vendido",
        statusClass: "status-sold",
        description: "La fe de la infancia rescatada por el arte. Lo que comenzó como un trazo sagrado devino en reencuentro con un recuerdo familiar. Una pintura donde Jesús, el Pastor, recobra la vida a través de una composición tejida con nostalgia y luz.",
        image: "https://www.datocms-assets.com/234127/1792372093-pastor.webp"
    },
    {
        id: 7,
        title: "Donde florecen las almas",
        technique: "Técnica Mixta",
        dimensions: "100 x 120 cm",
        year: "2026",
        status: "En Exposición",
        statusClass: "status-exhibition",
        description: "Nacida del misterio de la fe, esta pieza despoja a la muerte de sus sombras. Retrata al mensajero celeste como un tierno cosechador de almas, transformando el último adiós en un viaje de luz, paz y compañía sagrada.",
        image: "https://www.datocms-assets.com/234127/1792364469-trascendente.webp"
    },
  {
        id: 6,
        title: "Donde la guerra sigue viviendo",
        technique: "Óleo sobre lienzo",
        dimensions: "60 x 85 cm",
        year: "2026",
        status: "Disponible",
        statusClass: "status-available",
        description: "La posguerra en su herida más íntima. Una viuda acorralada por el hambre y la enfermedad de su niño, obligada a entregar su propio templo como última ofrenda para ganarle un pulso a la muerte.",
        image: "https://www.datocms-assets.com/234127/1792364469-sacrify.webp"
    },
  {
        id: 5,
        title: "Sangre de la tierra",
        technique: "Técnica Mixta",
        dimensions: "100 x 120 cm",
        year: "2026",
        status: "Disponible",
        statusClass: "status-available",
        description: "Esta obra refleja el pasado hisórico de un supuesto encuentro entre las culturas Moche y Nazca, rompiendo la línea temporal para plasmar así, un ritual místico donde ambas culturas coexisten.",
        image: "https://www.datocms-assets.com/234127/1792371994-cultura.webp"
    },
    {
        id: 4,
        title: "La Dama Nocturna",
        technique: "Aguado sobre lienzo",
        dimensions: "85 x 60 cm",
        year: "2025",
        status: "En Exposición",
        statusClass: "status-exhibition",
        description: "Esta obra me ayudó a tener más soltura y desenvolvimiento de la mano, además de la presición para cada pincelada. Era una técnica nueva para mi sin embargo me gustó el acabado con el acrílico marrón.",
        image: "https://www.datocms-assets.com/234127/1792364469-desnudo.webp"
    },
    {
        id: 3,
        title: "Rosas",
        technique: "Óleo sobre lienzo",
        dimensions: "50 x 70 cm",
        year: "2024",
        status: "Colección Privada",
        statusClass: "status-private",
        description: "Esta obra fue un verdadero reto para mi, iniciaba usando el óleo.  Requirió de mucha paciencia al pintar cada pétalo de las rosas, además de la perspectiva de transparencia en el jarrón de vidrio",
        image: "https://www.datocms-assets.com/234127/1792364468-rosas.webp"
    },
    {
        id: 2,
        title: "Época",
        technique: "Óleo sobre madera",
        dimensions: "70 x 50 cm",
        year: "2024",
        status: "Disponible",
        statusClass: "status-available",
        description: "Colores cálidos para respresentar una de mis estaciones favoritas del año, otoño.",
        image: "https://www.datocms-assets.com/234127/1792371881-bodegon-2.webp"
    },   
    {
        id: 1,
        title: "Comienzo",
        technique: "Óleo sobre madera",
        dimensions: "50 x 40 cm",
        year: "2024",
        status: "Disponible",
        statusClass: "status-available",
        description: "Mi primera obra adentrándome al maravilloso mundo del arte plástico.",
        image: "https://www.datocms-assets.com/234127/1792371751-bodegon.webp"
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

            // --- SOLUCIÓN AQUÍ ---
            // Calculamos la posición exacta solo en el eje X de su contenedor contenedor
            const containerWidth = thumbnailsContainer.clientWidth;
            const thumbOffsetLeft = thumb.offsetLeft;
            const thumbWidth = thumb.clientWidth;

           // Centra la miniatura activa dentro del track sin alterar el scroll global de la pantalla
            thumbnailsContainer.scrollTo({
                left: thumbOffsetLeft - (containerWidth / 2) + (thumbWidth / 2),
                behavior: 'smooth'
            });
        } else {
            removeActiveThumb(thumb);

        // thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        // } else {
        //     thumb.classList.remove('active');
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
