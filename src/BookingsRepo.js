class BookingsRepo {
    constructor(bookings) {
        this.allBookings = bookings
    }

    filterByUser(userID) {
        const customerBookings = this.allBookings.filter(booking => {
            return booking.userID === userID
        })
        if (customerBookings.length > 1) {
            return customerBookings
        } else {
            return 'No booking found'
        }
    }

    // should filter by date 
}

export default BookingsRepo