const express = require('express');
const app = express();

// Vulnerability point: express.json() automatically decompresses Brotli
app.use(express.json());

app.post('/api/upload', (req, res) => {
  res.json({ status: 'received', data: req.body });
});

app.listen(3000, () => console.log('Vulnerable API running on port 3000'));
