<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Services</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        #categories {
            display: flex;
            gap: 10px;
            margin: 20px;
        }
        .category {
            cursor: pointer;
            padding: 10px;
            background-color: #f4f4f4;
            border: 1px solid #ccc;
        }
        .category:hover {
            background-color: #e0e0e0;
        }
        .page-content, .tab-description {
            display: none;
        }
        .default-message {
            text-align: center;
            margin-top: 50px;
        }
        #toggleButton {
            display: none;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }
        #contactForm {
            margin: 20px;
        }
        #formMessage {
            margin-top: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <!-- Categories Section -->
    <div id="categories">
        <div class="category" data-page="page1">Category 1</div>
        <div class="category" data-page="page2">Category 2</div>
        <div class="category" data-page="page3">Category 3</div>
    </div>

    <!-- Content Section -->
    <div id="content">
        <div id="page1" class="page-content">
            <h2>Page 1 Content</h2>
            <div class="tabs">
                <div class="tab active" data-tab="tab1-desc">Tab 1</div>
                <div class="tab" data-tab="tab2-desc">Tab 2</div>
            </div>
            <div id="tab1-desc" class="tab-description">
                <p>Tab 1 Description</p>
            </div>
            <div id="tab2-desc" class="tab-description">
                <p>Tab 2 Description</p>
            </div>
        </div>
        <div id="page2" class="page-content">
            <h2>Page 2 Content</h2>
        </div>
        <div id="page3" class="page-content">
            <h2>Page 3 Content</h2>
        </div>
    </div>

    <!-- Toggle Button -->
    <button id="toggleButton">Back to Categories</button>

    <!-- Contact Form -->
    <form id="contactForm">
        <h2>Contact Me</h2>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" required><br>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" required><br>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br>
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="4" required></textarea><br>
        <button type="submit">Send</button>
    </form>

    <!-- Form Message -->
    <div id="formMessage"></div>

    <!-- EmailJS Script -->
    <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
    <script>
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

                // Define parameters for EmailJS (no need for to_email)
                const templateParams = {
                    from_name: `${firstName} ${lastName}`,
                    reply_to: email,
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
    </script>
</body>
</html>
