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

function validateVisaDetails() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryYear = document.getElementById('expiryYear').value;
    const expiryMonth = document.getElementById('expiryMonth').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiryYear && expiryMonth && cvv) {
        const orderDetails = {
            items: [
                { name: 'Fenty Beauty Concealer', quantity: 1, price: 30 },
                { name: 'Kiko Bronzer', quantity: 1, price: 20 },
                { name: 'Benetint', quantity: 1, price: 24 }
            ],
            subtotal: 74,
            shippingCost: 7.95,
            salesTax: 2,
            total: 83.95,
            paymentMethod: 'Visa',
            cardDetails: {
                cardNumber,
                expiryYear,
                expiryMonth,
                cvv
            }
        };
        fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Order created successfully') {
                document.getElementById('successHeader').innerText = 'Payment Successful!';
                document.getElementById('successText').innerText = 'Your order has been placed successfully.';
                document.getElementById('successMessages').style.display = 'block';
            } else {
                alert('Payment failed, please try again.');
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please fill in all card details.');
    }
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
