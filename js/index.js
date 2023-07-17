const accountSid = "ACeda057fe19bbc039cf27e9862a583bb7";
const authToken = "8ef78ed222129d4ca3c35130996e39d0";
const verifySid = "VAd9d865049c5a28e2a51d2a9acdd6067c";
const client = require("twilio")(accountSid, authToken);

// Function to send an SMS verification
function sendVerification(to) {
  return client.verify
    .services(verifySid)
    .verifications.create({ to: to, channel: "sms" })
    .then((verification) => {
      console.log("Verification status:", verification.status);
      return verification;
    })
    .catch((error) => {
      console.error("Error sending verification:", error);
      throw error;
    });
}

// Function to check the verification status
function checkVerification(to, code) {
  return client.verify
    .services(verifySid)
    .verificationChecks.create({ to: to, code: code })
    .then((verificationCheck) => {
      console.log("Verification check status:", verificationCheck.status);
      return verificationCheck;
    })
    .catch((error) => {
      console.error("Error checking verification:", error);
      throw error;
    });
}

// Example usage
const phoneNumber = "+15707039829"; // Replace with the phone number entered by the user

// Send the SMS verification
sendVerification(phoneNumber)
  .then(() => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question("Please enter the OTP:", (otpCode) => {
      // Check the verification status
      checkVerification(phoneNumber, otpCode)
        .then(() => {
          console.log("Verification successful");
          readline.close();
        })
        .catch(() => {
          console.log("Verification failed");
          readline.close();
        });
    });
  })
  .catch((error) => {
    console.error("Error sending verification:", error);
  });
