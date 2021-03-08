import displayError from './get-data'

function postUserBooking(userBooking) {
    return fetch("http://localhost:3001/api/v1/bookings", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBooking),
    })
    // .then(checkForError)
    .then(response => response.json())
    .then(finalData => {
        return finalData})
    .catch(err => displayError(err))
}

const checkForError = response => {
    if (!response.ok) {
        document.getElementById('errorDisplay400').innerText = `${response.status} Please check all fields are filled out`
        throw new Error('Please check all fields are filled out');
    } else {
        return response.json();
    }
}

export default postUserBooking

// export default checkForError