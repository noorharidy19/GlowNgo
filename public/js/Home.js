let slideIndex = 0;
let timeout;
let ProdIndex = 0;
let ProdIndex1 = 0;

showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dashes = document.getElementsByClassName("dash");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dashes.length; i++) {
        dashes[i].classList.remove("active");
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    dashes[slideIndex - 1].classList.add("active");

    timeout = setTimeout(showSlides, 4000);
}

function plusSlides(n) {
    clearTimeout(timeout); 

    slideIndex += n;

    if (slideIndex > document.getElementsByClassName("slide").length) {
        slideIndex = 1;
    }
    
    if (slideIndex < 1) {
        slideIndex = document.getElementsByClassName("slide").length;
    }

    showSlides();
}

function currentSlide(n) {
    clearTimeout(timeout);
    slideIndex = n - 1;
    showSlides();
}

function plusProd(n) {
    ProdIndex += n;
    showProd();
}

function showProd() {
    const productContainer = document.querySelector('.shop-wrapper');
    const products = productContainer.querySelectorAll('.shop');
    const maxIndex = products.length - 5;

    if (ProdIndex < 0) {
        ProdIndex = maxIndex;
    } else if (ProdIndex > maxIndex) {
        ProdIndex = 0;
    }
    productContainer.style.marginLeft = `-${ProdIndex * 271}px`;
}

function plusProd1(n) {
    ProdIndex1 += n;
    showProd1();
}

function showProd1() {
    const productContainer = document.querySelector('.shop-wrapper1');
    const products = productContainer.querySelectorAll('.shop');
    const maxIndex = products.length - 5;

    if (ProdIndex1 < 0) {
        ProdIndex1 = maxIndex;
    } else if (ProdIndex1 > maxIndex) {
        ProdIndex1 = 0;
    }
    productContainer.style.marginLeft = `-${ProdIndex1 * 271}px`;
}

$(document).ready(function(){
    $('.dropdown-menu').hover(function(){
        $(this).find('.dropdown-contents').css('display', 'block');
    }, function(){
        $(this).find('.dropdown-contents').css('display', 'none');
    });
});

window.onload = function() {
    showPopup();
};


function SignupValidation() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var confirm_password = document.getElementById("confirm_pass").value;
    var country = document.getElementById("country").value;
    var phone = document.getElementById("phone").value;
    var terms = document.getElementById("terms").checked;

    var error = false;

    document.getElementById('nameErr').innerHTML = "";
    document.getElementById('emailErr').innerHTML = "";
    document.getElementById('passwordErr').innerHTML = "";
    document.getElementById('confirm_passwordErr').innerHTML = "";
    document.getElementById('countryErr').innerHTML = "";
    document.getElementById('phoneErr').innerHTML = "";
    document.getElementById('termsErr').innerHTML = "";

    if (password !== confirm_password) {
        document.getElementById('confirm_passwordErr').innerHTML = "Passwords do not match.";
        error = true;
    }

    if (name === "") {
        document.getElementById('nameErr').innerHTML = "Please enter your name.";
        error = true;
    }

    if (email === "") {
        document.getElementById('emailErr').innerHTML = "Please enter your email.";
        error = true;
    }

    if (password === "") {
        document.getElementById('passwordErr').innerHTML = "Please enter your password.";
        error = true;
    }

    if (confirm_password === "") {
        document.getElementById('confirm_passwordErr').innerHTML = "Please confirm your password.";
        error = true;
    }

    if (country === "") {
        document.getElementById('countryErr').innerHTML = "Please enter your address.";
        error = true;
    }

    if (phone === "") {
        document.getElementById('phoneErr').innerHTML = "Please enter your phone number.";
        error = true;
    } else if (phone.length !== 11 || isNaN(phone)) {
        document.getElementById('phoneErr').innerHTML = "Please enter a valid phone number";
        error = true;
    }

    if (name === "" || !/^[a-zA-Z0-9]+$/.test(name)) {
        document.getElementById('nameErr').innerHTML = "Please enter a valid username";
        error = true;
    }

    if (!terms) {
        document.getElementById('termsErr').innerHTML = "Please accept the terms and conditions.";
        error = true;
    }

    if (!error) {
        showPopupSignin('popupContainerSignIn');
        document.getElementById('successMessage').style.display = 'block';
        return true;
    }

    return !error;
}





function Show() {
    var showpw = document.getElementById("password");
    if (showpw.type === "password") {
        showpw.type = "text";
    } else {
        showpw.type = "password";
    }
}
function validateForm2() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var error = false;

    
    document.getElementById('usernameErr').innerHTML = "";
    document.getElementById('passwordErr').innerHTML = "";

    if (username === "") {
        document.getElementById('usernameErr').innerHTML = "Please enter your username.";
        error = true;
    }
    if (username===" ")
    {
        document.getElementById('usernameErr').innerHTML = "Please enter a valid username.";
        error = true;
    }
    if (password === "") {
        document.getElementById('passwordErr').innerHTML = "Please enter your password.";
        error = true;
    }
    if (password === " ") {
        document.getElementById('passwordErr').innerHTML = "Please enter a valid password.";
        error = true;
    }

    if (!error && !isValidCredentials(username, password)) {
        document.getElementById('usernameErr').innerHTML = "Invalid username or password. Please try again.";
        error = true;
    }

    if (!error) {
        if (username === "nourhan.mohamed" && password === "1234") {
            window.location.href = "myprofile.html";
            return false; 
        } else if (username === "nour.amr" && password === "nour1234") {
            window.location.href = "admin.html";
            return false; 
        } else {
            document.getElementById('usernameErr').innerHTML = "Invalid username or password. Please try again.";
            error = true;
        }
    }

    return !error;
}


function isValidCredentials(username, password) {
    var validUsers = {
        "nourhan.mohamed": "1234",
        "nour.amr": "nour1234"
    };

    return validUsers.hasOwnProperty(username) && validUsers[username] === password;
}


function sendResetPasswordEmail() {
    var email = document.getElementById("resetEmail").value;
    var messageContainer = document.getElementById("messageContainer");
    if (!isValidEmail(email)) {
        messageContainer.innerHTML = "Please enter a valid email address.";
        messageContainer.style.display = "block";
        return false; 
    }
   
    messageContainer.innerHTML = "We've sent you the verification code. Please check your email and revisit our website.";
    messageContainer.style.display = "block";
    messageContainer.style.color="green";
  
    return false; 
}

function isValidEmail(email) {
    
    return /\S+@\S+\.\S+/.test(email);
}
function showPopupSignin(id) {
    document.getElementById(id).style.display = 'block';
}

function hidePopupsignin(id) {
    document.getElementById(id).style.display = 'none';
}
// function showPopupp(containerIds) {
//     containerIds.forEach(function(id) {
//         document.getElementById(id).style.display = "block";
//         document.getElementById('overlay').style.display = 'block';
//     });
// }

// function hidePopupp(containerIds) {
//     containerIds.forEach(function(id) {
//         document.getElementById(id).style.display = "none";
//         document.getElementById('overlay').style.display = 'none';
//     });
// }
// function showShade(containerIds, containerClass) {
//     var hideElements = document.getElementsByClassName(containerClass);
//     for (var i = 0; i < hideElements.length; i++) {
//         hideElements[i].style.display = "none";
//     }

//     containerIds.forEach(function(id) {
//         document.getElementById(id).style.display = "block";
//     });
    
    
// }
// let initialPrices = {};

// function changeQuantity(change, quantityId, priceId) {
//     let quantityElement = document.getElementById(quantityId);
//     let quantity = parseInt(quantityElement.textContent);
    
//     quantity += change;
//     if (quantity < 1) {
//       quantity = 1;
//     } else if (quantity > 5) {
//       quantity = 5;
//     }
    
//     let priceElement = document.getElementById(priceId);
//     if (!initialPrices[priceId]) {
//       initialPrices[priceId] = parseFloat(priceElement.textContent);
//     }
    
//     let pricePerItem = initialPrices[priceId];
    
//     quantityElement.textContent = quantity;
//     priceElement.textContent = (pricePerItem * quantity).toFixed(2);
//     getTotalPrice();
//   }
// function getTotalPrice() {
//     let priceIds = ['price1', 'price2', 'price3']; 
//     let totalPrice = 0;
//     priceIds.forEach(function(priceId) {
//       let priceElement = document.getElementById(priceId);
//       totalPrice += parseFloat(priceElement.textContent);
//     });
//     document.getElementById('total').textContent = totalPrice.toFixed(2);
//   }
//   window.onload = function() {
//     getTotalPrice();
//   };
// function toggleDarkMode() {
//     var darkModeToggle = document.getElementById('dark-mode-toggle');
//     document.body.classList.toggle('dark-mode', darkModeToggle.checked);
//     localStorage.setItem('darkMode', darkModeToggle.checked);
//     // rest of your code...

//     var darkModeToggle = document.getElementById('dark-mode-toggle');
//     var myElements = document.getElementsByClassName('myElement');
//     var elements = document.getElementsByClassName('bodyy');
//     var cards= document.getElementsByClassName('shop');
//     var logoo = document.getElementsByClassName('logo');
//     var nav = document.getElementsByClassName('nav1');
  
// }
// window.onload = function() {
//     var darkModeToggle = document.getElementById('dark-mode-toggle');
//     var darkMode = localStorage.getItem('darkMode') === 'true';
//     darkModeToggle.checked = darkMode;
//     document.body.classList.toggle('darkMode', darkMode);
//     if (darkMode) toggleDarkMode();
// }