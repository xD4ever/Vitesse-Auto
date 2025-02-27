import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    let user_ip = 
        req.headers['cf-connecting-ip'] || 
        req.headers['x-real-ip'] || 
        req.headers['x-forwarded-for'] || 
        req.socket.remoteAddress || '';

    // Si l'adresse IP est une IPv4 mappée en IPv6 (par exemple, ::ffff:192.168.1.1), extraire la partie IPv4
    if (user_ip.startsWith('::ffff:')) {
        user_ip = user_ip.replace('::ffff:', '');
    }

    return res.json({ user_ip });
});

// Écouter uniquement sur IPv4 pour éviter de passer par défaut à IPv6 (::1)
app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
});
