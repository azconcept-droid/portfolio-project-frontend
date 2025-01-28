const baseUrl = new URL("http://localhost:4000");
// const baseUrl = new URL("https://portfolio-project-backend-fqo9.onrender.com/api/v1")

document.getElementById("signup-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-pass").value;
  const agreedToTerms = document.getElementById("agreedToTerms").checked;

  const user = {
    email,
    password,
    confirmPassword
  }

  const signupUrl = new URL('/api/v1/user/signup', baseUrl);

  let response = await fetch(signupUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })

  let result = await response.json();

  if (result.status === "success") {
    alertMessage(result.message, result.status)
    const codeUrl = new URL('/api/v1/send-otp', baseUrl);

    let res = await fetch(codeUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    let resu = await res.json();

    if(resu.status === "success") {
      alertMessage(resu.message, resu.status)
      window.localStorage.setItem('email', email);
      window.location.href = "../portfolio-project-frontend/verificationpage.html";
    } else {
      alertMessage(resu.message, resu.status)
    }
  } else {
    alertMessage(result.message, result.status)
  }
});

function alertMessage(message, status) {
  let div = document.createElement('div');
  if (status === "success") {
    div.className = "alert-success";
  } else {
    div.className = "alert-failure";
  }
  div.innerHTML = `<strong>${status}!</strong> ${message}`;

  document.body.append(div);
  setTimeout(() => div.remove(), 5000);
}
