document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('bookingForm');
    const steps = form.querySelectorAll('.form-step');
    const dots = document.querySelectorAll('.step-dot');
    let currentStep = 1;

    // Generate time options for pickup and return time selects
    function generateTimeOptions() {
        const timeSelects = [document.getElementById('pickupTime'), document.getElementById('returnTime')];
        
        // Generate times for 24 hours with 30-minute intervals
        for (let hour = 0; hour < 24; hour++) {
            for (let minutes of ['00', '30']) {
                let displayHour = hour % 12;
                displayHour = displayHour === 0 ? 12 : displayHour;
                const ampm = hour < 12 ? 'AM' : 'PM';
                const timeDisplay = `${displayHour}:${minutes} ${ampm}`;
                const timeValue = `${hour.toString().padStart(2, '0')}:${minutes}`;
                
                const option = new Option(timeDisplay, timeValue);
                
                timeSelects.forEach(select => {
                    select.add(option.cloneNode(true));
                });
            }
        }
    }

    // Initialize time options
    generateTimeOptions();

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    pickupDate.min = today;
    returnDate.min = today;

    function showStep(stepNumber) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const nextStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        
        // Add exit animation
        currentStepElement.style.transform = 'translateX(-20px)';
        currentStepElement.style.opacity = '0';
        
        setTimeout(() => {
            currentStepElement.classList.remove('active');
            nextStepElement.classList.add('active');
            
            // Add entrance animation
            setTimeout(() => {
                nextStepElement.style.transform = 'translateX(0)';
                nextStepElement.style.opacity = '1';
            }, 50);
        }, 300);

        // Update dots
        dots.forEach(dot => {
            const dotStep = parseInt(dot.dataset.step);
            dot.classList.remove('active', 'completed');
            if (dotStep === stepNumber) {
                dot.classList.add('active');
            } else if (dotStep < stepNumber) {
                dot.classList.add('completed');
            }
        });

        // Update progress percentage
        const percentage = Math.round((stepNumber / 4) * 100);
        document.getElementById('progress-percentage').textContent = `${percentage}% Complete`;

        // Update summary if moving to step 4
        if (stepNumber === 4) {
            updateSummary();
        }

        currentStep = stepNumber;
    }

    function updateSummary() {
        // Vehicle details
        const selectedCar = document.querySelector('input[name="carType"]:checked');
        document.getElementById('summary-car-type').textContent = selectedCar ? selectedCar.value : '-';
        document.getElementById('summary-transmission').textContent = document.getElementById('transmission').value;

        // Rental details
        document.getElementById('summary-pickup-location').textContent = document.getElementById('pickupLocation').value;
        document.getElementById('summary-return-location').textContent = document.getElementById('returnLocation').value;
        
        // Format pickup datetime
        const pickupTime = document.getElementById('pickupTime').value; // This is in 24h format
        const pickupTimeDisplay = new Date(`2000/01/01 ${pickupTime}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        document.getElementById('summary-pickup-datetime').textContent = 
            `${document.getElementById('pickupDate').value} ${pickupTimeDisplay}`;

        // Format return datetime
        const returnTime = document.getElementById('returnTime').value; // This is in 24h format
        const returnTimeDisplay = new Date(`2000/01/01 ${returnTime}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        document.getElementById('summary-return-datetime').textContent = 
            `${document.getElementById('returnDate').value} ${returnTimeDisplay}`;

        // New rental details
        document.getElementById('summary-passengers').textContent = document.getElementById('passengers').value;
        document.getElementById('summary-age').textContent = document.getElementById('age').value;
        document.getElementById('summary-international').textContent = document.getElementById('international').value;

        // Personal details
        document.getElementById('summary-name').textContent = document.getElementById('fullName').value;
        document.getElementById('summary-email').textContent = document.getElementById('email').value;
        document.getElementById('summary-phone').textContent = 
            `${document.getElementById('countryCode').value} ${document.getElementById('phone').value}`;

        // New personal details
        document.getElementById('summary-first-visit').textContent = document.getElementById('firstVisit').value;
        document.getElementById('summary-occasion').textContent = document.getElementById('occasion').value || 'N/A';
        document.getElementById('summary-referral').textContent = document.getElementById('referral').value;
        document.getElementById('summary-questions').textContent = document.getElementById('questions').value || 'None';
    }

    function validateStep(step) {
        const currentStepElement = form.querySelector(`.form-step[data-step="${step}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        // Clear all previous errors
        currentStepElement.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        // Special validation for car selection on step 1
        if (step === 1) {
            const carSelected = document.querySelector('input[name="carType"]:checked');
            if (!carSelected) {
                alert('Please select a vehicle');
                document.querySelectorAll('.car-option').forEach(option => {
                    option.classList.add('error');
                });
                return false;
            }
        }

        // Special validation for age requirement on step 2
        if (step === 2) {
            const ageVerification = document.getElementById('age').value;
            if (ageVerification === 'no') {
                alert('You must be over 25 years old to rent a vehicle');
                document.getElementById('age').classList.add('error');
                return false;
            }
        }

        // Check all required fields
        requiredFields.forEach(field => {
            if (!field.value) {
                isValid = false;
                field.classList.add('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields');
            return false;
        }

        // Additional validations for step 3
        if (step === 3) {
            // Validate name has at least two words
            const fullName = document.getElementById('fullName').value;
            const nameWords = fullName.trim().split(/\s+/);
            if (nameWords.length < 2) {
                alert('Please enter both your first and last name');
                document.getElementById('fullName').classList.add('error');
                return false;
            }

            // Validate phone number
            const phoneNumber = document.getElementById('phone').value;
            if (!/^\d{10}$/.test(phoneNumber)) {
                alert('Please enter a valid 10-digit phone number');
                document.getElementById('phone').classList.add('error');
                return false;
            }

            // Validate email
            const email = document.getElementById('email').value;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Please enter a valid email address');
                document.getElementById('email').classList.add('error');
                return false;
            }

            // Validate zip/postal code
            const zipCode = document.getElementById('zipCode').value;
            if (!/^[a-zA-Z0-9\s-]{4,10}$/.test(zipCode)) {
                alert('Please enter a valid zip/postal code');
                document.getElementById('zipCode').classList.add('error');
                return false;
            }

            // Validate required dropdowns
            const requiredDropdowns = ['firstVisit', 'referral'];
            for (const id of requiredDropdowns) {
                const element = document.getElementById(id);
                if (!element.value) {
                    alert(`Please select an option for ${element.previousElementSibling.textContent}`);
                    element.classList.add('error');
                    return false;
                }
            }
        }

        return true;
    }

    // Navigation event listeners
    form.querySelectorAll('.btn-next').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });

    form.querySelectorAll('.btn-prev').forEach(button => {
        button.addEventListener('click', () => {
            showStep(currentStep - 1);
        });
    });

    // Edit button handlers
    document.querySelectorAll('.edit-step').forEach(button => {
        button.addEventListener('click', () => {
            const stepToGo = parseInt(button.dataset.goto);
            showStep(stepToGo);
        });
    });

    // Date validation
    pickupDate.addEventListener('change', function() {
        returnDate.min = this.value;
        if (returnDate.value && returnDate.value < this.value) {
            returnDate.value = this.value;
        }
    });

    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate age one final time
        if (document.getElementById('age').value === 'no') {
            alert('You must be over 25 years old to rent a vehicle');
            return;
        }
        
        // Combine country code and phone number
        const countryCode = document.getElementById('countryCode').value;
        const phoneNumber = document.getElementById('phone').value;
        const fullPhone = countryCode + phoneNumber;
        
        // Prepare form data
        const formData = new FormData(form);
        formData.set('phone', fullPhone); // Update phone with combined value

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        // Send to both email handler and Zapier
        Promise.all([
            // Send to our email handler
            fetch('send-email.php', {
                method: 'POST',
                body: formData
            }).then(response => response.json()),

            // Send to Zapier webhook
            fetch('https://hooks.zapier.com/hooks/catch/9405168/2ftxhhl/', {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'no-cors'
            })
        ])
        .then(([emailResponse]) => {
            if (emailResponse.success) {
                // Redirect to thank you page or Google
                window.location.href = document.getElementById('redirect-url').value;
            } else {
                throw new Error(emailResponse.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
        })
        .finally(() => {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Inquiry';
        });
    });
}); 
