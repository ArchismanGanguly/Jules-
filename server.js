const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const db = JSON.parse(fs.readFileSync('game-devin/db.json'));
    db.users.push({ name, email, password, accountType: 'free', usage: 0, lastUsage: null });
    fs.writeFileSync('game-devin/db.json', JSON.stringify(db, null, 2));
    res.json({ success: true });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const db = JSON.parse(fs.readFileSync('game-devin/db.json'));
    const user = db.users.find(u => u.email === email && u.password === password);

    if (user) {
        if (user.accountType === 'free') {
            const now = new Date();
            const lastUsage = user.lastUsage ? new Date(user.lastUsage) : null;
            if (lastUsage && now.getMonth() === lastUsage.getMonth() && now.getFullYear() === lastUsage.getFullYear()) {
                res.json({ success: false, message: 'You have already used your free session this month.' });
                return;
            }
            user.lastUsage = now.toISOString();
            fs.writeFileSync('game-devin/db.json', JSON.stringify(db, null, 2));
        }
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: 'Invalid email or password.' });
    }
});

const stripe = require('stripe')('sk_test_YOUR_SECRET_KEY');

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'GameDevin Premium',
                    },
                    unit_amount: 50000,
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success.html',
        cancel_url: 'http://localhost:3000/cancel.html',
    });
    res.json({ id: session.id });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
