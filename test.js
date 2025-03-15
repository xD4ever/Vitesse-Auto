import express from 'express';

const app = express();
const API_KEY = '6163487e268e7fd528f23ac136d9fcaa'; //API key

app.use(express.json());

app.get('/get-ip-info', async (req, res) => {
    let user_ip =
        req.headers['cf-connecting-ip'] ||
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';

    // Pour extraire l'adresse IPv4 d'un utilisateur à partir d'une adresse IPv6
    if (user_ip.startsWith('::ffff:')) {
        user_ip = user_ip.replace('::ffff:', '');
    }

    try {
        const response = await fetch(`http://api.ipstack.com/${user_ip}?access_key=${API_KEY}`);
        const data = await response.json();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch IP data' });
    }
});

//Écouter sur IPv4 uniquement pour éviter d’utiliser IPv6 par défaut (::1)
app.listen(5000, '0.0.0.0', () => {
    console.log('Server is running on port 5000');
});
