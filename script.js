document.addEventListener('DOMContentLoaded', () => {
    const categories = document.querySelectorAll('.category');
    const pageContents = document.querySelectorAll('.page-content');
    const tabs = document.querySelectorAll('.tab');
    const tabDescriptions = document.querySelectorAll('.tab-description');
    const toggleButton = document.getElementById('toggleButton');
    const categoriesSection = document.getElementById('categories');
    const contentSection = document.getElementById('content');

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

            // Show toggle button
            toggleButton.style.display = 'block';

            // Hide categories
            categoriesSection.style.display = 'none';
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

            // Show default message only if it was visible
            if (defaultMessageVisible) {
                const defaultMessage = document.querySelector('.default-message');
                if (defaultMessage) {
                    defaultMessage.style.display = 'block';
                    defaultMessageVisible = true;
                }
            }

            // Hide toggle button
            toggleButton.style.display = 'none';

            // Show categories
            categoriesSection.style.display = 'flex';
        });
    });

    toggleButton.addEventListener('click', () => {
        // Hide all page contents and tab descriptions
        pageContents.forEach(pageContent => {
            pageContent.style.display = 'none';
        });
        tabDescriptions.forEach(tabDescription => {
            tabDescription.style.display = 'none';
        });

        // Show default message
        const defaultMessage = document.querySelector('.default-message');
        if (defaultMessage) {
            defaultMessage.style.display = 'block';
            defaultMessageVisible = true;
        }

        // Hide toggle button
        toggleButton.style.display = 'none';

        // Show categories
        categoriesSection.style.display = 'flex';
    });

    // Handle form submission using EmailJS
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Initialize EmailJS with your service ID
        emailjs.init('service_mpphn2l'); // Replace with your EmailJS public key

        // Send the form data using EmailJS
        emailjs.sendForm('service_mpphn2l', 'template_3g9ookc', this) // Replace 'template_id' with your actual template ID
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                const formMessage = document.getElementById('formMessage');
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.style.color = '#4caf50';
                document.getElementById('contactForm').reset(); // Clear the form
            }, function (error) {
                console.error('FAILED...', error);
                const formMessage = document.getElementById('formMessage');
                formMessage.textContent = 'There was an error sending your message. Please try again.';
                formMessage.style.color = '#f44336';
            });
    });
});
