// const baseUrl = new URL("http://localhost:4000");
// const baseUrl = new URL("https://portfolio-project-backend-fqo9.onrender.com/api/v1")
// 
const token = window.localStorage.getItem('access_token');
document.querySelector(".post-form").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form submission

  // Get form values
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const country = document.getElementById("country").value;
  const videoLink = document.getElementById("videoUrl").value;

  const payload = {
    property: name,
    price,
    city,
    state,
    country,
    videoUrl: videoLink,
  }

  const postUrl = new URL('/api/v1/posts', baseUrl);

  let response = await fetch(postUrl, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })

  let result = await response.json();

  if (result.status === "success") {
    alertMessage(result.message, result.status)
    window.location.href = "../portfolio-project-frontend/dashboard.html";
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
