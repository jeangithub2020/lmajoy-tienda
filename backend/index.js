const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Aumentamos limite para fotos

// TU CONEXIÓN (No la toques, ya funciona)
const URI = 'mongodb+srv://pablonino22jean_db_user:eV1QUuHpwA4cnwBQ@cluster-pablo.x1dfkmw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster-pablo';

mongoose.connect(URI)
    .then(() => console.log('✅ Base de Datos Conectada'))
    .catch(err => console.error('❌ Error:', err));

// MODELO
const ProductSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    stock: Number,
    category: String,
    image: String,
    description: String
});
const Product = mongoose.model('Product', ProductSchema);

// --- RUTAS REALES ---

// 1. OBTENER TODO
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// 2. CREAR PRODUCTO (REAL)
app.post('/api/products', async (req, res) => {
    try {
        // Generamos un ID automático simple basado en la fecha
        const newId = Date.now(); 
        const newProduct = new Product({ ...req.body, id: newId });
        await newProduct.save(); // ¡AQUÍ SE GUARDA EN LA NUBE!
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. ACTUALIZAR PRODUCTO (REAL)
app.put('/api/products/:id', async (req, res) => {
    try {
        const updated = await Product.findOneAndUpdate(
            { id: req.params.id }, 
            req.body, 
            { new: true }
        );
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. BORRAR PRODUCTO (REAL)
app.delete('/api/products/:id', async (req, res) => {
    try {
        await Product.findOneAndDelete({ id: req.params.id });
        res.json({ message: "Eliminado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Servidor listo en http://localhost:${PORT}`));