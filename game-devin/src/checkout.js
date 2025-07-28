document.addEventListener('DOMContentLoaded', () => {
    const checkoutButton = document.getElementById('checkout-button');
    const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY');

    checkoutButton.addEventListener('click', async () => {
        const response = await fetch('/create-checkout-session', {
            method: 'POST'
        });
        const session = await response.json();
        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        });
        if (result.error) {
            alert(result.error.message);
        }
    });
});
