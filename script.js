document.addEventListener('DOMContentLoaded', () => {
    // Target our specific form and elements
    const form = document.getElementById('bookingForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const statusDiv = document.getElementById('formStatus'); // Where our clean messages will appear

    form.addEventListener('submit', async (e) => {
        // Stop the page from reloading
        e.preventDefault();

        // Gather all form data
        const formData = new FormData(form);
        
        // Append your specific access key
        formData.append("access_key", "d04e85ba-3c65-4152-a15e-66b046888e22");

        // Save the original button text so we can restore it later
        const originalText = submitBtn.textContent;

        // Change button state to show it is working
        submitBtn.textContent = "Sending...";
        submitBtn.disabled = true;
        statusDiv.textContent = ""; // Clear any previous messages

        try {
            // Send the data to Web3Forms
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            // Handle the response
            if (response.ok) {
                // Success: Show green text instead of an alert popup
                statusDiv.style.color = '#16a34a'; 
                statusDiv.textContent = "Success! Your booking request has been sent to HaulTech.";
                form.reset(); // Clear the form fields
            } else {
                // Error from Web3Forms: Show red text
                statusDiv.style.color = '#dc2626'; 
                statusDiv.textContent = "Error: " + data.message;
            }

        } catch (error) {
            // Network Error: Show red text and provide the phone number as a backup
            statusDiv.style.color = '#dc2626';
            statusDiv.textContent = "Something went wrong. Please try again or call 0411 460 089.";
        } finally {
            // Restore the button to its original state so they can use it again if needed
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
});