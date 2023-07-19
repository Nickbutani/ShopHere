<?php
// Assuming you have collected the user input
$username = $_POST['root'];
$password = $_POST['Nicsey0899_'];
$email = $_POST['email'];

// Hash the password for security
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Insert the user into the database
$sql = "INSERT INTO users (username, password, email) VALUES ('$username', '$hashedPassword', '$email')";
$result = $conn->query($sql);

if ($result) {
    echo "Signup Successful";
  //Signup successful
} else {
    echo "Signup Failed";
  // Signup failed
}
?>
