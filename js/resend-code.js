const baseUrl = new URL("http://localhost:4000");

document.querySelector(".resend-btn").addEventListener("submit", async function (event) {  
  event.preventDefault(); // Prevent form submission
  const codeUrl = new URL('/api/v1/send-otp', baseUrl);

  const email = window.localStorage.getItem('email');

  console.log(email)
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
  } else {
    alertMessage(resu.message, resu.status)
  }
})
