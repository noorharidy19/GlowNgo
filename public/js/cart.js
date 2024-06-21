function changeQuantity(itemId, amount) {
    // Example logic to change quantity
    const quantityElement = document.getElementById('quantity_${itemId}');
    let currentQuantity = parseInt(quantityElement.innerText);

    if (currentQuantity + amount >= 0) {
        currentQuantity += amount;
        quantityElement.innerText = currentQuantity;
        
        // Example: Update backend (API call) to update quantity
        fetch('/api/cart/change-quantity/${itemId}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: currentQuantity })
        })
        .then(response => response.json())
        .then(data => {
            // Handle response if needed
        })
        .catch(error => console.error('Error updating quantity:', error));
    }
}