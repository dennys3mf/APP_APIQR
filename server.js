const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(cors());

// Sirve archivos estáticos desde la carpeta 'src/images'
app.use('/images', express.static(path.join(__dirname, 'src/images')));

// Tu endpoint de bebidas
app.get('/api/bebidas', (req, res) => {
    const bebidas = [
        {
            name: 'Café Latte',
            category: 'Cafés',
            description: 'Espresso con leche vaporizada y una pequeña cantidad de espuma de leche.',
            price: 'S/ 18.90',
            image: '/images/latte.jpg'
        },
        {
            name: 'Cappuccino',
            category: 'Cafés',
            description: 'Espresso mezclado con leche vaporizada y coronado con espuma de leche.',
            price: 'S/ 20.80',
            image: '/images/cappuccino.jpg'
        },
        {
            name: 'Mocha',
            category: 'Cafés',
            description: 'Espresso mezclado con chocolate caliente y leche vaporizada, cubierto con crema batida.',
            price: 'S/ 22.70',
            image: '/images/mocha.jpg'
        },
        {
            name: 'Café Americano',
            category: 'Cafés',
            description: 'Una o dos shots de espresso agregados a agua caliente.',
            price: 'S/ 15.90',
            image: '/images/americano.jpg'
        },
        {
            name: 'Café Miel',
            category: 'Cafés',
            description: 'Espresso mezclado con miel y leche vaporizada, decorado con canela.',
            price: 'S/ 21.30',
            image: '/images/cafe-miel.jpg'
        },
        {
            name: 'Café Frappé',
            category: 'Cafés',
            description: 'Café espresso mezclado con hielo y crema, se sirve frío.',
            price: 'S/ 24.00',
            image: '/images/frappe.jpg'
        },
        {
            name: 'Té Verde Matcha Latte',
            category: 'Tés',
            description: 'Polvo de té verde Matcha mezclado con leche vaporizada y endulzado al gusto.',
            price: 'S/ 18.90',
            image: '/images/matcha-latte.jpg'
        },
        {
            name: 'Té Negro',
            category: 'Tés',
            description: 'Té negro tradicionalmente fuerte, se sirve caliente o frío.',
            price: 'S/ 16.50',
            image: '/images/te-negro.jpg'
        },
        {
            name: 'Chai Latte',
            category: 'Tés',
            description: 'Té negro mezclado con especias, leche vaporizada y endulzado al gusto.',
            price: 'S/ 19.50',
            image: '/images/chai-latte.jpg'
        },
        {
            name: 'Té de Hierbas',
            category: 'Tés',
            description: 'Infusión de hierbas, se sirve caliente o fría.',
            price: 'S/ 17.80',
            image: '/images/te-hierbas.jpg'
        },
    ];
    // Filtrar bebidas por categoría, primero cafés y luego tés
    const cafes = bebidas.filter(bebida => bebida.category === 'Cafés');
    const tes = bebidas.filter(bebida => bebida.category === 'Tés');
    res.json([...cafes, ...tes]);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
