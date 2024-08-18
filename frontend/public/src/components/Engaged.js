export function render(container) {
    console.log('Rendering Engaged subreddits view');
    container.innerHTML = `
        <h2>Engaged Subreddits</h2>
        <div id="subreddits-list"></div>
        <div id="pagination"></div>
    `;
    fetchSubreddits(1);
}

async function fetchSubreddits(page) {
    console.log(`Fetching Engaged subreddits for page ${page}`);
    try {
        const response = await fetch(`/api/subreddits/engaged?page=${page}`);
        const subreddits = await response.json();
        displaySubreddits(subreddits);
        setupPagination(page);
    } catch (error) {
        console.error('Error fetching Engaged subreddits:', error);
        document.getElementById('subreddits-list').innerText = 'Failed to load subreddits.';
    }
}

function displaySubreddits(subreddits) {
    const list = document.getElementById('subreddits-list');
    list.innerHTML = subreddits.map(subreddit => `
        <div>
            ${subreddit.display_name}
            (Comments/User: ${subreddit.comments_per_user}, 
            Submissions/User: ${subreddit.submissions_per_user})
        </div>
    `).join('');
    console.log('Displayed Engaged subreddits:', subreddits.length);
}

function setupPagination(currentPage) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = `
        <button onclick="fetchSubreddits(${currentPage - 1})">Previous</button>
        <button onclick="fetchSubreddits(${currentPage + 1})">Next</button>
    `;
    console.log('Pagination setup for page', currentPage);
}
