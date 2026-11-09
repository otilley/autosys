
// fork of https://editor.p5js.org/leey611/sketches/oZnbVF4YL
let particles = []
let num = 200
let scaleValue = 0.0005   
let speed = 20

let colorA, colorB

function setup() {
  createCanvas(600, 600)
  background( '#0c0f25')
  colorA = color('#b22a16')
  colorB = color('#f82709')
  for (let i = 0; i < num; i++) {
    particles.push(makeParticle())
  }
}


function makeParticle() {
  const life = random(10, 500)
  return {
    x: random(width*2),
    y: random(height*2),
    life,
    maxLife: life
  }
}

function draw() {
  
  background(2, 20, 31, 10)

  for (const p of particles) {

   
    let n = noise(p.x * scaleValue, p.y * scaleValue, frameCount * 0.2)
    let angle = n * TWO_PI * 6

   
    p.x += cos(angle) * speed
    p.y += sin(angle) * speed
    p.life -= 1


    const particleColor = lerpColor(colorA, colorB, map(n, 0.3, 0.7, 0, 1, true))
    const opacity = map(p.life, 0, p.maxLife, 0, 255, true)
    stroke(particleColor, opacity)
    strokeWeight(2)
    point(p.x, p.y)

   
    if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
      Object.assign(p, makeParticle())
    }
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') {
    saveCanvas('flow-field', 'png')
  }
}