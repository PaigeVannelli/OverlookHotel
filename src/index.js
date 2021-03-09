import User from './User'
import {fetchData} from './get-data'
import BookingsRepo from './BookingsRepo'
import RoomsRepo from './RoomsRepo'
import postUserBooking from './post-data'
import getUserData from './get-user-data'

import './css/base.scss';

import './images/turing-logo.png'
import './images/single.jpg'
import './images/juniorSuite.jpg'
import './images/suite.jpg'
import './images/residentialSuite.jpg'

let currentUser
let newRoomsRepo
let newBookingsRepo
let searchDate
let today

const searchBookingsButton = document.getElementById('searchBookingsButton')
const allRooms = document.getElementById('allRooms')
const previousBookings = document.getElementById('previousBookings')
const loginButton = document.getElementById('loginButton')
const userProfileButton = document.getElementById('userProfileButton')

window.addEventListener('load', getToday)
searchBookingsButton.addEventListener('click', searchBookings);
allRooms.addEventListener('click', bookRoom)
loginButton.addEventListener('click', userLogin)
userProfileButton.addEventListener('click', displayUserPage)

function getToday() {
    let unformattedToday = new Date
    let stringToday = unformattedToday.toLocaleDateString("fr-CA", {
        year: "numeric", 
        month: "2-digit",
        day: "2-digit"
    })
    document.getElementById('dateInput').setAttribute('min', stringToday)
    today = stringToday.split('-').join('/')
}

function userLogin() {
    event.preventDefault()
    display('loginError', true)
    const username = document.getElementById('usernameInput').value
    const id = parseInt(username.split('r')[1])
    const password = document.getElementById('passwordInput').value
    validateLogin(username, password, id)
}

function validateLogin(username, password, id) {
    if (username === `customer${id}` && id >= 1 && id <= 50) {
        if (password === "overlook2021") {
            getUserData(id)
            .then(userData => {
                displayUserData((userData.id))
            })
        } else {
            display('loginError', false)
            document.getElementById('loginError').innerText = 'Incorrect Password'
        }
    } else {
        display('loginError', false)
        document.getElementById('loginError').innerText = 'Incorrect Username'
    }
}

function displayUserData(id) {
    console.log("display")
    hideLoginPage()
    fetchData()
    .then(allData => {
        currentUser = new User(id, allData.allUserData)
        newBookingsRepo = new BookingsRepo(allData.allBookings)
        newRoomsRepo = new RoomsRepo(allData.allRooms)
        let userBookings = newBookingsRepo.filterByUser(currentUser.id)
        currentUser.userBookings = userBookings
        findDetailedUserData(newRoomsRepo, userBookings)
    })
}

function hideLoginPage() {
    display('loginForm', true)
    display('searchForm', false)
    display('userDetails', false)
    display('roomsDisplay', false)
}

function findDetailedUserData(newRoomsRepo, userBookings) {
    let detailedUserBookings = newRoomsRepo.returnDetailedRoomData(userBookings)
    let totalCost = newRoomsRepo.returnTotalCost(userBookings)
    displayBookings(detailedUserBookings)
    displayUserInfo(currentUser, totalCost)
}


function displayBookings(userBookings) {
    checkRoomType(userBookings)
    let upcoming = []
    let previous = []
    userBookings.forEach(booking => {
        if (booking.date >= today) {
            upcoming.push(booking)
        } else {
            previous.push(booking)
        }
        display('noUpcomingReservations', true)
        displayUpcoming(upcoming)
        displayPreviousBookings(previous)
    })
}

function checkRoomType(userBookings) {
    userBookings.forEach(booking => {
        if (booking.roomType === 'single room') {
            booking.roomImage = './images/single.jpg'
            booking.imageAlt = 'image of a single room overlooking pool'
        } else if (booking.roomType === 'junior suite') {
            booking.roomImage = './images/juniorSuite.jpg'
            booking.imageAlt = 'image of a junior suite overlooking ocean'
        } else if (booking.roomType === 'suite') {
            booking.roomImage = './images/suite.jpg'
            booking.imageAlt = 'image of a regualr suite overlooking ocean'
        } else if (booking.roomType === 'residential suite') {
            booking.roomImage = './images/residentialSuite.jpg'
            booking.imageAlt = 'image of a residential suite with sitting room'
        }
    })
}

function displayUpcoming(upcoming) {
    allRooms.innerHTML = ''
    upcoming.forEach(booking => {
        allRooms.insertAdjacentHTML('beforeend',
            `<article class="room-card" id="${booking.id}">
            <img class="room-image" src="${booking.roomImage}" alt="${booking.imageAlt}">
            <h2 class="title card-title">#${booking.roomNumber} ${booking.roomType}</h2>
            <div class="card-text-container">
                <p class="card-text">date: ${booking.date}<p>
                <p class="card-text">${booking.numBeds} ${booking.bedSize}<p>
                <p class="card-text">$${booking.costPerNight} total<p>
            </div>
            </article>`
        )
    })
}

function displayPreviousBookings(previous) {
    previousBookings.innerHTML = ''
    previous.forEach(booking => {
        previousBookings.insertAdjacentHTML('beforeend',
                `<article class="room-card" id="${booking.id}">
                <img class="room-image" src="${booking.roomImage}" alt="${booking.imageAlt}">
                <h2 class="title card-title">#${booking.roomNumber} ${booking.roomType}</h2>
                <div class="card-text-container">
                    <p class="card-text">date: ${booking.date}<p>
                    <p class="card-text">${booking.numBeds} ${booking.bedSize}<p>
                    <p class="card-text">$${booking.costPerNight} total<p>
                </div>
                </article>`
            )
    })
}

function displayUserInfo(currentUser, totalCost) {
    document.getElementById('userProfileButton').innerHTML = `${currentUser.name}`
    document.getElementById('totalSpent').innerHTML = `Total Spent:  $${totalCost}`
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
    searchRooms(searchDate, roomType)
}

function searchRooms(date, roomType) {
    let filteredRoomsByDate = newBookingsRepo.filterByDate(newRoomsRepo.allRooms, date)
    let filteredRoomsByType = newBookingsRepo.filterByType(filteredRoomsByDate, roomType)
    if (!date) {
        display('searchError', false)
    } else {
        display('searchError', true)
        displayRooms(filteredRoomsByType, date)
    }
}

function displayRooms(filteredRoomsByType, date) {
    if (filteredRoomsByType === 'no available rooms') {
        allRooms.innerHTML = 'All rooms boooked, please try adjusting search'
    } else {
        let detailedSearchedRooms = newRoomsRepo.returnDetailedRoomData(filteredRoomsByType)
        displayAvailableRooms(detailedSearchedRooms, date)
    }
    showSearchData()
}

function displayAvailableRooms(userBookings, date) {
    checkRoomType(userBookings)
    allRooms.innerHTML = ''
    userBookings.forEach(booking => {
        allRooms.insertAdjacentHTML('beforeend',
        `<article class="room-card" id="${booking.id}">
          <img class="room-image" src="${booking.roomImage}" alt="${booking.imageAlt}">
          <h2 class="title card-title">#${booking.number} ${booking.roomType}</h2>
          <div class="card-text-container">
          <p class="card-text">${date}<p>
          <p class="card-text">${booking.numBeds} ${booking.bedSize}<p>
          <p class="card-text">$${booking.costPerNight} total<p>
          <button id="bookNowButton+${booking.number}">BOOK NOW</button>
          </div>
          </article>`
          )
        })
}

function showSearchData() {
    document.getElementById('pageTitle').innerHTML = 'Available Rooms'
    display("allRooms", false)
    display("previousBookings", true)
    display('previousBookingsTitle', true)
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
        let userBookingArray = []
        userBookingArray.push(userBooking)
        let detailedConfirmation = newRoomsRepo.returnDetailedRoomData(userBookingArray)
        checkRoomType(detailedConfirmation)
        displayConfirmation(confirmation, detailedConfirmation[0])
        currentUser.bookRoom(confirmation.newBooking)
    })
}

function displayConfirmation(confirmation, detailedConfirmation) {
    document.getElementById('pageTitle').innerHTML = 'Room Booked'
    allRooms.innerHTML = ''
    allRooms.insertAdjacentHTML('beforeend',
        `<article class="booking-confirmation" id="${confirmation.newBooking.id}">
        <img class="room-image" src="${detailedConfirmation.roomImage}" alt="${detailedConfirmation.imageAlt}">
        <p class="title card-title">Congratulations! Your booking was successful. See confirmation details below:</p>
        <h2 class="title card-title">Confirmation Number: ${confirmation.newBooking.id}</h2>
        <div class="card-text-container">
            <h2 class="card-text">#${confirmation.newBooking.roomNumber} ${detailedConfirmation.roomType}</h2>
            <p class="card-text">${searchDate}<p>
            <p class="card-text">${detailedConfirmation.numBeds} ${detailedConfirmation.bedSize}<p>
            <p class="card-text">$${detailedConfirmation.costPerNight} total<p>
          </div>
        </article>`
    )
}
function displayUserPage() {
    document.getElementById('pageTitle').innerHTML = 'Upcoming Reservations'
    display("previousBookings", false)
    display('previousBookingsTitle', false)
    displayUserData(currentUser.id)
}