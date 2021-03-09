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

    filterByDate(allRooms, date) { 
        let bookedRooms = this.allBookings.filter(booking => {
            return booking.date == date
        })
        let availableRooms = allRooms.filter(room => {
            return !bookedRooms.some(booking => {
                return booking.roomNumber === room.number
            })
        })
        if (availableRooms.length > 0) {
            return availableRooms
        } else {
            return 'no available rooms'
        }
    }

    filterByType(roomsByDate, type) {
        if (type !== 'all rooms') {
            let roomsByType = roomsByDate.filter(room => {
                return room.roomType === type
            })
            if (roomsByType.length > 0) {
                return roomsByType
            } else {
                return 'no available rooms'
            }
        } else {
            return roomsByDate
        }
    }
}

export default BookingsRepo