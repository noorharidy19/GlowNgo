
function removeFromWishlist(productId) {
    // AJAX request to remove item from wishlist
    fetch('/wishlist/remove', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reload the page or remove the item from the DOM
            location.reload();
        } else {
            console.error('Error removing item from wishlist:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function addToCart(productId) {
    // AJAX request to add item to cart
    fetch('/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId, quantity: 1 })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reload the page or update the cart UI
            location.reload();
        } else {
            console.error('Error adding item to cart:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

function addAllToCart() {
    // AJAX request to add all items to cart
    const productIds = JSON.parse(document.getElementById('wishlistProductIds').textContent);

    fetch('/cart/addAll', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productIds })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reload the page or update the cart UI
            location.reload();
        } else {
            console.error('Error adding all items to cart:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}
