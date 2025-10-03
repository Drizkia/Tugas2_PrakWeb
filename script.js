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

let curPost = 0;
let cardWidth = 0;
let cardsVisible = 4;
let maxPost = 0;

function calc() {
    const cards = document.querySelectorAll('.testimonial-card');
    if (cards.length > 0) {
        cardWidth = cards[0].offsetWidth + 25;
        maxPost = cards.length - cardsVisible;
    }
}

function updateButtons() {
    if (curPost <= 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    
    if (curPost >= maxPost) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}

function move(direction) {
    curPost += direction;
    
    if (curPost < 0) {
        curPost = 0;
    }
    if (curPost > maxPost) {
        curPost = maxPost;
    }
    
    const distance = -(curPost * cardWidth);
    
    track.style.transform = `translateX(${distance}px)`;
    
    updateButtons();
}

prevBtn.addEventListener('click', function() {
    move(-1);
});

nextBtn.addEventListener('click', function() {
    move(1);
});

window.addEventListener('resize', function() {
    calc();
    curPost = 0;
    track.style.transform = 'translateX(0)';
    updateButtons();
});

calc();
updateButtons();

