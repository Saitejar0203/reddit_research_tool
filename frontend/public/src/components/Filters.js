export function render(container, applyFilters) {
    container.innerHTML = `
        <div>
            <label for="subreddit-size">Subreddit Size:</label>
            <select id="subreddit-size" onchange="applyFilters()">
                <option value="all">All Sizes</option>
                <option value="small">Small (up to 10k members)</option>
                <option value="medium">Medium (10k - 100k members)</option>
                <option value="large">Large (100k+ members)</option>
            </select>
        </div>
    `;
}

export function getSelectedFilters() {
    return {
        size: document.getElementById('subreddit-size').value
    };
}
