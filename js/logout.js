const baseUrl = new URL("http://localhost:4000");
// const baseUrl = new URL("https://portfolio-project-backend-fqo9.onrender.com/api/v1")

document.getElementById("logout-button").addEventListener("click", async function (event) {

  const body = {
  }

  const logoutUrl = new URL('/api/v1/user/logout', baseUrl);

  const token = window.localStorage.getItem('access_token');

  let response = await fetch(logoutUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(body)
  })

  let result = await response.json();

  if (result.status === "success") {
    alertMessage(result.message, result.status)
    window.localStorage.removeItem('access_token')
    window.location.href = "../portfolio-project-frontend/login.html";
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
  setTimeout(() => div.remove(), 10000);
}
