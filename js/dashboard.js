// const baseUrl = new URL("http://localhost:4000");
// const baseUrl = new URL("https://portfolio-project-backend-fqo9.onrender.com/api/v1")

const postUrl = new URL('/api/v1/posts', baseUrl);

const token = window.localStorage.getItem('access_token');

async function getUserDashboard() {
  const dashboardUrl = new URL(`/api/v1/user/dashboard`, baseUrl);
  let response = await fetch(dashboardUrl, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
  });

  let result = await response.json();

  if (result.status === "success") {
    console.log(result);
    let message = document.querySelector('.welcome-message');
    let email = document.querySelector('.user-email');


    message.textContent = result.message;
    email.textContent = result.data.email;
  } else {
    alertMessage(result.message, result.status);
  }
}

function displayProperties(properties) {
  const propertyList = document.getElementById("property-list");
  propertyList.innerHTML = ""; // Clear existing content

  properties.forEach((property) => {
    const card = document.createElement("div");
    card.classList.add("property-card");

    card.innerHTML = `
      <div class="verified-tag">${property.isVerified ? "✔ Verified" : "Not verified"}</div>
      <div class="${property.status}-tag">${property.status ? "✔ Available" : ""}</div>
      <img src="${property.postImageUrl}">
      <div class="card-content">
        <p class="property-type">Property: ${property.property}</p>
        <p class="price">Price: ${property.price}</p>
        <p class="postal">Posted by: ${property.user.firstName} ${property.user.lastName}</p>
        <p class="address">Address: ${property.city}, ${property.state}, ${property.country}</p>
        <button><a href=${property.videoUrl} target="_blank" class="watch_video">Watch Video</a></button>
        <span class="date">Date posted: ${property.createdAt.split("T")[0]}</span>
      </div>
    `;

    propertyList.appendChild(card);
  });
}

async function getPosts() {
  let response = await fetch(postUrl, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
  });

  let result = await response.json();

  if (result.status === "success") {
    // Call the function to display properties
    console.log(result.data);
    displayProperties(result.data);
  } else {
    alertMessage(result.message, result.status);
  }
}

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

getUserDashboard();
getPosts();
