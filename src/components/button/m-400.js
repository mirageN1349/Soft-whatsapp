;(function () {
  const Id = 'block-' + Date.now()

  var params = {
    apiKey: '',
    utmSource: '',
    utmCampaign: '',
    utmMedium: '',
    slug: {},
    tag: 'Whatsapp',
    tagSelector: '',
    btnBg: '#1ebea5',
    selector: '.program-description',
    addToAll: 0,
    btnPosition: 'beforebegin',
  }

  function MSetup() {
    function getData(url, option, callback, errorFunc, errorUrl) {
      var xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return
        if (xhr.status != 200) {
          console.log(xhr.status + ': ' + xhr.statusText)
        } else {
          if (option) params[option] = JSON.parse(xhr.responseText)
          if (
            xhr.responseText &&
            xhr.responseText !== '-' &&
            params[option] !== null &&
            typeof callback === 'function'
          )
            callback()
          if (
            (xhr.responseText === '-' || xhr.responseText === '') &&
            typeof errorFunc === 'function' &&
            errorUrl
          )
            errorFunc(errorUrl, option, callback)
        }
      }
      xhr.send()
    }

    function renderBtn() {
      var styles =
        '<style>@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=cyrillic");#' +
        Id +
        '{font-family:"Open Sans",sans-serif;margin-bottom:0px;margin-top:20px;text-align:center;line-height:1;margin: 0 auto}#' +
        Id +
        'p{text-align:center;margin-bottom:10px;font-size:13px;font-weight:400;}#' +
        Id +
        ' a{cursor:pointer;margin-top:10px;text-align:center;display:inline-block;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABpElEQVRoge2a7W2DMBRFD9mAFdIRMkNHSEboTszSrpARzAjJCLc/cEqpDNjwwEj1kaxEDvK7Jx/Y4CAJo3aR5DSP88ea1K0kYYQDzpHHtsCbRVFLgdSBKouiJ4tBclIEclMEclMEclMEclMEclMEclMEchMj8EG31p9rqcyN9/C1J4m5oDG74lnI5IVPzCfwNAqyhNnaMQLvMQNtwNPXniRG4M7+Eq/w97kDY89Ce0pEh4e00+geEknhIX0e2FIiOTwsm8i2kFgUHpbPxJYSi8PDuqWEhcSq8LB+LbRGYnV4sFnMLZEwCQ92q9EUCbPwYLucjpEwDQ+dwIXu3n7MkjnUmkiJUPhmRV0HXIjcVZmjCezWPH69/gjsyjQGdR0Gg7wISTiFt5Qswkt+MEv+SoSaWXjJXkCaljANL20jIEmfkq7qg199nzmVZLfLl4N/cVtlD1rgyz/G9Pds8b1MxEmq1f1WavXz0lj/gCN8Ai39zP2kf7fH+gccQeAM1P55Tf93hbH+AUc5C7W+nRkGHev/oZKU8ieNo9GegBtTv/Lj0gK3bywIffbxvDDRAAAAAElFTkSuQmCC") no-repeat 20px 45%' +
        params.btnBg +
        ';border:0px solid #fff;border-radius:10px;color:#fff;height:67px;width:320px;box-sizing:border-box;box-shadow: 5px 10px 20px rgba(33, 150, 243, 0.28);font-size:23px;font-weight:700;overflow: hidden;text-decoration:none;padding:10px 10px 13px 70px;text-overflow:ellipsis;white-space:nowrap;}#' +
        Id +
        ' a:hover{opacity:.9}#' +
        Id +
        ' span{font-size:13px;color:#fff;font-weight:400;display:block;opacity:1;text-transform:none;padding:10px 0 0 0;}</style>'

      var html =
        '<a onclick="window.goNext()">Скачать ' +
        decodeURI(params.slug.name) +
        '<span>' +
        params.slug.slug +
        '_msetup.exe</span></a>'
      html = '<div id="' + Id + '">' + html + '</div>'
      document.head.insertAdjacentHTML('beforeEnd', styles)

      if (params.addToAll) {
        var elems = document.querySelectorAll(params.selector)
        elems.forEach(function (item) {
          item.insertAdjacentHTML(params.btnPosition, html)
        })
      } else {
        elem.insertAdjacentHTML(params.btnPosition, html)
      }
    }

    window.goNext = function () {
      location.href =
        'https://msetup.pro/api/getbundle/?partner_apikey=' +
        params.apiKey +
        '&program_slug=' +
        params.slug.slug +
        '&utm_campaign=' +
        params.utmCampaign +
        '&utm_term=' +
        params.slug.slug +
        '&utm_source=' +
        params.utmSource +
        '&utm_medium=' +
        params.utmMedium +
        '&utm_content=' +
        Date.now().toString().slice(0, 6)
    }

    var tag1 = params.tag
    if (!tag1) {
      tag1 = document.querySelector(params.tagSelector)
      tag1 = tag1 ? tag1.innerText : ''
    }
    var slugUrl1 = tag1
      ? encodeURI(
          'https://determineapp.com/api/getslugv2?partner_apikey=' +
            params.apiKey +
            '&raw=' +
            tag1
        )
      : ''

    var elem = document.querySelector(params.selector)
    if (elem && slugUrl1) getData(slugUrl1, 'slug', renderBtn)
  }

  // document.addEventListener("DOMContentLoaded", MSetup);
  MSetup()
})()
