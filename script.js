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
                // Convert to 12-hour format
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
        
        const pickupDate = document.getElementById('pickupDate').value;
        const pickupTime = document.getElementById('pickupTime').value;
        document.getElementById('summary-pickup-datetime').textContent = `${pickupDate} ${pickupTime}`;
        
        const returnDate = document.getElementById('returnDate').value;
        const returnTime = document.getElementById('returnTime').value;
        document.getElementById('summary-return-datetime').textContent = `${returnDate} ${returnTime}`;

        document.getElementById('summary-passengers').textContent = document.getElementById('passengers').value;
        document.getElementById('summary-age').textContent = document.getElementById('age').value;
        document.getElementById('summary-international').textContent = document.getElementById('international').value;

        // Personal details
        document.getElementById('summary-name').textContent = document.getElementById('fullName').value;
        document.getElementById('summary-email').textContent = document.getElementById('email').value;
        document.getElementById('summary-phone').textContent = 
            `${document.getElementById('countryCode').value} ${document.getElementById('phone').value}`;
        document.getElementById('summary-first-visit').textContent = document.getElementById('firstVisit').value;
        document.getElementById('summary-occasion').textContent = document.getElementById('occasion').value || 'N/A';
        document.getElementById('summary-referral').textContent = document.getElementById('referral').value;
        document.getElementById('summary-questions').textContent = document.getElementById('questions').value || 'N/A';
    }

    function validateStep(step) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        
        let isValid = true;
        requiredFields.forEach(field => {
            field.classList.remove('error');
            
            if (!field.value) {
                field.classList.add('error');
                isValid = false;
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
        const fullPhone = document.createElement('input');
        fullPhone.type = 'hidden';
        fullPhone.name = 'phone';
        fullPhone.value = countryCode + phoneNumber;
        
        // Remove the original phone fields from form submission
        document.getElementById('phone').removeAttribute('name');
        document.getElementById('countryCode').removeAttribute('name');
        
        // Add the combined phone field
        form.appendChild(fullPhone);
        
        // Submit the form
        form.submit();
    });
});
