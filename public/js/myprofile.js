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
            form.style.display = 'none';
        });
    }

    hideAllForms(); // Ensure all forms are initially hidden

    buttons.forEach(function(button) {
        button.addEventListener('click', function() {
            var targetId = button.getAttribute('data-target');
            var targetForm = document.getElementById(targetId);

            if (!targetForm) return;

            hideAllForms();
            targetForm.style.display = 'block';
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



document.getElementById('change-password-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userId = '<%= user.id %>'; // Pass the user ID from your server-side rendering

    if (newPassword !== confirmPassword) {
        alert('New passwords do not match.');
        return;
    }

    try {
        const response = await fetch(`/profile/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ oldPassword, newPassword })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Password updated successfully');
            console.log('Success:', data);
        } else {
            const errorData = await response.json();
            alert('Failed to update password');
            console.log('Error:', errorData);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the password');
    }
});

document.getElementById('change-username-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
    
    const username = document.getElementById('username').value;
    const currentId = '<%= user.id %>'; // Replace with server-side rendering or JS logic to get the current username

    try {
        const response = await fetch(`/profile/changeUsername`, {
            method: 'PUT',
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

document.getElementById('phone-form').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default button behavior
    
    const form = document.getElementById('phoneForm');
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'PUT', // or 'PUT' if your server supports PUT method
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Phone number updated successfully');
        console.log('Success:', data);
        // Optionally, update UI or perform additional actions upon success
    })
    .catch(error => {
        console.error('Error updating phone number:', error);
        alert('Failed to update phone number');
    });
});

document.getElementById('address-form').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default button behavior
    
    const form = document.getElementById('addressForm');
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST', // or 'PUT' if your server supports PUT method
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Address updated successfully');
        console.log('Success:', data);
        // Optionally, update UI or perform additional actions upon success
    })
    .catch(error => {
        console.error('Error updating address:', error);
        alert('Failed to update address');
    });
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
