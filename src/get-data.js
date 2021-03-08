// import {checkForError} from './post-data'

const fetchData = () => {
    let allUserData =  fetch("http://localhost:3001/api/v1/customers")
        .then(response => response.json())
        .then(userData => {
            return userData
        })
        .catch(err => displayError(err))

    let allRooms = fetch("http://localhost:3001/api/v1/rooms")
        // .then(checkForError)
        .then(response => response.json())
        .then(roomsData => {
            return roomsData;
        })
        .catch(err => displayError(err))

    let allBookings = fetch("http://localhost:3001/api/v1/bookings")
        .then(response => response.json())
        .then(bookingsData => {
            return bookingsData;
        })
        .catch(err => displayError(err))

        return Promise.all([allUserData, allRooms, allBookings])
        .then(data => {
          let allData = {}
          allData.allUserData = data[0].customers;
          allData.allRooms = data[1].rooms;
          allData.allBookings = data[2].bookings;
          return allData;
        });
}

export const displayError = (errorMessage) => {
    const errorDisplay =  document.getElementById('errorDisplay');
    const message = errorMessage.message === 'Failed to fetch' ?
      "Internet connection may be unstable. Check again in a moment please." : errorMessage
      errorDisplay.innerText = message;
}

export default fetchData