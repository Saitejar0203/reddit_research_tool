export function render(container) {
    console.log('Rendering Growing subreddits view');
    container.innerHTML = `
        <h2>Growing Subreddits</h2>
        <div>
            <label for="period">Growth Period:</label>
            <select id="period" onchange="fetchSubreddits(1)">
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="6months" selected>Last 6 Months</option>
                <option value="year">Last Year</option>
                <option value="3years">Last 3 Years</option>
            </select>
        </div>
        <div id="subreddits-list"></div>
        <div id="pagination"></div>
    `;
    fetchSubreddits(1);
}

async function fetchSubreddits(page) {
    const period = document.getElementById('period').value;
    console.log(`Fetching Growing subreddits for period ${period}, page ${page}`);
    try {
        const response = await fetch(`/api/subreddits/growing?page=${page}&period=${period}`);
        const subreddits = await response.json();
        displaySubreddits(subreddits);
        setupPagination(page);
    } catch (error) {
        console.error('Error fetching Growing subreddits:', error);
        document.getElementById('subreddits-list').innerText = 'Failed to load subreddits.';
    }
}

function displaySubreddits(subreddits) {
    const list = document.getElementById('subreddits-list');
    list.innerHTML = subreddits.map(subreddit => `
        <div>
            ${subreddit.display_name}
            (Growth in a day: ${subreddit.growth_day}%, 
            in a week: ${subreddit.growth_week}%, 
            in a month: ${subreddit.growth_month}%, 
            in last 3 months: ${subreddit.growth_3months}%, 
            in last 6 months: ${subreddit.growth_6months}%, 
            in last year: ${subreddit.growth_year}%)
        </div>
    `).join('');
    console.log('Displayed Growing subreddits:', subreddits.length);
}

function setupPagination(currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = `
        <button onclick="fetchSubreddits(${currentPage - 1})">Previous</button>
        <button onclick="fetchSubreddits(${currentPage + 1})">Next</button>
    `;
    console.log('Pagination setup for page', currentPage);
}
