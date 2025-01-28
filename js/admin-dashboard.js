// const baseUrl = new URL("http://localhost:4000");
// const baseUrl = new URL("https://portfolio-project-backend-fqo9.onrender.com/api/v1")

const postUrl = new URL('/api/v1/posts', baseUrl);

const token = window.localStorage.getItem('access_token');

function displayPosts(posts) {
  const postList = document.getElementById("post-list");
  postList.innerHTML = ""; // Clear existing content

  posts.forEach((property) => {
    const card = document.createElement("div");
    card.classList.add("post-card");

    card.innerHTML = `
      <a href="#postModal1" class="post-link">
        <div class="post-header">
          <p><strong>${property.user.firstName}</strong></p>
          <p><small>Posted on ${property.createdAt.split("T")[0]}</small></p>
        </div>
        <div class="post-content">
          <p class="property-type">Property: ${property.property}</p>
          <p class="price">Price: &#8358;${property.price}</p>
          <p class="address">Address: ${property.city}, ${property.state}, ${property.country}</p>
          <button><a href=${property.videoUrl} target="_blank" class="watch_video">Watch Video</a></button>
        </div>
      </a>
      <div class="post-footer">
        <label>
          <input type="radio" name="post1" class="approve-checkbox"> Approve
        </label>
        <label>
          <input type="radio" name="post1" class="reject-checkbox"> Reject
        </label>
        <button type="submit" class="verify-btn">submit</button>
      </div>
    `;

    postList.appendChild(card);
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
    displayPosts(result.data);
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

getPosts();
