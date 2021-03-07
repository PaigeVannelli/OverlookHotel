// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import User from './User'

import fetchData from './get-data'
import BookingsRepo from './BookingsRepo'
import RoomsRepo from './RoomsRepo'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let currentUser
let newRoomsRepo
let newBookingsRepo


const startSearchButton = document.getElementById('startSearchButton')
const searchBookingsButton = document.getElementById('searchBookingsButton')

window.addEventListener('load', displayUserData);
startSearchButton.addEventListener('click', displaySearchForm);
searchBookingsButton.addEventListener('click', searchBookings);


function displayUserData() {
    fetchData()
    .then(allData => {
        currentUser = new User(23, allData.allUserData)
        newBookingsRepo = new BookingsRepo(allData.allBookings)
        newRoomsRepo = new RoomsRepo(allData.allRooms)
        // do I want to move this function into find details below?
        let userBookings = newBookingsRepo.filterByUser(currentUser.id)
        findDetailedUserData(newRoomsRepo, userBookings)
    })
}

function findDetailedUserData(newRoomsRepo, userBookings) {
    let detailedUserBookings = newRoomsRepo.returnDetailedRoomData(userBookings)
    let totalCost = newRoomsRepo.returnTotalCost(userBookings)
    displayBookings(detailedUserBookings)
    displayUserInfo(currentUser, totalCost)
}


function displayBookings(userBookings) {
    userBookings.forEach(booking => {
        displayRoomCards(booking)
    })
}

function displayRoomCards(booking) {
    const userBookingCard = document.getElementById('userBookings')
        userBookingCard.insertAdjacentHTML('beforeend',
        `<article class="room-card" id="${booking.id}">
          <h2>Room Type ${booking.roomType}</h2>
          <p>date: ${booking.date}<p>
          <p>Cost per night: ${booking.costPerNight}<p>
        </article>`
    )
}

function displayUserInfo(currentUser, totalCost) {
    document.getElementById('welcomeText').innerHTML = `Welcome ${currentUser.name}!`
    document.getElementById('totalSpent').innerHTML = `Total Spent:  ${totalCost}`
}


function displaySearchForm() {
    display("searchForm", false);
    display("userBookings", true)
}

function display(element, isHidden) {
    if (isHidden) {
        document.getElementById(element).classList.add('hidden')
    } else {
        document.getElementById(element).classList.remove('hidden')
    }
}

function searchBookings() {
    event.preventDefault()
    let roomType = document.getElementById('roomTypeSearch').value
    let date = document.getElementById('dateInput').value
    filterSearchData(roomType, date)
}

function filterSearchData(roomType, date) {
    let roomsBytype = newRoomsRepo.filterByType(roomType)
    let filteredRooms = newBookingsRepo.filterByRoom(roomsBytype, date)
    let detailedSearchedRooms = newRoomsRepo.returnDetailedRoomData(filteredRooms)
    console.log(detailedSearchedRooms)
    displayAvailableRooms(detailedSearchedRooms, date)
    showSearchData()
}

function displayAvailableRooms(userBookings, date) {
    const userBookingCard = document.getElementById('userBookings')
    userBookingCard.innerHTML = ''
    userBookings.forEach(booking => {
        userBookingCard.insertAdjacentHTML('beforeend',
        `<article class="room-card" id="${booking.id}">
          <h2>Room Number ${booking.number}</h2>
          <h2>Room Type ${booking.roomType}</h2>
          <p>date: ${date}<p>
          <p>bed type: ${booking.bedSize}<p>
          <p>Number of beds: ${booking.numBeds}<p>
          <p>Cost per night: ${booking.costPerNight}<p>
          <button id="${booking.id}">BOOK NOW</button>
        </article>`
        )
    })
}

function showSearchData() {
    display("searchForm", true);
    display("userBookings", false)
}
