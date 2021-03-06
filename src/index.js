// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import User from './User'
import Room from './Room'
import fetchData from './get-data'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let currentUser

window.addEventListener('load', displayUserData)


function displayUserData() {
    fetchData()
    .then(allData => {
        currentUser = new User(17, allData.allUserData, allData.allBookings)
        displayBookings(currentUser)
    })
}


function displayBookings(currentUser) {
    const userBookingCard = document.getElementById('userBookings')
    const usersBookings = currentUser.userBookings.forEach(booking => {
        console.log(booking)
         userBookingCard.insertAdjacentHTML('beforeend',
        `<article class="room-card id="${booking.id}">
          <h2>Room Type</h2>
          <p>date: ${booking.date}<p>
          <p>Total Cost<p>
        </article>`
    )
    })
}

function displayRoomCard() {
    const userBookingCard = document.getElementById('userBookings')
    userBookingCard.insertAdjacentHTML('beforeend',
        `<article class="room-card id="test">
          <h2>Room Type</h2>
          <p>Booking Date<p>
          <p>Total Cost<p>
        </article>`
    )
}

// const userBookingCard = document.getElementById('userBookings')
// userBookingCard.insertAdjacentHTML('beforeend',
//     `<article class="room-card" id="${booking.id}>
//       <h2>Room Type</h2>
//       <p>${booking.date}<p>
//       <p>Total Cost<p>
//     </article>`
// )