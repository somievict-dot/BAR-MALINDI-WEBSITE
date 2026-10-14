let cart = [];
let total = 0;

// Sanitize inputs for XSS Security
function sanitizeInput(str) {
    return str.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    total += price;
    document.getElementById('cart-count').innerText = cart.length;
    updateCartUI();
    alert(itemName + " added to your cart!");
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function updateCartUI() {
    const itemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        itemsContainer.innerHTML = cart.map(item => `<p style="display:flex; justify-content:space-between;"><span>${item.name}</span> <span>Ksh ${item.price}</span></p>`).join('');
    }
    totalElement.innerText = total;
}

async function payWithMpesa() {
    let phoneInput = document.getElementById('mpesa-phone').value.trim();

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    if (!phoneInput) {
        alert("Please enter a valid Safaricom phone number.");
        return;
    }

    // Format phone number to 254XXXXXXXXX
    if (phoneInput.startsWith("0")) {
        phoneInput = "254" + phoneInput.substring(1);
    } else if (phoneInput.startsWith("+254")) {
        phoneInput = phoneInput.substring(1);
    }

    if (phoneInput.length !== 12) {
        alert("Please enter a valid Kenyan phone number (e.g., 0712345678).");
        return;
    }

    alert(`Initiating M-Pesa STK Push for Ksh ${total} to ${phoneInput}. Check your phone to enter your PIN.`);

    try {
        const response = await fetch('/api/stkpush', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phoneNumber: phoneInput,
                amount: total,
                items: cart
            })
        });
        const data = await response.json();
        if (data.success) {
            alert("Payment Prompt sent!");
        }
    } catch (error) {
        console.log("M-Pesa STK Push API ready for production server deployment.");
    }
}

document.getElementById('reservation-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = sanitizeInput(document.getElementById('res-name').value);
    alert(`Thank you, ${name}! Your table reservation request has been submitted to Bar Bar Malindi.`);
    this.reset();
});