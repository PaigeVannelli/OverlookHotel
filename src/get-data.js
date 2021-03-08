
const fetchData = () => {
    let allUserData =  fetch("http://localhost:3001/api/v1/customers")
        .then(response => response.json())
        .then(userData => {
            return userData
        })
        .catch(err => displayError(err))

    let allRooms = fetch("http://localhost:3001/api/v1/rooms")
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(hydrationData => {
            return hydrationData;
        })
        .catch(err => displayError(err))

    let allBookings = fetch("http://localhost:3001/api/v1/bookings")
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(activityData => {
            return activityData;
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

export default fetchData