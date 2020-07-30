import './scss/index.scss'
import './components/slider/slider'
import './components/like/like.logic'
import './components/navbar/navbar.logic'
import './components/search/search.logic'
import './components/burger/burger'

document.addEventListener('DOMContentLoaded', () => {
  const btnMore = document.querySelector('.program-description__button'),
    btnMoreImg = document.querySelector('.program-description__button img'),
    descriptionText = document.querySelector('.program-description__text'),
    blur = document.querySelector('.program-description__blur'),
    headerTitle = document.querySelector('.header-title'),
    input = document.querySelector('.header-input'),
    hide = document.querySelectorAll('.hide'),
    btnDownload = document.querySelector('.program-download')

  btnMore.addEventListener('click', btnMoreClick)

  if (document.documentElement.clientWidth <= 768) {
    headerTitle.textContent = 'Whatsapp'
    btnDownload.style.display = 'none'

    hide.forEach(el => (el.style.display = 'none'))

    input.addEventListener('click', inputClick)

    function inputClick() {
      input.value = ''

      input.classList.toggle('active')
    }
  }

  function btnMoreClick() {
    blur.classList.toggle('active')
    descriptionText.classList.toggle('active')
    btnMoreImg.classList.toggle('active')
  }
})
