document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const headerOffset = 60;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Here you would typically send the form data to a server
        console.log('Contact form submitted:', { name, email, message });

        // Show a success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

    // Service card interaction
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            this.focus();
        });

        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });

    // Book button functionality
    const bookButtons = document.querySelectorAll('.service-details .btn-secondary');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the card's click event
            const serviceName = this.closest('.service-card').querySelector('h3').textContent;
            if (serviceName === 'Dog Walking') {
                openModal('dogWalkingModal');
            } else if (serviceName === 'Pet Sitting') {
                openModal('petSittingModal');
            } else if (serviceName === 'Grooming') {
                openModal('groomingModal');
            } else if (serviceName === 'Training') {
                openModal('trainingModal');
            }
        });
    });

    // Modal functionality
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    }

    // Close button functionality
    const closeButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            closeModal(this.closest('.modal').id);
        }
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    }

    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            handleFormSubmission(this, this.closest('.modal').id);
        });
    });

    function handleFormSubmission(form, modalId) {
        console.log(`${modalId} form submitted!`);
        const formData = new FormData(form);
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }
        closeModal(modalId);
        form.reset();

        // Show a success message
        alert('Thank you for your booking! We will confirm your appointment shortly.');
    }

    // Function to handle custom option selection
    function handleCustomOption(selectId, customInputId) {
        const select = document.getElementById(selectId);
        const customInput = document.getElementById(customInputId);

        if (select && customInput) {
            select.addEventListener('change', function() {
                if (this.value === 'depends') {
                    customInput.style.display = 'block';
                    customInput.required = true;
                } else {
                    customInput.style.display = 'none';
                    customInput.required = false;
                    customInput.value = ''; // Clear the input when hidden
                }
            });
        }
    }

    // Apply custom option handling to specific dropdowns
    handleCustomOption('dw-dogInteraction', 'dw-customDogInteraction');
    handleCustomOption('ps-interactionWithOtherPets', 'ps-customInteractionWithOtherPets');

    // Footer visibility control
    const footer = document.getElementById('main-footer');
    const contactSection = document.getElementById('contact');

    function checkFooterVisibility() {
        const contactRect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (contactRect.bottom <= windowHeight) {
            footer.classList.add('visible');
        } else {
            footer.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkFooterVisibility);
    window.addEventListener('resize', checkFooterVisibility);

    // Initial check
    checkFooterVisibility();
});

