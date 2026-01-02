// ===== SERVER SETUP =====
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ===== MIDDLEWARE =====
app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== ROUTES =====
// Serve main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for contact form (future use)
app.post('/api/contact', (req, res) => {
    console.log('Contact form received:', req.body);
    
    // In a real app, you would save this to a database or send an email
    // For now, we'll just send a success response
    
    res.json({
        success: true,
        message: 'Message received successfully! I will get back to you soon.',
        data: req.body
    });
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running on port ${PORT}`);
    console.log(`👉 Visit: http://localhost:${PORT}`);
    console.log(`👉 Press Ctrl+C to stop the server`);
});