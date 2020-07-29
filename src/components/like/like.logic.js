import { localStorageHelper } from '../../core/localStorage'
import { Like } from './Like'

const storage = localStorageHelper()

document.addEventListener('DOMContentLoaded', () => {
  const like = document.querySelector('.program-like')
  likeClick(false)()

  like.addEventListener('click', likeClick(true))

  function likeClick(check) {
    return function () {
      if (check) like.disabled = true

      const softName = 'whatsapp'
      getRequest(softName, check)
    }
  }

  function getRequest(softName, check) {
    fetch(`https://soft-zilla.firebaseio.com/${softName}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        const currentLike = document.querySelector('.program-like')
        const likeImg = document.querySelector('.program-like__img')
        const likeAll = [likeImg, currentLike]
        const program = 'whatsapp'
        const prevLikeState = storage.getItem(program) || false
        prevLikeState
          ? likeAll.forEach(like => like.classList.add('active'))
          : likeAll.forEach(like => like.classList.remove('active'))

        let counter = res.counter || 0

        if (check) {
          storage.setItem(program, prevLikeState)

          if (prevLikeState === false) {
            likeAll.forEach(like => like.classList.add('active'))
            counter = res.counter + 1
            storage.setItem(program, true)
          } else {
            likeAll.forEach(like => like.classList.remove('active'))
            counter = res.counter - 1
            storage.setItem(program, false)
          }
        }

        const text = {
          counter,
          softName,
        }
        putRequest(text, softName, currentLike)
      })
  }

  function putRequest(text, softName, currentLike) {
    Like.create(text, softName).then(() => {
      currentLike.disabled = false
    })
  }
})
