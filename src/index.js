// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import User from './User'

import fetchData from './get-data'
import BookingsRepo from './BookingsRepo'
import RoomsRepo from './RoomsRepo'
import postUserBooking from './post-data'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'

let currentUser
let newRoomsRepo
let newBookingsRepo
let searchDate


const startSearchButton = document.getElementById('startSearchButton')
const searchBookingsButton = document.getElementById('searchBookingsButton')
// const userBookingCard = document.getElementById('userBookings')
// const searchedRooms = document.getElementById('searchedRooms')
// const roomsDisplay = document.getElementById('roomsDisplay')
const allRooms = document.getElementById('allRooms')


window.addEventListener('load', displayUserData);
startSearchButton.addEventListener('click', displaySearchForm);
searchBookingsButton.addEventListener('click', searchBookings);
allRooms.addEventListener('click', bookRoom)



function displayUserData() {
    fetchData()
    .then(allData => {
        currentUser = new User(23, allData.allUserData)
        newBookingsRepo = new BookingsRepo(allData.allBookings)
        newRoomsRepo = new RoomsRepo(allData.allRooms)
        // do I want to move this function into find details below?
        let userBookings = newBookingsRepo.filterByUser(currentUser.id)
        currentUser.userBookings = userBookings
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
    // const userBookingCard = document.getElementById('userBookings')
        allRooms.insertAdjacentHTML('beforeend',
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
    document.getElementById('pageTitle').innerHTML = ''
    display("searchForm", false);
    display("allRooms", true)
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
    searchDate = document.getElementById('dateInput').value
    // filterSearchData(roomType, searchDate)
    searchRooms(searchDate, roomType)
}

function searchRooms(date, roomType) {
    let filteredRoomsByDate = newBookingsRepo.filterByDate(newRoomsRepo.allRooms, date)
    let filteredRoomsByType = newBookingsRepo.filterByType(filteredRoomsByDate, roomType)
    let detailedSearchedRooms = newRoomsRepo.returnDetailedRoomData(filteredRoomsByType)
    displayAvailableRooms(detailedSearchedRooms, date)
    showSearchData()
}

function displayAvailableRooms(userBookings, date) {
    // const userBookingCard = document.getElementById('userBookings')
    allRooms.innerHTML = ''
    userBookings.forEach(booking => {
        allRooms.insertAdjacentHTML('beforeend',
        `<article class="room-card" id="${booking.id}">
          <h2>Room Number ${booking.number}</h2>
          <h2>Room Type ${booking.roomType}</h2>
          <p>date: ${date}<p>
          <p>bed type: ${booking.bedSize}<p>
          <p>Number of beds: ${booking.numBeds}<p>
          <p>Cost per night: ${booking.costPerNight}<p>
          <button id="bookNowButton+${booking.number}">BOOK NOW</button>
        </article>`
        )
    })
}

function showSearchData() {
    document.getElementById('pageTitle').innerHTML = 'Available Rooms'
    display("allRooms", false)
}

function bookRoom(event) {
    if (event.target.id.includes("bookNowButton")) {
        const roomNumber = parseInt(event.target.id.split('+')[1])
        const dateReformat = searchDate.split('-').join('/')
        postBooking(roomNumber, dateReformat)
    }
}

function postBooking(roomNumber, dateReformat) {
    let userBooking = {
        "userID": currentUser.id,
        "date": dateReformat, 
        "roomNumber": roomNumber
    }

    postUserBooking(userBooking)
    .then(confirmation => {
        document.getElementById('pageTitle').innerHTML = 'Room Booked'
        allRooms.innerHTML = ''
        allRooms.insertAdjacentHTML('beforeend',
            `<article class="room-card booking-confirmation" id="${confirmation.newBooking.id}">
            <p>Congratulations! Your booking was successful. See confirmation details below:</p>
            <h2>Room Number: ${confirmation.newBooking.roomNumber}</h2>
            <h2>Confirmation Number: ${confirmation.newBooking.id}</h2>
            <p>date: ${searchDate}<p>
            </article>`
        )
        currentUser.userBookings.push(confirmation.newBooking)
    })
}
