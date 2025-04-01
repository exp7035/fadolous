document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your Public Key
    (function () {
        emailjs.init('CnBmP7pLlxaAlW9TI'); // Replace with your actual Public Key
    })();

    // Select DOM elements
    const categories = document.querySelectorAll('.category');
    const pageContents = document.querySelectorAll('.page-content');
    const tabs = document.querySelectorAll('.tab');
    const tabDescriptions = document.querySelectorAll('.tab-description');
    const toggleButton = document.getElementById('toggleButton');
    const categoriesSection = document.getElementById('categories');
    const contentSection = document.getElementById('content');

    // Create and append default message
    const defaultMessage = document.createElement('div');
    defaultMessage.className = 'default-message';
    defaultMessage.innerHTML = '<h2>My Services</h2><p>Select a category to see more information.</p>';
    contentSection.appendChild(defaultMessage);

    let defaultMessageVisible = true;

    // Hide all page contents initially
    pageContents.forEach(pageContent => {
        pageContent.style.display = 'none';
    });

    // Hide all tab descriptions initially
    tabDescriptions.forEach(tabDescription => {
        tabDescription.style.display = 'none';
    });

    // Category click event listener
    categories.forEach(category => {
        category.addEventListener('click', () => {
            console.log('Category clicked:', category);

            // Get the target page ID from the data attribute
            const targetPage = category.getAttribute('data-page');

            // Hide all page contents
            pageContents.forEach(pageContent => {
                pageContent.style.display = 'none';
            });

            // Show the selected page content
            const selectedPage = document.getElementById(targetPage);
            if (selectedPage) {
                selectedPage.style.display = 'block';
            }

            // Hide default message
            if (defaultMessageVisible) {
                defaultMessage.style.display = 'none';
                defaultMessageVisible = false;
            }

            // Hide all tab descriptions
            tabDescriptions.forEach(tabDescription => {
                tabDescription.style.display = 'none';
            });

            // Show toggle button
            toggleButton.style.display = 'block';

            // Hide categories section
            categoriesSection.style.display = 'none';
        });
    });

    // Tab click event listener
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            console.log('Tab clicked:', tab);

            // Get the target tab description ID from the data attribute
            const targetTab = tab.getAttribute('data-tab');

            // Hide all tab descriptions
            tabDescriptions.forEach(tabDescription => {
                tabDescription.style.display = 'none';
            });

            // Show the selected tab description
            const selectedTab = document.getElementById(targetTab);
            if (selectedTab) {
                selectedTab.style.display = 'block';
            }

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to the clicked tab
            tab.classList.add('active');

            // Hide toggle button
            toggleButton.style.display = 'none';

            // Show categories section
            categoriesSection.style.display = 'flex';
        });
    });

    // Toggle button click event listener
    toggleButton.addEventListener('click', () => {
        console.log('Toggle button clicked');

        // Hide all page contents
        pageContents.forEach(pageContent => {
            pageContent.style.display = 'none';
        });

        // Hide all tab descriptions
        tabDescriptions.forEach(tabDescription => {
            tabDescription.style.display = 'none';
        });

        // Show default message
        defaultMessage.style.display = 'block';
        defaultMessageVisible = true;

        // Hide toggle button
        toggleButton.style.display = 'none';

        // Show categories section
        categoriesSection.style.display = 'flex';
    });

    // Contact form submission handler
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent page reload

        // Get form data
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validate form fields
        if (!firstName || !lastName || !email || !message) {
            formMessage.textContent = 'Please fill out all fields.';
            formMessage.style.color = 'red';
            return;
        }

        // Define parameters for EmailJS
        const templateParams = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            message: message
        };

        // Send email using EmailJS
        emailjs.send('service_npuiodr', 'template_8mapq1a', templateParams)
            .then((response) => {
                console.log('Email sent successfully:', response);

                // Provide feedback to the user
                formMessage.textContent = 'Thank you for contacting me!';
                formMessage.style.color = 'green';

                // Reset the form
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error sending email:', error);

                // Provide feedback to the user
                formMessage.textContent = 'There was an error sending your message. Please try again later.';
                formMessage.style.color = 'red';
            });
    });
});
