var authorized = 1

//return server(email, false, password, false, 'auth')

server = function (email, username, password, _passwordConfirm, route) {
  $('#loading').show()
  $('#login_button').hide()
  let takingLongerThenUsual = setTimeout(() => {
      showError('its taking longer than usual.')
    }, 6000),
    requestBody =
      route == 'users'
        ? [username, email, password, authorized]
        : [email, password, authorized, '8bpgl'],
    requestOptions = {
      url: 'https://idbots.xyz/api/' + route,
      method: 'POST',
      gzip: true,
      headers: { 'Content-Type': 'application/json' },
      json: true,
      body: requestBody,
    }
  request.post(requestOptions, function (error, response, body) {
    $('#loading').hide()
    $('#login_button').show()
    
    if (error) {
      return showError('error rq ' + response.statusCode)
    }

    if (response.statusCode == 400) {
      return showError(body.message)
    }

    if (response && body) {
      if (response.statusCode == 200) {
        if (route == 'users') {
          return (
            $('#user_div').hide(),
            $('#password_div2').hide(),
            $('#forgot_password').show(),
            $('#login_button').html('Login'),
            $('#lor_div').hide(),
            $('#div_stay').show(),
            showSuccessMessage('account created, login.')
          )
        } else {
          window.localStorage.setItem('email', email)
          $('#stay_signed').is(':checked') &&
            (window.localStorage.setItem('stay_signed', true),
            window.localStorage.setItem('pass', password))
          window.location = 'about:blank'
          document.write(body)
        }
      } else {
        showError('error:', response.errors[0].message)
        clearTimeout(takingLongerThenUsual)
      }
    }
  })
}
showError = function (_0xbe0430) {
  $('#errors').html(_0xbe0430)
  $('#success').slideUp()
  $('#errors').slideDown()
  setTimeout(() => {
    $('#errors').slideUp()
  }, 6500)
}
showSuccessMessage = function (_0x3eee00) {
  $('#success').html(_0x3eee00)
  $('#errors').slideUp()
  $('#success').slideDown()
  setTimeout(() => {
    $('#success').slideUp()
  }, 6500)
}
function stay() {
  if (
    true == window.localStorage.getItem('stay_signed') ||
    window.localStorage.getItem('stay_signed') == 'true'
  ) {
    let email = $('#email1').val(),
      password = $('#password1').val()
    return server(email, false, password, false, 'auth')
  }
}
function init() {
  var childProc = require('child_process').exec
  switch (process.platform) {
    case 'win32':
      childProc('wmic CPU get ProcessorId', function (_error, cb) {
        authorized = cb.substring(21, cb.indexOf('  ', 26))
        stay()
      })
      break
    case 'darwin':
      childProc(
        window.localStorage.getItem('darwin'),
        function (_error, cb) {
          authorized = cb
          stay()
        }
      )
      break
    case 'linux':
      childProc(
        'sudo dmidecode -t system | grep UUID',
        function (_error, cb) {
          authorized = cb.substring(
            cb.indexOf('UUID:') + 6,
            cb.indexOf('UUID:') + 42
          )
          stay()
        }
      )
      break
    default:
      $('#login_button').hide()
      return showError('error in (' + process.platform + ') contact our staff')
      break
  }
}
$('#gif').show()
$('#email1').show()
$('#password_div1').show()
$('#server_div').show()
$('#div_stay').show()
$('#email1').val(window.localStorage.getItem('email'))
$('#password1').val(window.localStorage.getItem('pass'))
init()
$('#server_status').css('color', 'green')
$('#server_status').text('OK')
$('#loading').hide()
$('#login_button').show()
$('#lor_div').show()
$('#forgot_password').show()


// On Login Button Click function
$('#login_button').click(function () {

    // Credentials fields values
  let emailFieldValue = $('#email1').val(),
    usernameFieldValue = $('#user').val(),
    passwordFieldValue = $('#password1').val(),
    passwordConfirmFieldValue = $('#password2').val();

    // If no email
  if (!emailFieldValue) {
    return showError('invalid Email')
  }

  // If no password
  if (!passwordFieldValue) {
    return showError('invalid Password')
  }

  // If it is register and confirmation password isnt same as password
  if (this.innerHTML == 'Register') {
    if (passwordFieldValue != passwordConfirmFieldValue) {
      return showError('passwords must be equals')
    } else {
        // If no username
      if (!usernameFieldValue) {
        return showError('invalid User')
      }
    }
  }
  let route = this.innerHTML == 'Login' ? 'auth' : 'users'
  server(emailFieldValue, usernameFieldValue, passwordFieldValue, passwordConfirmFieldValue, route)
})
$('#registerAccount').click(function () {
  $('#registerAccount').html('Login')
  $('#user_div').show()
  $('#password_div2').show()
  $('#login_button').html('Register')
  $('#forgot_password').hide()
  $('#lor_div').hide()
  $('#div_stay').hide()
})
document.addEventListener('contextmenu', (mouseEvent) => {
  mouseEvent.preventDefault()
})
document.onkeydown = function (keyboardEvent) {
  if (
    event.keyCode == 123 ||
    (keyboardEvent.ctrlKey &&
      keyboardEvent.shiftKey &&
      keyboardEvent.keyCode == 'I'.charCodeAt(0)) ||
    (keyboardEvent.ctrlKey &&
      keyboardEvent.shiftKey &&
      keyboardEvent.keyCode == 'C'.charCodeAt(0)) ||
    (keyboardEvent.ctrlKey &&
      keyboardEvent.shiftKey &&
      keyboardEvent.keyCode == 'J'.charCodeAt(0)) ||
    (keyboardEvent.ctrlKey && keyboardEvent.keyCode == 'U'.charCodeAt(0))
  ) {
    return false
  }
}
function createSnowFlake() {
  const element = document.createElement('i')
  element.classList.add('fa')
  element.classList.add('fa-snowflake-o')
  element.style.left = Math.random() * window.innerWidth + 'px'
  element.style.animationDuration = Math.random() * 3 + 2 + 's'
  element.style.opacity = Math.random()
  element.style.fontSize = Math.random() * 10 + 10 + 'px'
  document.body.appendChild(element)
  setTimeout(() => {
    element.remove()
  }, 5000)
}
setInterval(() => {
  createSnowFlake()
}, 50)
