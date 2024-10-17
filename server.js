const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Function that encodes input to base64
const encodeToBase64 = async (req, res) => {
  try {
    const { input } = req.body;

    // Input validation
    if (!input) {
      return res.status(400).json({ error: 'Input is required' });
    }

    if (typeof input !== 'string') {
      return res
        .status(400)
        .json({ error: 'Input must be a string' });
    }

    // Encode input to base64
    const output = Buffer.from(input).toString('base64');
    res.json({ output });
  } catch (error) {
    // Internal server error
    res.status(500).json({ error: 'Server encountered an error' });
  }
};

// Documentation endpoint
const getDocs = (req, res) => {
  res.json({
    name: 'encodeToBase64',
    description: 'Encode a string to base64 format.',
    input: {
      type: 'string',
      description: 'The string input to be encoded in base64 format.',
      example: 'Hello, world',
      notes:
        'Input must be a valid string. Missing or invalid input returns an error.',
    },
    output: {
      type: 'string',
      description: 'The base64 encoded version of the input string.',
      example: 'SGVsbG8sIHdvcmxk',
    },
    errors: [
      {
        type: '400',
        description: 'Input validation failed.',
        example: { error: 'Input is required' },
      },
      {
        type: '400',
        description: 'Input must be a string.',
        example: { error: 'Input must be a string' },
      },
      {
        type: '500',
        description: 'Internal server error.',
        example: { error: 'Server encountered an error' },
      },
    ],
  });
};

// Root route (for convenience)
app.get('/', (req, res) => {
  res.send(
    'Welcome to the Base64 Encoder API. Use /functions/encodeToBase64 for encoding.'
  );
});

// Routes
app.post('/functions/encodeToBase64', encodeToBase64);
app.get('/functions/encodeToBase64', getDocs);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
