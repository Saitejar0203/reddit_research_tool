const express = require('express');
const path = require('path');
const redditApi = require('./redditAPI');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

// Serve static files from the frontend/public directory
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Serve index.html for the root URL
app.get('/', (req, res) => {
    console.log('Serving index.html');
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).send('OK');
});

// API route for largest subreddits
app.get('/api/subreddits/largest', async (req, res) => {
    const page = req.query.page || 1;
    console.log(`Received request for Largest subreddits, page: ${page}`);
    try {
        const subreddits = await redditApi.getLargestSubreddits(page);
        if (subreddits.length === 0) {
            console.warn('No subreddits returned for Largest view');
        } else {
            console.log(`Fetched ${subreddits.length} Largest subreddits`);
        }
        res.json(subreddits);
    } catch (error) {
        console.error('Error fetching Largest subreddits:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch Largest subreddits' });
    }
});

// API route for active subreddits
app.get('/api/subreddits/active', async (req, res) => {
    const page = req.query.page || 1;
    console.log(`Received request for Active subreddits, page: ${page}`);
    try {
        const subreddits = await redditApi.getActiveSubreddits(page);
        if (subreddits.length === 0) {
            console.warn('No subreddits returned for Active view');
        } else {
            console.log(`Fetched ${subreddits.length} Active subreddits`);
        }
        res.json(subreddits);
    } catch (error) {
        console.error('Error fetching Active subreddits:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch Active subreddits' });
    }
});

// API route for growing subreddits
app.get('/api/subreddits/growing', async (req, res) => {
    const page = req.query.page || 1;
    const period = req.query.period || '6months';
    console.log(`Received request for Growing subreddits, page: ${page}, period: ${period}`);
    try {
        const subreddits = await redditApi.getGrowingSubreddits(page, period);
        if (subreddits.length === 0) {
            console.warn('No subreddits returned for Growing view');
        } else {
            console.log(`Fetched ${subreddits.length} Growing subreddits`);
        }
        res.json(subreddits);
    } catch (error) {
        console.error('Error fetching Growing subreddits:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch Growing subreddits' });
    }
});

// Error handling for unknown routes
app.use((req, res, next) => {
    console.error(`Unknown route accessed: ${req.url}`);
    res.status(404).send('404 Not Found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
