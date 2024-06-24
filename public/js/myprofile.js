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

document.addEventListener('DOMContentLoaded', function() {
    var buttons = document.querySelectorAll('button[data-target]');
    var forms = document.querySelectorAll('.form-container');

    function hideAllForms() {
        forms.forEach(function(form) {
            form.classList.remove('active');
        });
    }

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var targetId = button.getAttribute('data-target');
            var targetForm = document.getElementById(targetId);

            if (!targetForm) return;

            var isCurrentlyVisible = targetForm.classList.contains('active');

            hideAllForms();

            if (!isCurrentlyVisible) {
                targetForm.classList.add('active');
            }
        });
    });
});

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

document.getElementById('change-username-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const username = document.getElementById('username').value;
    const currentId = '<%= user.id %>'; // Replace with server-side rendering or JS logic to get the current username

    try {
        const response = await fetch(`/profile/changeUsername`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, currentId })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Username updated successfully');
            console.log('Success:', data);
        } else {
            const errorData = await response.json();
            alert('Failed to update username');
            console.log('Error:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the username');
    }
});
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
