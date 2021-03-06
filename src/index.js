// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import User from './User'
import Room from './Room'
import fetchData from './get-data'
import BookingsRepo from './BookingsRepo'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let currentUser

window.addEventListener('load', displayUserData)


function displayUserData() {
    fetchData()
    .then(allData => {
        currentUser = new User(5, allData.allUserData)
        let newBookingsRepo = new BookingsRepo(allData.allBookings)
        let userBookings = newBookingsRepo.filterByUser(currentUser.id)
        displayBookings(userBookings)
    })
}


function displayBookings(userBookings) {
    userBookings.forEach(booking => {
        displayRoomCards(booking)
    })
}

function displayRoomCards(booking) {
    const userBookingCard = document.getElementById('userBookings')
        userBookingCard.insertAdjacentHTML('beforeend',
        `<article class="room-card id="${booking.id}">
          <h2>Room Type</h2>
          <p>date: ${booking.date}<p>
          <p>Total Cost<p>
        </article>`
    )
}

