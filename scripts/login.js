function validation() {
    var user = document.getElementById("user").value;
    var pass = document.getElementById("pass").value;

    if (user == "") {
      document.getElementById("username").innerHTML =
        " ** Please fill the username field";
      return false;
    }
    if (user.length <= 2 || user.length > 20) {
      document.getElementById("username").innerHTML =
        " ** Username lenght must be between 2 and 20";
      return false;
    }
    if (!isNaN(user)) {
      document.getElementById("username").innerHTML =
        " ** only characters are allowed";
      return false;
    }

    if (pass == "") {
      document.getElementById("passwords").innerHTML =
        " ** Please fill the password field";
      return false;
    }
    if (pass.length <= 5 || pass.length > 20) {
      document.getElementById("passwords").innerHTML =
        " ** Passwords lenght must be between  5 and 20";
      return false;
    }

    if (pass != confirmpass) {
      document.getElementById("confirmpass").innerHTML =
        " ** Password does not match the confirm password";
      return false;
    }
   fetch("http://<EC2-public-ip>:3000/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: user, password: pass })
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Response:", data);
      alert("Login Successful!");
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Login Failed. Please try again.");
    });

  return false; // Prevent default form submission
}