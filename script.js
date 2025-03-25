document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    const pageContents = document.querySelectorAll('.page-content');
    const tabs = document.querySelectorAll('.tab');
    const tabDescriptions = document.querySelectorAll('.tab-description');

    // Initial state for categories
    pageContents.forEach(pageContent => {
        pageContent.style.display = 'none';
    });

    // Initial state for tabs
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    tabDescriptions.forEach(tabDescription => {
        tabDescription.style.display = 'none';
    });

    // Show a default message when no category or tab is selected
    const defaultMessage = document.createElement('div');
    defaultMessage.className = 'default-message';
    defaultMessage.innerHTML = '<h2>My Services</h2><p>Select a category to see more information.</p>';
    document.querySelector('.content').appendChild(defaultMessage);

    let defaultMessageVisible = true;

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const targetPage = category.getAttribute('data-page');
            pageContents.forEach(pageContent => {
                if (pageContent.id === targetPage) {
                    pageContent.style.display = 'block';
                } else {
                    pageContent.style.display = 'none';
                }
            });

            // Hide default message
            if (defaultMessageVisible) {
                const defaultMessage = document.querySelector('.default-message');
                if (defaultMessage) {
                    defaultMessage.style.display = 'none';
                    defaultMessageVisible = false;
                }
            }

            // Hide tab descriptions
            tabDescriptions.forEach(tabDescription => {
                tabDescription.style.display = 'none';
            });
        });
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            tabDescriptions.forEach(tabDescription => {
                if (tabDescription.id === targetTab) {
                    tabDescription.style.display = 'block';
                } else {
                    tabDescription.style.display = 'none';
                }
            });

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to the clicked tab
            tab.classList.add('active');

            // Keep default message visible
            if (defaultMessageVisible) {
                const defaultMessage = document.querySelector('.default-message');
                if (defaultMessage) {
                    defaultMessage.style.display = 'block';
                }
            }
        });
    });
});
