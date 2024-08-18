function loadView(view) {
    console.log('Loading view:', view);
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = ''; // Clear existing content

    switch(view) {
        case 'Largest':
            import('./src/components/Largest.js').then(module => {
                console.log('Rendering Largest view');
                module.render(mainContent);
            }).catch(error => {
                console.error('Error loading Largest component:', error);
            });
            break;
        case 'Active':
            import('./src/components/Active.js').then(module => {
                console.log('Rendering Active view');
                module.render(mainContent);
            }).catch(error => {
                console.error('Error loading Active component:', error);
            });
            break;
        case 'Growing':
            import('./src/components/Growing.js').then(module => {
                console.log('Rendering Growing view');
                module.render(mainContent);
            }).catch(error => {
                console.error('Error loading Growing component:', error);
            });
            break;
        case 'Engaged':
            import('./src/components/Engaged.js').then(module => {
                console.log('Rendering Engaged view');
                module.render(mainContent);
            }).catch(error => {
                console.error('Error loading Engaged component:', error);
            });
            break;
        default:
            console.error('Unknown view:', view);
    }
}

// Event listeners for navigation clicks
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const view = this.textContent;
        loadView(view);
    });
});

// Initially load the 'Largest' view
loadView('Largest');
