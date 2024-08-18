export function render(subreddit, container) {
    container.innerHTML = `
        <h3>Performance Insights for ${subreddit.display_name}</h3>
        <ul>
            <li>Top Post: ${subreddit.top_post_title} (Upvotes: ${subreddit.top_post_upvotes})</li>
            <li>Top Comment: ${subreddit.top_comment} (Upvotes: ${subreddit.top_comment_upvotes})</li>
            <li>Most Active Day: ${subreddit.most_active_day}</li>
        </ul>
    `;
}
