// const baseUrl = new URL("http://localhost:4000");
// const baseUrl = new URL("https://portfolio-project-backend-fqo9.onrender.com/api/v1")

const postUrl = new URL('/api/v1/posts', baseUrl);

const token = window.localStorage.getItem('access_token');

async function displayPosts(posts) {
  const postList = document.getElementById("post-list");
  postList.innerHTML = ""; // Clear existing content

  posts.forEach((property) => {
    const card = document.createElement("div");
    card.classList.add("post-card");

    const postLink = document.createElement("a");
    postLink.href = "#postModal1";
    postLink.classList.add("post-link");

    const postLinkHeader = document.createElement("div");
    postLinkHeader.classList.add("post-header");

    const postLinkHeaderPara1 = document.createElement("p");
    postLinkHeaderPara1.innerHTML = `<strong>${property.user.firstName} ${property.user.lastName}</strong>`

    const postLinkHeaderPara2 = document.createElement("p");
    postLinkHeaderPara2.innerHTML = `<small>Posted on ${property.createdAt.split("T")[0]}</small>`
    
    postLinkHeader.appendChild(postLinkHeaderPara1);
    postLinkHeader.appendChild(postLinkHeaderPara2);

    const postContentDiv = document.createElement("div");
    postContentDiv.classList.add("post-content");

    const postContentDivPara1 = document.createElement("p");
    postContentDivPara1.classList.add("property-type")
    postContentDivPara1.innerHTML = `Property: ${property.property}`;

    const postContentDivPara2 = document.createElement("p");
    postContentDivPara2.classList.add("price")
    postContentDivPara2.innerHTML = `Price: &#8358;${property.price}`;

    const postContentDivPara3 = document.createElement("p");
    postContentDivPara3.classList.add("address")
    postContentDivPara3.innerHTML = `Address: ${property.city}, ${property.state}, ${property.country}`;

    postContentDiv.appendChild(postContentDivPara1)
    postContentDiv.appendChild(postContentDivPara2)
    postContentDiv.appendChild(postContentDivPara3)

    postLink.appendChild(postLinkHeader)
    postLink.appendChild(postContentDiv)

    const postFooter = document.createElement("div");
    postFooter.classList.add("post-footer");

    const approveBtn = document.createElement("button");
    approveBtn.classList.add("approved")
    approveBtn.textContent = "Approve";
    approveBtn.addEventListener("click", () => updateStatus(property.id, "approved"));

    const rejectBtn = document.createElement("button");
    rejectBtn.classList.add("rejected")
    rejectBtn.textContent = "Reject";
    rejectBtn.addEventListener("click", () => updateStatus(property.id, "rejected"));

    postFooter.appendChild(approveBtn)
    postFooter.appendChild(rejectBtn)

    card.appendChild(postLink);
    card.appendChild(postFooter);

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
    // Call the function to display posts
    displayPosts(result.data);
  } else { 
    alertMessage(result.message, result.status);
  }
}

// Function to update post status
async function updateStatus(postId, status) {
  let isVerified = (status === "approved") ? true : false;

  console.log(postId, status)

  const payload = {
    id: postId,
    isVerified,
  }

  const approveUrl = new URL('/api/v1/posts/approved', baseUrl);

  let response = await fetch(approveUrl, {
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
  } else {
    alertMessage(result.message, result.status)
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
