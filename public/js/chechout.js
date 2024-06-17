function toggleItemList() {
    var itemList = document.querySelector('.item-list');
    if (itemList.style.display === "none") {
        itemList.style.display = "block";
    } else {
        itemList.style.display = "none";
    }
}

function confirmCashPayment() {
    document.getElementById("cashDetails").style.display = "none";
    document.getElementById("confirmButton").style.display = "none";
    document.getElementById("successMessages").style.display = "block";
    document.getElementById("successMessages").style.top = "50%";
    document.getElementById("successMessages").style.left = "50%";
    document.getElementById("successMessages").style.transform = "translate(-50%, -50%)";
    document.getElementById("successMessages").style.backgroundColor = "#4CAF50";
    document.getElementById("successHeader").innerText = "Order Successful";
    document.getElementById("successText").innerText = "Thank you for your order!";
   
}

function confirmVisaPayment() {
    document.getElementById("visaDetails").style.display = "none";
    document.getElementById("confirmVisaButton").style.display = "none";
    document.getElementById("successMessages").style.display = "block";
    document.getElementById("successMessages").style.top = "50%";
    document.getElementById("successMessages").style.left = "50%";
    document.getElementById("successMessages").style.transform = "translate(-50%, -50%)";
    document.getElementById("successMessages").style.backgroundColor = "#4CAF50";
    document.getElementById("successHeader").innerText = "Order and Payment Successful";
    document.getElementById("successText").innerText = "Thank you for your order and payment!";
}

function showCashDetails() {
    var cashDetails = document.getElementById("cashDetails");
    var visaDetails = document.getElementById("visaDetails");
    cashDetails.style.display = "block";
    visaDetails.style.display = "none";
    document.getElementById("confirmButton").style.display = "block"; 
    document.getElementById("confirmVisaButton").style.display = "none"; 
    document.getElementById("successMessages").style.display = "none"; 
}

function showVisaDetails() {
    var cashDetails = document.getElementById("cashDetails");
    var visaDetails = document.getElementById("visaDetails");
    cashDetails.style.display = "none";
    visaDetails.style.display = "block";
    document.getElementById("confirmButton").style.display = "none"; 
    document.getElementById("confirmVisaButton").style.display = "block"; 
    document.getElementById("successMessages").style.display = "none"; 
}

function confirmPayment() {
    document.getElementById("successMessages").style.display = "block";
    document.getElementById("successHeader").innerText = "Order Successful";
    document.getElementById("successText").innerText = "Thank you for your order!";
    setTimeout(function() {
        document.getElementById("successMessages").style.display = "none";
    }, 3000); 
}

function validateVisaDetails() {
    var cardNumber1 = document.getElementById('cardNumber').value;
    var expiryYear1 = document.getElementById('expiryYear').value;
    var expiryMonth1 = document.getElementById('expiryMonth').value;
    var cvv1 = document.getElementById('cvv').value;
    var Validation = true;
    
    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    if(cardNumber1 == "" || !visaRegEx.test(cardNumber1)){
        document.getElementById('cardnumberError').innerHTML = "Please enter a valid Card number";
        Validation = false;
    } else {
        document.getElementById('cardnumberError').innerHTML = "";
    }
    
    var currentYear = new Date().getFullYear();
    if(expiryYear1 == "" || expiryYear1 < currentYear || expiryYear1 > currentYear + 20){
        document.getElementById('expiryYearError').innerHTML = "Please enter a valid expiry year";
        Validation = false;
    } else {
        document.getElementById('expiryYearError').innerHTML = "";
    }
    
    if(expiryMonth1 == "" || expiryMonth1 < 1 || expiryMonth1 > 12){
        document.getElementById('expiryMonthError').innerHTML = "Please enter a valid Order expiry month";
        Validation = false;
    } else {
        document.getElementById('expiryMonthError').innerHTML = "";
    }
    
    var cvvRegEx = /^[0-9]{3}$/;
    if(cvv1 == "" || !cvvRegEx.test(cvv1)){
        document.getElementById('cvvError').innerHTML = "Please enter a valid cvv";
        Validation = false;
    } else {
        document.getElementById('cvvError').innerHTML = "";
    }

    if (Validation) {
        confirmVisaPayment();
    }

    return Validation;

}
document.querySelectorAll('.feedback li').forEach(entry => entry.addEventListener('click', e => {
    if(!entry.classList.contains('active')) {
        document.querySelector('.feedback li.active').classList.remove('active');
        entry.classList.add('active');
    }
    e.preventDefault();
}));
window.onload = function() {
    showPopup();
};
function showrating() {
    document.getElementById('rating').style.display = 'block';
}

function hiderating() {
    document.getElementById('rating').style.display = 'none';
}



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
