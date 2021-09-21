const screens = document.querySelectorAll('.screen');
// screen[0].classList.add('top')
const choose_fighter_btn = document.querySelectorAll('.choose-fighter-btn')
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')
const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')


let seconds = 0
let score = 0
let selected_fighter = {}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_fighter_btn.forEach((btn) => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_fighter = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createFighter, 1000)
        startGame()

    })
})

function startGame() {
    setInterval(increaseTime, 1000)
}

function increaseTime() {
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time: ${m}:${s}`
    seconds++

}

function createFighter() {
    const fighter = document.createElement('div')
    fighter.classList.add('fighter')
    const { x, y } = getRandomLocation()
    fighter.style.top = `${y}px`
    fighter.style.left = `${x}px`
    fighter.innerHTML = `<img src='${selected_fighter.src}' alt="${selected_fighter.alt}" style="transform: rotate(${Math.random() * 360}deg)"/>`
    fighter.addEventListener('click', catchFighter)
    game_container.appendChild(fighter)
}

function getRandomLocation() {
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y }

}

function catchFighter() {
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addFighters()
}
function addFighters() {
    setTimeout(createFighter, 1000)
    setTimeout(createFighter, 1500)

}

function increaseScore() {
    score++;
    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score:${score}`
}