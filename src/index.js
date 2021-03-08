// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
import User from './User'
import fetchData from './get-data'
import BookingsRepo from './BookingsRepo'
import RoomsRepo from './RoomsRepo'
import postUserBooking from './post-data'
import getUserData from './get-user-data'
// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
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
    today = stringToday.split('-').join('/')
}

function userLogin() {
    event.preventDefault()
    display('loginError', true)
    const username = document.getElementById('usernameInput').value
    let id = parseInt(username.split('r')[1])
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

displayUserData(14)

function displayUserData(id) {
    console.log("display")
    hideLoginPage()
    fetchData()
    .then(allData => {
        currentUser = new User(id, allData.allUserData)
        newBookingsRepo = new BookingsRepo(allData.allBookings)
        newRoomsRepo = new RoomsRepo(allData.allRooms)
        // do I want to move this function into find details below?
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
        } else if (booking.roomType === 'junior suite') {
            booking.roomImage = './images/juniorSuite.jpg'
        } else if (booking.roomType === 'suite') {
            booking.roomImage = './images/suite.jpg'
        } else if (booking.roomType === 'residential suite') {
            booking.roomImage = './images/residentialSuite.jpg'
        }
        console.log(booking)
    })
}

function displayUpcoming(upcoming) {
    allRooms.innerHTML = ''
    upcoming.forEach(booking => {
        allRooms.insertAdjacentHTML('beforeend',
            `<article class="room-card" id="${booking.id}">
            <img class="room-image" src="${booking.roomImage}">
            <div class="card-text-container">
                <h2 class="title card-text">#${booking.roomNumber} ${booking.roomType}</h2>
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
                <img class="room-image" src="${booking.roomImage}">
                <div class="card-text-container">
                    <h2 class="title card-text">#${booking.roomNumber} ${booking.roomType}</h2>
                    <p class="card-text">date: ${booking.date}<p>
                    <p class="card-text">${booking.numBeds} ${booking.bedSize}<p>
                    <p class="card-text">$${booking.costPerNight} total<p>
                </div>
                </article>`
            )
    })
}

function displayUserInfo(currentUser, totalCost) {
    document.getElementById('welcomeText').innerHTML = `${currentUser.name}`
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
          <img class="room-image" src="${booking.roomImage}">
          <div class="card-text-container">
          <h2 class="title card-text">#${booking.number} ${booking.roomType}</h2>
          <p class="card-text">${date}<p>
          <p class="card-text">${booking.numBeds} ${booking.bedSize}<p>
          <p class="card-text">$${booking.costPerNight} total<p>
          <button id="bookNowButton+${booking.number}">BOOK NOW</button>
          </div>
          </article>`
          )
        })
        // <h2 class="title card-text room-number">#${booking.number}</h2>
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
        document.getElementById('pageTitle').innerHTML = 'Room Booked'
        allRooms.innerHTML = ''
        allRooms.insertAdjacentHTML('beforeend',
            `<article class="room-card booking-confirmation" id="${confirmation.newBooking.id}">
            <p class="title card-text">Congratulations! Your booking was successful. See confirmation details below:</p>
            <h2 class="card-text">Room Number: ${confirmation.newBooking.roomNumber}</h2>
            <h2 class="card-text">Confirmation Number: ${confirmation.newBooking.id}</h2>
            <p class="card-text">date: ${searchDate}<p>
            </article>`
        )
        currentUser.userBookings.push(confirmation.newBooking)
    })
}

function displayUserPage() {
    document.getElementById('pageTitle').innerHTML = 'Upcoming Reservations'
    display("previousBookings", false)
    display('previousBookingsTitle', false)
    displayUserData(currentUser.id)
}