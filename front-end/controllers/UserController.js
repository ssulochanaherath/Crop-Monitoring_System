$(window).on("hashchange", function () {
    if (window.location.hash === "#dashboard-section") {
      $("#dashboard-section").css("display", "block");
      $("#login-section").css("display", "none");
      // Hide other sections
    }
  });

function signUp() {
  var email = $("#register_email").val();
  var password = $("#register_password").val();
  var role = $("#register_role").val();

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/auth/signup",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      email: email,
      password: password,
      role: role,
    }),
    success: (response) => {
      alert("signup success");
      console.log("Signup successful:", response);
      localStorage.setItem("token", response.token);
      window.location.href = "#dashboard-section";
    },
    error: (error) => {
      alert("signup failed");
      console.error("Signup failed:", error);
      console.error("Token is missing in the response");
      alert("Signup successful, but token is missing.");
    },
  });
}

function userLogin() {
  var email = $("#login_email").val();
  var password = $("#login_password").val();

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/auth/signin",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      email: email,
      password: password
    }),
    success: (response) => {
      alert("Login success");
      console.log("Signup successful:", response);
      localStorage.setItem("token", response.token);
      window.location.href = "#dashboard-section";
    },
    error: (error) => {
      alert("login failed");
      console.error("Signup failed:", error);
      alert("Signup failed. Please check your input and try again.");
    },
  });
}
