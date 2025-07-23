const form = document.getElementById('myForm');
const firstNameInput = document.getElementById('firstname');
const lastNameInput = document.getElementById('lastname');
const emailInput = document.getElementById('Email');
const queryTypeRadios = document.querySelectorAll('input[name="check"]');
const messageTextarea = document.getElementById('message');
const consentCheckbox = document.querySelector('input[name="consent"]');
const errorMessages = document.querySelectorAll('#error-message');

function showError(element, message) {
    element.textContent = message;
    element.style.display = "block";
    const inputElement = element.previousElementSibling;
    if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
        inputElement.classList.add('changeborder');
    } else if (element.classList.contains('only')) {
        const mainCont = element.closest('.reduce').querySelector('.main-cont');
        const leftAlignDivs = mainCont.querySelectorAll('.left-align');
        leftAlignDivs.forEach(div => div.classList.add('changeborder'));
    }
}

function hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
    const inputElement = element.previousElementSibling;
    if (inputElement && (inputElement.tagName === 'INPUT' || inputElement.tagName === 'TEXTAREA')) {
        inputElement.classList.remove('changeborder');
    } else if (element.classList.contains('only')) {
        const mainCont = element.closest('.reduce').querySelector('.main-cont');
        const leftAlignDivs = mainCont.querySelectorAll('.left-align');
        leftAlignDivs.forEach(div => div.classList.remove('changeborder'));
    }
}

firstNameInput.addEventListener('input', () => {
    if (firstNameInput.value.trim() !== '') {
        hideError(firstNameInput.nextElementSibling);
    }
});

lastNameInput.addEventListener('input', () => {
    if (lastNameInput.value.trim() !== '') {
        hideError(lastNameInput.nextElementSibling);
    }
});

emailInput.addEventListener('input', () => {
    if (emailInput.value.trim() !== '') {
        hideError(emailInput.nextElementSibling);
    }
});

queryTypeRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
        const radioContainers = document.querySelectorAll('.reduce .left-align');
        radioContainers.forEach(container => {
            container.classList.remove('radioChecked');
        });
        if (radio.checked) {
            radio.parentElement.classList.add('radioChecked');
        }
        const queryError = document.querySelector('.rgh #error-message.only');
        if (Array.from(queryTypeRadios).some(r => r.checked)) {
            hideError(queryError);
        }
    })
})

messageTextarea.addEventListener('input', () => {
    if (messageTextarea.value.trim() !== '') {
        hideError(messageTextarea.nextElementSibling);
    }
});

consentCheckbox.addEventListener('change', () => {
    const consentError = document.querySelector('#secp #error-message');
    if (consentCheckbox.checked) {
        hideError(consentError);
    }
})

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;
    let formData = [];

    if (firstNameInput.value.trim() === '') {
        showError(firstNameInput.nextElementSibling, "This field is required");
        isValid = false;
    } else {
        hideError(firstNameInput.nextElementSibling);
    }

    if (lastNameInput.value.trim() === '') {
        showError(lastNameInput.nextElementSibling, "This field is required");
        isValid = false;
    } else {
        hideError(lastNameInput.nextElementSibling);
    }

    if (emailInput.value.trim() === '') {
        showError(emailInput.nextElementSibling, "This field is required");
        isValid = false;
    } else {
        hideError(emailInput.nextElementSibling);
    }

    const queryError = document.querySelector('.rgh #error-message.only');
    const isQueryTypeSelected = Array.from(queryTypeRadios).some(radio => radio.checked);
    if (!isQueryTypeSelected) {
        showError(queryError, "Please selct a query type");
        isValid = false;
    } else {
        hideError(queryError);
    }

    if (messageTextarea.value.trim() === '') {
        showError(messageTextarea.nextElementSibling, "This field is required");
        isValid = false;
    } else {
        hideError(messageTextarea.nextElementSibling);
    }

    const consentError = document.querySelector('#secp #error-message');
    if (!consentCheckbox.checked) {
        showError(consentError, 'To submit this form, pleae consent to be contacted');
        isValid = false;
    } else {
        hideError(consentError);
    }

    if (isValid) {
        const successMessg  = document.getElementById('success');
        const selectedQueryType = Array.from(queryTypeRadios).find(radio => radio.checked).value;

        successMessg.style.display = 'flex';
        setTimeout(() => {
            successMessg.style.display = 'none';
        }, 5000);
        
        formData.push({
            firstNaem: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            Email: emailInput.value.trim(),
            queryType: selectedQueryType,
            message: messageTextarea.value.trim(),
            consent: consentCheckbox.checked
        });
        console.log("FormData:", formData);
         const radioContainers = document.querySelectorAll('.reduce .left-align');
        radioContainers.forEach(container => {
            container.classList.remove('radioChecked');
        });
        form.reset();
    }
})
