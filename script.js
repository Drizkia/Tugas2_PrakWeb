const testimonials = [
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quid quis volutpat ullamcorper quis duis nam massa adipiscing et commodo hendrerit. Accumsan quam quisque quam egestas sit archifento hendrerit.",
        name: "Mbahoon",
        role: "Photographer",
        rating: 5,
        avatar: "./Minion.webp"
    }
];

const testikartu = [];
for(let i = 0; i < 10; i++) {
    testikartu.push(testimonials[0]);
}

const track = document.getElementById('Track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

testikartu.forEach(function(t) {
    let starsHTML = '';
    const bintang = 5;
    for (let i = 0; i < t.rating-2; i++) {
        starsHTML += '<span class="star_isi">★</span>';
    }

    for (let i = 0; i < 2; i++) {
        starsHTML += '<span class="star_kosong">★</span>';
    }
    
    const cardHTML = `
        <div class="testimonial-card">
            <p class="testimonial-text">${t.text}</p>
            <div class="stars">${starsHTML}</div>
            <div class="profile">
                <img src="${t.avatar}" alt="${t.name}" class="avatar">
                <div class="profile-info">
                    <h4>${t.name}</h4>
                    <p>${t.role}</p>
                </div>
            </div>
        </div>
    `;

    track.innerHTML += cardHTML;
});

let currentPosition = 0;
let cardWidth = 0;
let cardsVisible = 4;
let maxPosition = 0;

function calculateDimensions() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length > 0) {
        cardWidth = cards[0].offsetWidth + 25;
        
        if (window.innerWidth > 1200) {
            cardsVisible = 4;
        } else if (window.innerWidth > 768) {
            cardsVisible = 3;
        } else if (window.innerWidth > 480) {
            cardsVisible = 2;
        } else {
            cardsVisible = 1;
        }
        
        maxPosition = cards.length - cardsVisible;
    }
}

function updateButtons() {
    if (currentPosition <= 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    if (currentPosition >= maxPosition) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function moveCarousel(direction) {
    currentPosition += direction;
    
    if (currentPosition < 0) {
        currentPosition = 0;
    }
    if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
    }
    
    const moveDistance = -(currentPosition * cardWidth);
    
    track.style.transform = `translateX(${moveDistance}px)`;
    
    updateButtons();
}

prevBtn.addEventListener('click', function() {
    moveCarousel(-1);
});

nextBtn.addEventListener('click', function() {
    moveCarousel(1);
});

window.addEventListener('resize', function() {
    calculateDimensions();
    currentPosition = 0;
    track.style.transform = 'translateX(0)';
    updateButtons();
});

calculateDimensions();
updateButtons();