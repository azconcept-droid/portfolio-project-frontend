const token = window.localStorage.getItem('access_token');

async function getUserProfile() {
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
    console.log(result.data.state)
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

getUserProfile();
