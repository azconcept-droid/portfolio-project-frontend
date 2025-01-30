const token = window.localStorage.getItem('access_token');

  const dashboardUrl = new URL(`/api/v1/user/dashboard`, baseUrl);
  let response = await fetch(dashboardUrl, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
  });

  let result = await response.json();
async function getUserProfile() {

  if (result.status === "success") {
    let avatar = document.querySelector('.avatar');
    let firstName = document.querySelector('.firstName');
    let lastName = document.querySelector('.lastName');
    let email = document.querySelector('.email');
    let phoneNumber = document.querySelector('.phoneNumber');
    let gender = document.querySelector('.gender');
    let bio = document.querySelector('.bio');
    let occupation = document.querySelector('.occupation');
    let yearsOfExperience =document.querySelector('.experience');
    let city = document.querySelector('.city');
    let state = document.querySelector('.state');
    let country = document.querySelector('.country')

    avatar.textContent = result.data.avatar;
    firstName.textContent = result.data.firstName;
    lastName.textContent = result.data.lastName;
    email.textContent = result.data.email;
    phoneNumber.textContent = result.data.phoneNumber;
    gender.textContent = result.data.gender;
    bio.textContent = result.data.bio;
    occupation.textContent = result.data.occupation;
    yearsOfExperience.textContent = result.data.yearsOfExperience;
    city.textContent = result.data.city;
    state.textContent = result.data.state;
    country.textContent = result.data.country;

  } else {
    alertMessage(result.message, result.status);
  }
}

// Get references to the modal and close button
const modal = document.querySelector('.modal');
const closeModal = document.getElementById('closeModal');

// Function to close the modal
const hideModal = () => {
  modal.classList.add('hidden');
};

// Attach event listener to the close button
closeModal.addEventListener('click', hideModal);

// Optional: Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

async function updateUserProfile(id){
  document.querySelector(".profile-form").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const country = document.getElementById("country").value;
    const phoneNumber = document.getElementById('phone').value;
    let gender = document.getElementById('option').value;
    let bio = document.getElementById('bio').value;
    let occupation = document.getElementById('occupation').value;
    let yearsOfExperience =document.querySelector('yearsOfExperience').value;

    const payload = {
      firstName,
      lastName,
      phoneNumber,
      gender,
      bio,
      occupation,
      yearsOfExperience,
      price,
      city,
      state,
      country,
    }

    const editUserUrl = new URL(`/api/v1/users/:${id}`, baseUrl);

    let response = await fetch(editUserUrl, {
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
  });
}

getUserProfile();
updateUserProfile(result.data.id)
