function getUserData(userID) {
    return fetch(`http://localhost:3001/api/v1/customers/${userID}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .then(userData => {
        return userData})
    .catch(err => displayError(err))
}

export default getUserData