const baseUrl = new URL("http://localhost:4000");
// const baseUrl = new URL("https://portfolio-project-backend-fqo9.onrender.com/api/v1")


document.getElementById("verify-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form submission
  // Get form values
  const code = document.getElementById("verification-code").value;
  // get email from local storage
  const email = window.localStorage.getItem('email');

  console.log(email, code)
  const body = {
    email,
    token: code,
  }

  const codeUrl = new URL('/api/v1/verify-otp', baseUrl);

  let response = await fetch(codeUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

  let result = await response.json();

  if (result.status === "success") {
    alertMessage(result.message, result.status)
    window.location.href = "../portfolio-project-frontend/congrats.html";
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
