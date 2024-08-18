const axios = require('axios');

// Hardcoded credentials and user agent
const clientId = 'iEL6JHy_qzeLC-t3CrwctQ';
const clientSecret = 'bi_BJXM3dFN0-1v-JtXPaN7QSFgVQA';
const userAgent = 'research-tool/1.0';

// Function to get OAuth token
async function getOAuthToken() {
    console.log('Using hardcoded Client ID:', clientId);
    console.log('Using hardcoded Client Secret:', clientSecret);
    console.log('Using hardcoded User Agent:', userAgent);

    try {
        const response = await axios.post(
            'https://www.reddit.com/api/v1/access_token',
            'grant_type=client_credentials',
            {
                auth: {
                    username: clientId,
                    password: clientSecret,
                },
                headers: {
                    'User-Agent': userAgent,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        console.log('Successfully obtained OAuth token.');
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching OAuth token:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to get largest subreddits
async function getLargestSubreddits(page = 1) {
    try {
        const accessToken = await getOAuthToken();
        const response = await axios.get('https://oauth.reddit.com/subreddits/popular', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': userAgent,
            },
            params: {
                limit: 30,
                after: `t3_${page}` // This may need adjusting based on Reddit API's pagination
            },
        });
        console.log(`Fetched ${response.data.data.children.length} subreddits on page ${page}.`);
        return response.data.data.children.map(sub => sub.data);
    } catch (error) {
        console.error('Error fetching largest subreddits:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to get active subreddits
async function getActiveSubreddits(page = 1) {
    try {
        const accessToken = await getOAuthToken();
        const response = await axios.get('https://oauth.reddit.com/subreddits/new', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': userAgent,
            },
            params: {
                limit: 30,
                after: `t3_${page}` // This may need adjusting based on Reddit API's pagination
            },
        });
        console.log(`Fetched ${response.data.data.children.length} active subreddits on page ${page}.`);
        return response.data.data.children.map(sub => sub.data);
    } catch (error) {
        console.error('Error fetching active subreddits:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to get growing subreddits
async function getGrowingSubreddits(page = 1, period = '6months') {
    try {
        const accessToken = await getOAuthToken();
        // Adjust this endpoint as needed; for now, let's use the same popular endpoint
        const response = await axios.get('https://oauth.reddit.com/subreddits/popular', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': userAgent,
            },
            params: {
                limit: 30,
                after: `t3_${page}` // This may need adjusting based on Reddit API's pagination
            },
        });
        console.log(`Fetched ${response.data.data.children.length} growing subreddits for period ${period} on page ${page}.`);
        return response.data.data.children.map(sub => sub.data);
    } catch (error) {
        console.error('Error fetching growing subreddits:', error.response ? error.response.data : error.message);
        throw error;
    }
}

// Function to get engaged subreddits
async function getEngagedSubreddits(page = 1) {
    try {
        const accessToken = await getOAuthToken();
        const response = await axios.get('https://oauth.reddit.com/subreddits/new', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'User-Agent': userAgent,
            },
            params: {
                limit: 30,
                after: `t3_${page}` // This may need adjusting based on Reddit API's pagination
            },
        });
        console.log(`Fetched ${response.data.data.children.length} engaged subreddits on page ${page}.`);
        return response.data.data.children.map(sub => sub.data);
    } catch (error) {
        console.error('Error fetching engaged subreddits:', error.response ? error.response.data : error.message);
        throw error;
    }
}

module.exports = {
    getLargestSubreddits,
    getActiveSubreddits,
    getGrowingSubreddits,
    getEngagedSubreddits,
};
