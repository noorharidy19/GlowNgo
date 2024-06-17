// function showPopup(containerIds) {
//     containerIds.forEach(function(id) {
//         document.getElementById(id).style.display = "block";
//         document.getElementById('overlay').style.display = 'block';
//     });
// }

// function hidePopup(containerIds) {
//     containerIds.forEach(function(id) {
//         document.getElementById(id).style.display = "none";
//         document.getElementById('overlay').style.display = 'none';
//     });
// }
// function showP(containerIds) {
//     containerIds.forEach(function(id) {
//         document.getElementById(id).style.display = "block";
//     });
// }

// function hideP(containerIds) {
//     containerIds.forEach(function(id) {
//         document.getElementById(id).style.display = "none";
//     });
// }
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function openChangePassword() {
    var passwordForm = document.getElementById("password-form");
    if (passwordForm.style.display === "none") {
        passwordForm.style.display = "block";
    } else {
        passwordForm.style.display = "none";
    }
}

function changePassword() {
    var oldPassword = document.getElementById("oldPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if (newPassword !== confirmPassword) {
        alert("New password and confirm password do not match!");
    } else {
        // Send request to change password
        alert("Password changed successfully!");
    }
}

function revealOffers() {
    var offersList = document.getElementById("offers-list");
    if (offersList.style.display === "none") {
        offersList.style.display = "block";
    } else {
        offersList.style.display = "none";
    }
}
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
