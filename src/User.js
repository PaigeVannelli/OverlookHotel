
// import postUserBooking from './post-data'
class User {
    constructor(userID, customers) {
        // shoud have a user id name and all their bookings 
        this.id = userID;
        this.customers = customers;
        // this.allBookings = bookings;
        this.name = this.fetchName();
        this.userBookings = [];
    }

    fetchName() {
        const currentCustomer = this.customers.find(customer => {
            return customer.id === this.id
        })
        return currentCustomer.name
    }

    // bookRoom(roomNumber, date) {
    //     let userBooking = {
    //         "userID": this.id,
    //         "date": date, 
    //         "roomNumber": roomNumber
    //     }
    //     return postUserBooking(userBooking)
    //     .then(response => {
    //         return(response)
    //     })
    //     // bookRoom is not asynchronous and is not returning anything
    //     // postUserBooking returns response but then nothing happens with it
    // }
}

export default User