import {displayError, checkForError} from './get-data'

function postUserBooking(userBooking) {
    return fetch("http://localhost:3001/api/v1/bookings", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBooking),
    })
    .then(response => response.json())
    .then(finalData => {
        return finalData})
    .catch(err => displayError(err))
}

export default postUserBooking
