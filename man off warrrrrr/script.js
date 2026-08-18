const contactForm = document.querySelector('#contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formStatus = document.querySelector('#form-status');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        const formData = new FormData(contactForm);

        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        if (formStatus) {
            formStatus.textContent = '';
        }

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                contactForm.reset();

                if (formStatus) {
                    formStatus.textContent = 'Message sent successfully!';
                }

                submitButton.innerHTML =
                    'Message sent <span aria-hidden="true">&#10003;</span>';
            } else {
                throw new Error('Form submission failed.');
            }

        } catch (error) {
            if (formStatus) {
                formStatus.textContent =
                    'Something went wrong. Please try again.';
            }

            submitButton.innerHTML =
                'Send again <span aria-hidden="true">&#8594;</span>';

        } finally {
            submitButton.disabled = false;
        }
    });
}