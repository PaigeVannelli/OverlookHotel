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

let currentUser
let newRoomsRepo
let newBookingsRepo
let searchDate
let today
// let roomImage = 'data:image/jpeg;base64,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'

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
    let roomImage
    let upcoming = []
    let previous = []
    userBookings.forEach(booking => {
        if (booking.date >= today) {
            upcoming.push(booking)
        } else {
            previous.push(booking)
        }
        display('noUpcomingReservations', true)
        displayUpcoming(upcoming, roomImage)
        displayPreviousBookings(previous, roomImage)
    })
    // allRooms.innerHTML = ''
    // userBookings.forEach(booking => {
    //     if (booking.roomType === 'single room') {
    //         roomImage = ''
    //     } else if (booking.roomType === 'junior suite') {

    //     } else if (booking.roomType === 'suite') {

    //     } else if (booking.roomType === 'residential suite') {

    //     }
    //     // displayRoomCards(booking, roomImage)
    //     checkBookings(booking, roomImage)
    // })
}

function displayUpcoming(upcoming, roomImage) {
    allRooms.innerHTML = ''
    // const displaySection = document.getElementById(`${element}`)
    upcoming.forEach(booking => {
        allRooms.insertAdjacentHTML('beforeend',
            `<article class="room-card" id="${booking.id}">
            <h2 class="title card-text">${booking.roomType}</h2>
            <p class="card-text">date: ${booking.date}<p>
            <p class="card-text">$${booking.costPerNight} total<p>
            </article>`
        )
    })
        // <img class="roomImage" src="./images/turing-logo.png">
}

function displayPreviousBookings(previous, roomImage) {
    previousBookings.innerHTML = ''
    previous.forEach(booking => {
        previousBookings.insertAdjacentHTML('beforeend',
                `<article class="room-card" id="${booking.id}">
                <h2 class="title card-text">${booking.roomType}</h2>
                <p class="card-text">date: ${booking.date}<p>
                <p class="card-text">$${booking.costPerNight} total<p>
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
    allRooms.innerHTML = ''
    userBookings.forEach(booking => {
        allRooms.insertAdjacentHTML('beforeend',
        `<article class="room-card" id="${booking.id}">
          <h2 class="title card-text room-number">#${booking.number}</h2>
          <h2 class="title card-text">${booking.roomType}</h2>
          <p class="card-text">${date}<p>
          <p class="card-text">${booking.numBeds} ${booking.bedSize}<p>
          <p class="card-text">$${booking.costPerNight} total<p>
          <button id="bookNowButton+${booking.number}">BOOK NOW</button>
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