$.noConflict();
(function(jQuery) {
    // Vonage API configuration
    const vonage = new Vonage({
        apiKey: '31166d7b',
        apiSecret: 'sspfVGwYB78xN8kl',
    });

    // Generate OTP
    function generateOTP() {
        const otpGenerator = require('otp-generator');
        const options = { digits: true, upperCase: true, specialChars: true };
        return otpGenerator.generate(6, options);
    }

    jQuery.Shop = function(element) {
        this.jQueryelement = jQuery(element);
        this.init();
    };

    jQuery.Shop.prototype = {
        init: function() {
            // ...

            this.handleOTPVerification();

            // ...
        },

        // ...

        // Prompts OTP verification
        promptOTP: function(otp) {
            var self = this;
            var enteredOTP = prompt("Please enter the OTP sent to your phone number:");

            if (enteredOTP === otp) {
                console.log("OTP verification successful.");
                // Proceed with the order processing or redirection to the success page
            } else {
                console.error("Invalid OTP. Please enter the correct OTP.");
            }
        },


        // Sends OTP using Vonage API
        sendOTP: function(phone) {
            var self = this;

            // Generate a random OTP code
            var otp = generateOTP();

            // Send the OTP to the user's phone number using Vonage API
            vonage.message.sendSms('YOUR_VONAGE_PHONE_NUMBER', phone, `Your OTP is: ${otp}`, (err, responseData) => {
                if (err) {
                    console.error('Failed to send OTP:', err);
                } else {
                    console.log('OTP has been sent to', phone);
                    self.promptOTP(otp);
                }
            });
        },

        // Handles OTP verification
        handleOTPVerification: function() {
            var self = this;
            if (self.jQuerycheckoutOrderForm.length) {
                self.jQuerycheckoutOrderForm.on("submit", function(e) {
                    e.preventDefault();
                    var jQueryform = jQuery(this);
                    var valid = self._validateForm(jQueryform);

                    if (!valid) {
                        return valid;
                    } else {
                        var phone = jQueryform.find("#phone").val();
                        self.sendOTP(phone);
                    }
                });
            }
        },

        // ...
    };

    // ...

    jQuery(function() {
        var shop = new jQuery.Shop("#site");
    });

})(jQuery);
