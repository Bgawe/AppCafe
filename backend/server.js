const express = require('express');
const bodyParser = require('body-parser');
const { Snap } = require('midtrans-client');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors())
app.use(bodyParser.json());

app.post('/create-transaction', async (req, res) => {
  try {
    const snap = new Snap({
      isProduction: false, // Set to true for production
      serverKey: process.env.MIDTRANS_SERVER_KEY, // Replace with your Midtrans server key
    });

    const transactionToken = await snap.createTransactionToken(req.body);

    res.json({ transactionToken });
  } catch (error) {
    console.error('Error creating transaction token:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
