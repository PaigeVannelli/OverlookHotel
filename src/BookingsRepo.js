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

    filterByDate(date) { 
        return this.allBookings.filter(booking => {
            return booking.date === date
        })
    }

    filterByRoom(roomsByType, date) {
        let filteredRooms = roomsByType.filter(room => {
            return !this.filterByDate(date).some(booking => {
                return booking.roomNumber === room.number
            })
        })
        if (filteredRooms.length > 0) {
            return filteredRooms
        } else {
            return 'no available rooms'
        }
    }
}

export default BookingsRepo