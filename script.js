document.addEventListener('DOMContentLoaded', function() {
    // First, inject the HTML content
    document.getElementById('rental-form').innerHTML = `
        <h2>Request quote</h2>
        
        <div class="progress-text">
            <span id="progress-percentage">25% Complete</span>
        </div>

        <div class="step-indicator">
            <div class="step-dot active" data-step="1"></div>
            <div class="step-dot" data-step="2"></div>
            <div class="step-dot" data-step="3"></div>
            <div class="step-dot" data-step="4"></div>
        </div>

        <form id="bookingForm" action="https://formsubmit.co/thxplsdie@gmail.com" method="POST">
            <input type="hidden" name="_subject" value="New Car Rental Booking">
            <input type="hidden" name="_template" value="table">
            <input type="hidden" name="_next" value="https://www.google.com">
            <input type="hidden" name="_captcha" value="false">

            <!-- Step 1: Vehicle Selection -->
            <div class="form-step active" data-step="1">
                <h3 class="step-title">Select Your Vehicle</h3>
                <div class="car-options">
                    <div class="car-option">
                        <input type="radio" id="small" name="carType" value="SMALL" required>
                        <label for="small" class="car-label">
                            <img src="https://placehold.co/300x120" alt="Small Car">
                            <div class="car-info">
                                <h4>SMALL</h4>
                                <p>Toyota Yaris or similar</p>
                            </div>
                        </label>
                    </div>

                    <div class="car-option">
                        <input type="radio" id="compact" name="carType" value="COMPACT" required>
                        <label for="compact" class="car-label">
                            <img src="https://placehold.co/300x120" alt="Compact Car">
                            <div class="car-info">
                                <h4>COMPACT</h4>
                                <p>Toyota Corolla or similar</p>
                            </div>
                        </label>
                    </div>

                    <div class="car-option">
                        <input type="radio" id="standard" name="carType" value="STANDARD" required>
                        <label for="standard" class="car-label">
                            <img src="https://placehold.co/300x120" alt="Standard Car">
                            <div class="car-info">
                                <h4>STANDARD</h4>
                                <p>Toyota Camry or similar</p>
                            </div>
                        </label>
                    </div>

                    <div class="car-option">
                        <input type="radio" id="suv" name="carType" value="SUV" required>
                        <label for="suv" class="car-label">
                            <img src="https://placehold.co/300x120" alt="SUV">
                            <div class="car-info">
                                <h4>SUV</h4>
                                <p>Toyota RAV4 or similar</p>
                            </div>
                        </label>
                    </div>

                    <div class="car-option">
                        <input type="radio" id="van" name="carType" value="9 SEATER" required>
                        <label for="van" class="car-label">
                            <img src="https://placehold.co/300x120" alt="9 Seater Van">
                            <div class="car-info">
                                <h4>9 SEATER</h4>
                                <p>Toyota Hiace or similar</p>
                            </div>
                        </label>
                    </div>
                </div>

                <div class="form-group transmission-select">
                    <label for="transmission">Transmission Type:</label>
                    <select id="transmission" name="transmission" required>
                        <option value="">Select transmission</option>
                        <option value="AUTOMATIC">AUTOMATIC</option>
                        <option value="MANUAL">MANUAL</option>
                    </select>
                </div>
                <div class="form-navigation">
                    <button type="button" class="btn-next">Continue</button>
                </div>
            </div>

            <!-- Step 2: Rental Details -->
            <div class="form-step" data-step="2">
                <h3 class="step-title">Rental Details</h3>
                <div class="form-columns">
                    <div class="form-column">
                        <!-- Pickup Location -->
                        <div class="form-group">
                            <label for="pickupLocation">Pickup Location:</label>
                            <select id="pickupLocation" name="pickupLocation" required>
                                <option value="">Select pickup location</option>
                                <option value="Dublin Airport">Dublin Airport</option>
                                <option value="Dublin City (St. Stephen's Green)">Dublin City (St. Stephen's Green)</option>
                                <!-- Add all your locations here -->
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="pickupDate">Pickup Date:</label>
                            <input type="date" id="pickupDate" name="pickupDate" required>
                        </div>

                        <div class="form-group">
                            <label for="pickupTime">Pickup Time:</label>
                            <select id="pickupTime" name="pickupTime" required>
                                <option value="">Select pickup time</option>
                            </select>
                        </div>

                        <!-- Add other pickup details -->
                    </div>

                    <div class="form-column">
                        <!-- Return Location -->
                        <div class="form-group">
                            <label for="returnLocation">Return Location:</label>
                            <select id="returnLocation" name="returnLocation" required>
                                <option value="">Select return location</option>
                                <option value="Dublin Airport">Dublin Airport</option>
                                <option value="Dublin City (St. Stephen's Green)">Dublin City (St. Stephen's Green)</option>
                                <!-- Add all your locations here -->
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="returnDate">Return Date:</label>
                            <input type="date" id="returnDate" name="returnDate" required>
                        </div>

                        <div class="form-group">
                            <label for="returnTime">Return Time:</label>
                            <select id="returnTime" name="returnTime" required>
                                <option value="">Select return time</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="form-navigation">
                    <button type="button" class="btn-prev">Previous</button>
                    <button type="button" class="btn-next">Continue</button>
                </div>
            </div>

            <!-- Add Step 3 and 4 HTML here -->
        </form>
    `;

    // Your existing JavaScript code starts here
    const form = document.getElementById('bookingForm');
    const steps = form.querySelectorAll('.form-step');
    const dots = document.querySelectorAll('.step-dot');
    let currentStep = 1;

    // Rest of your existing JavaScript...
});

    // Add Steps 3 and 4 to the HTML string (after Step 2)
    `
            <!-- Step 3: Personal Information -->
            <div class="form-step" data-step="3">
                <h3 class="step-title">Your Details</h3>
                <div class="form-group">
                    <label for="fullName">Full Name:</label>
                    <input type="text" id="fullName" name="fullName" required placeholder="Enter your full name">
                </div>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your email">
                </div>

                <div class="form-group phone-group">
                    <label for="phone">Phone Number:</label>
                    <div class="phone-input-container">
                        <select id="countryCode" name="countryCode" required>
                            <option value="">Select country code</option>
                            <option value="+353">Ireland (+353)</option>
                            <option value="+1">USA/Canada (+1)</option>
                            <option value="+44">UK (+44)</option>
                            <!-- Add all country codes here -->
                        </select>
                        <input type="tel" id="phone" name="phone" required placeholder="Enter phone number">
                    </div>
                </div>

                <div class="form-group">
                    <label for="zipCode">Zip/Postal Code:</label>
                    <input type="text" id="zipCode" name="zipCode" required placeholder="Enter your zip/postal code">
                </div>

                <div class="form-group">
                    <label for="firstVisit">Is this your first visit to Ireland?</label>
                    <select id="firstVisit" name="firstVisit" required>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="occasion">Is this a special occasion trip? (Optional)</label>
                    <select id="occasion" name="occasion">
                        <option value="">Select if applicable</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Anniversary">Anniversary</option>
                        <option value="Engagement">Engagement</option>
                        <option value="Wedding">Wedding</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="referral">How did you hear about us?</label>
                    <select id="referral" name="referral" required>
                        <option value="">Select</option>
                        <option value="Returning">Returning Customer</option>
                        <option value="Cousin">Cousin</option>
                        <option value="Friend">Friend</option>
                        <option value="Google">Google</option>
                        <option value="TripAdvisor">TripAdvisor</option>
                        <option value="Facebook Advertising">Facebook Advertising</option>
                        <option value="Irish Central">Irish Central</option>
                        <option value="Facebook Travel Groups">Facebook Travel Groups</option>
                        <option value="TikTok">TikTok</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Pinterest">Pinterest</option>
                        <option value="Home to Mayo">Home to Mayo</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="questions">Have you any particular questions or queries we can help you with? (Optional)</label>
                    <textarea id="questions" name="questions" rows="4" placeholder="Enter your questions here"></textarea>
                </div>

                <div class="form-navigation">
                    <button type="button" class="btn-prev">Previous</button>
                    <button type="button" class="btn-next">Continue</button>
                </div>
            </div>

            <!-- Step 4: Summary -->
            <div class="form-step" data-step="4">
                <h3 class="step-title">Review Your Booking</h3>
                
                <div class="summary-section">
                    <h4>Selected Vehicle <span class="edit-step" data-goto="1">Edit</span></h4>
                    <div class="summary-item">
                        <span class="summary-label">Vehicle Type:</span>
                        <span class="summary-value" id="summary-car-type">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Transmission:</span>
                        <span class="summary-value" id="summary-transmission">-</span>
                    </div>
                </div>

                <!-- Add the rest of the summary sections -->
            </div>
    `;
    // Continue the summary sections in Step 4
    `
                <div class="summary-section">
                    <h4>Rental Details <span class="edit-step" data-goto="2">Edit</span></h4>
                    <div class="summary-item">
                        <span class="summary-label">Pickup Location:</span>
                        <span class="summary-value" id="summary-pickup-location">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Pickup Date & Time:</span>
                        <span class="summary-value" id="summary-pickup-datetime">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Return Location:</span>
                        <span class="summary-value" id="summary-return-location">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Return Date & Time:</span>
                        <span class="summary-value" id="summary-return-datetime">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Number of Passengers:</span>
                        <span class="summary-value" id="summary-passengers">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Age Verification:</span>
                        <span class="summary-value" id="summary-age">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">International Travel:</span>
                        <span class="summary-value" id="summary-international">-</span>
                    </div>
                </div>

                <div class="summary-section">
                    <h4>Personal Details <span class="edit-step" data-goto="3">Edit</span></h4>
                    <div class="summary-item">
                        <span class="summary-label">Full Name:</span>
                        <span class="summary-value" id="summary-name">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Email:</span>
                        <span class="summary-value" id="summary-email">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Phone:</span>
                        <span class="summary-value" id="summary-phone">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">First Visit to Ireland:</span>
                        <span class="summary-value" id="summary-first-visit">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Special Occasion:</span>
                        <span class="summary-value" id="summary-occasion">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Referral Source:</span>
                        <span class="summary-value" id="summary-referral">-</span>
                    </div>
                    <div class="summary-item">
                        <span class="summary-label">Questions/Comments:</span>
                        <span class="summary-value" id="summary-questions">-</span>
                    </div>
                </div>

                <div class="form-navigation">
                    <button type="button" class="btn-prev">Previous</button>
                    <button type="submit">Send Inquiry</button>
                </div>
            </div>
        </form>
    `;

    // Now add all the JavaScript functionality
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
