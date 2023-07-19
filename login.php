<?php
// Assuming you have collected the user input
$username = $_POST['root'];
$password = $_POST['Nicsey0899_'];

// Retrieve the user from the database
$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows == 1) {
  // User found
  $user = $result->fetch_assoc();
  $hashedPassword = $user['password'];

  // Verify the password
  if (password_verify($password, $hashedPassword)) {
    // Login successful
    session_start();
    $_SESSION['username'] = $username; // Store username in session for later use
    header("Location: dashboard.php"); // Redirect to dashboard or any other authorized page
    exit();
  } else {
    // Incorrect password
    echo "Incorrect password";
  }
} else {
  // User not found
  echo "User not found";
}
?>
