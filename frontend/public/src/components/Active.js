export function render(container) {
    console.log('Rendering Active subreddits view');
    container.innerHTML = `
        <h2>Active Subreddits</h2>
        <div id="subreddits-list"></div>
        <div id="pagination"></div>
    `;
    fetchSubreddits(1);  // Start with the first page
}

async function fetchSubreddits(page) {
    console.log(`Fetching Active subreddits for page ${page}`);
    try {
        const response = await fetch(`/api/subreddits/active?page=${page}`);
        const subreddits = await response.json();

        if (subreddits.length === 0) {
            console.warn('No active subreddits returned');
            document.getElementById('subreddits-list').innerText = 'No active subreddits found.';
        } else {
            console.log(`Fetched ${subreddits.length} active subreddits`);
            displaySubreddits(subreddits);
            setupPagination(page);
        }
    } catch (error) {
        console.error('Error fetching Active subreddits:', error);
        document.getElementById('subreddits-list').innerText = 'Failed to load subreddits.';
    }
}

function displaySubreddits(subreddits) {
    const list = document.getElementById('subreddits-list');
    if (subreddits.length === 0) {
        console.warn('No subreddits to display');
        list.innerText = 'No subreddits available';
    } else {
        list.innerHTML = subreddits.map(subreddit => 
            `<div>${subreddit.display_name} (${subreddit.active_user_count} active users)</div>`
        ).join('');
        console.log('Displayed Active subreddits:', subreddits.length);
    }
}

function setupPagination(currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = `
        <button onclick="fetchSubreddits(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
        <button onclick="fetchSubreddits(${currentPage + 1})">Next</button>
    `;
    console.log('Pagination setup for page', currentPage);
}
