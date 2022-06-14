const passwordInputElement = document.querySelector('#password');
const confirmPasswordInputElement = document.querySelector('#confirm-password');

const invalidPasswordElement = document.querySelector('#invalidPassword')

const cheackPassword = () => {
    password = passwordInputElement.value
    confirmPassword = confirmPasswordInputElement.value
    if (password === confirmPassword) {
        invalidPasswordElement.innerHTML = ""
        return
    } else {
        invalidPasswordElement.innerHTML = "비밀번호가 일치하지 않습니다."
        return
    }
}

confirmPasswordInputElement.addEventListener('blur', cheackPassword)
