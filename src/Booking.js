class BookingsRepo {
    constructor(bookings) {
        this.allBookings = bookings
    }

    filterByUser(userID) {
        const customerBookings = this.allBookings.filter(booking => {
            return booking.userID === userID
        })
        return customerBookings
        // return currentCustomerBookings.sort((a, b) => {
        //    return a.date - b.date
        // })
    }

    //should filter by user 
    // should filter by date 
}

export default BookingsRepo