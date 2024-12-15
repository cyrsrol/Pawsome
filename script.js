document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

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

    document.querySelector('.cta-buttons .btn-secondary').addEventListener('click', function(e) {
        e.preventDefault();
        const contactSection = document.querySelector('#contact');
        const headerOffset = 70;
        const elementPosition = contactSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        console.log('Contact form submitted:', { name, email, message });

        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });

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

    const bookButtons = document.querySelectorAll('.service-details .btn-secondary');
    bookButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
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

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
    }

    const closeButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function() {
            closeModal(this.closest('.modal').id);
        }
    }

    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    }

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

        alert('Thank you for your booking! We will confirm your appointment shortly.');
    }

    function handleCustomOption(selectId, customInputId) {
        const select = document.getElementById(selectId);
        const customInput = document.getElementById(customInputId);

        if (select && customInput) {
            select.addEventListener('change', function() {
                if (this.value === 'custom' || this.value === 'other' || this.value === 'depends') {
                    customInput.style.display = 'block';
                    customInput.required = true;
                } else {
                    customInput.style.display = 'none';
                    customInput.required = false;
                }
            });
        }
    }

    handleCustomOption('dw-walkDuration', 'dw-customWalkDuration');
    handleCustomOption('dw-dogInteraction', 'dw-customDogInteraction');
    handleCustomOption('ps-petType', 'ps-customPetType');
    handleCustomOption('ps-interactionWithOtherPets', 'ps-customInteractionWithOtherPets');
    handleCustomOption('gr-petType', 'gr-customPetType');
    handleCustomOption('gr-dropOffArrangements', 'gr-customDropOffArrangements');
    handleCustomOption('tr-petType', 'tr-customPetType');
    handleCustomOption('tr-previousTraining', 'tr-customPreviousTraining');
    handleCustomOption('tr-preferredMethods', 'tr-customPreferredMethods');
    handleCustomOption('tr-duration', 'tr-customDuration');
    handleCustomOption('tr-livingEnvironment', 'tr-customLivingEnvironment');

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

    checkFooterVisibility();
});

