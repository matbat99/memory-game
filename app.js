document.addEventListener('DOMContentLoaded', () => {
  //card options
  const singleCards = [
    {
      name: 'chicken',
      img: 'images/chicken.png'
    },
    {
      name: 'dog',
      img: 'images/dog.png'
    },
    {
      name: 'lion',
      img: 'images/lion.png'
    }, 
    {
      name: 'mouse',
      img: 'images/mouse.png'
    }, 
    {
      name: 'fox',
      img: 'images/fox.png'
    },
    {
      name: 'sheep',
      img: 'images/sheep.png'
    },
  ]
  // allen should remove this comment
  
  const cardArray=singleCards.concat(singleCards).sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  const cardsWon = []

  //create your board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement('div')
      card.classList.add('flip-container')
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      let flipper = document.createElement('div')
      flipper.classList.add('flipper')
      let front = document.createElement('div')
      front.classList.add('front')
      let back = document.createElement('div')
      back.classList.add('back')
      card.appendChild(flipper)
      flipper.appendChild(front)
      flipper.appendChild(back)
      let cardFront = document.createElement('img')
      cardFront.setAttribute('src', 'images/back.jpg')
      front.appendChild(cardFront)
      let cardBack = document.createElement('img')
      cardBack.setAttribute('src', cardArray[i].img)
      back.appendChild(cardBack)
      grid.appendChild(card)
    }
  }

  //check for matches
  function checkForMatch() {
    let cards = document.querySelectorAll('.flip-container')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    if (cardsChosen[0] === cardsChosen[1]) {
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
     
    } else {
      setTimeout(()=> {        
        cards[optionOneId].classList.toggle('flip')
        cards[optionTwoId].classList.toggle('flip')
      }, 500)

    }
    cardsChosen = []
    cardsChosenId = []
    resultDisplay.textContent = cardsWon.length
    if  (cardsWon.length === cardArray.length/2) {
      resultDisplay.textContent = 'Congratulations! You found them all!'
      setTimeout(()=> {location.reload()},1100)
      // createBoard()
    }
  }

  //flip your card
  function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)   
    this.classList.toggle('flip')
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
  }

  createBoard()
})
