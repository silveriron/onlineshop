const passwordInputElement = document.querySelector('#password');
const confirmPasswordInputElement = document.querySelector('#confirm-password');

const invalidPasswordElement = document.querySelector('#invalidPassword');

const duplicateCheckButton = document.querySelector("#duplicateCheck");

const signUpAvailableElement = document.querySelector("#signUpAvailable")
const duplicateAlertElement = document.querySelector('#duplicateAlert')


const emailInputElement = document.querySelector("#email")


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

const duplicateCheck = async () => {
    const email = emailInputElement.value
    const csrfToken = duplicateCheckButton.dataset.csrftoken
    const response = await fetch(`/duplicate?_csrf=${csrfToken}`, {
        method: "POST",
        body: JSON.stringify({"email": email}),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            
        }
    })
    const data = await response.json();
    if (data) {
        duplicateAlertElement.style.display = "block";
        signUpAvailableElement.style.display = "none";

        return;
    } else {
        signUpAvailableElement.style.display = "block";
        duplicateAlertElement.style.display = "none";

    }
}

confirmPasswordInputElement.addEventListener('blur', cheackPassword)

duplicateCheckButton.addEventListener('click', duplicateCheck)



