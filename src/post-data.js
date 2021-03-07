function postUserBooking(userBooking) {
    fetch("http://localhost:3001/api/v1/bookings", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userBooking),
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => displayError(err))

}

export default postUserBooking