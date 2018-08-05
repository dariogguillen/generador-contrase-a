const form = document.getElementById('form')
let numCharacters = document.getElementById('number').value
const check = document.querySelectorAll('.check')
const copyText = document.getElementById('copy-text')
const config = {
  symbols: true,
  numbers: true,
  uppercase: true,
  lowercase: true
}
const characters = {
  symbols: '@#$%&*?/',
  numbers: '0123456789',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz'
}
/* 
 * Prevenir recarga de la pagina al dar click en un boton
 */
form.addEventListener('submit', e => e.preventDefault())
/* 
 * Agregar o restar uno a la cantidad de caracteres
 * que tendra la contraseña default en 12 y minimo en 6
 */
form.elements.minus.addEventListener('click', () => {
  if (numCharacters > 6) {
    numCharacters--
    document.getElementById('number').value = numCharacters
  }
})
form.elements.plus.addEventListener('click', () => {
  numCharacters++
  document.getElementById('number').value = numCharacters
})
/* 
 * Obtener los botones para generar la configuracion 
 */
check.forEach(el => {
  el.addEventListener('click', () => {
    el.classList.toggle('deactive')
    el.childNodes[1].classList.toggle('fa-times')
    el.childNodes[1].classList.toggle('fa-check')
    if (
      el.parentElement.previousElementSibling.childNodes[1].textContent ===
      'Incluir Simbolos'
    ) {
      config.symbols = !config.symbols
    } else if (
      el.parentElement.previousElementSibling.childNodes[1].textContent ===
      'Incluir Números'
    ) {
      config.numbers = !config.numbers
    } else if (
      el.parentElement.previousElementSibling.childNodes[1].textContent ===
      'Incluir Mayusculas'
    ) {
      config.uppercase = !config.uppercase
    }
  })
})
/* 
 * Generar contraseña con la configuración generada previamente
 */
form.elements.gen.addEventListener('click', () => {
  let passwordCharacters = ''
  Object.keys(config).map(
    el =>
      config[el] ? (passwordCharacters += characters[el]) : passwordCharacters
  )
  let password = []

  for (let i = 0; i < numCharacters; i++) {
    password.push(
      passwordCharacters[Math.floor(Math.random() * passwordCharacters.length)]
    )
  }
  form.elements.pass.value = password.join('')
})
/* 
 * Copiar contraseña al portapapeles y activar feedback visual
 */
form.elements.pass.addEventListener('click', () => {
  if (form.elements.pass.value.length >= 6) {
    form.elements.pass.select()
    document.execCommand('copy')
    copyText.classList.add('active')
    setTimeout(() => {
      copyText.classList.remove('active')
    }, 3000);
  }
})
