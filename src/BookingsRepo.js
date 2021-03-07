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
        return availableRooms
        // const bookedRoomNumber = []
        // bookedRooms.forEach(booking => {
        //     bookedRoomNumber.push(booking.roomNumber)
        // })
        // console.log(bookedRoomNumber)
        // let availableRooms = allRooms.filter(room => {
        //     return !bookedRoomNumber.includes(room.number)
        // })
        // return availableRooms
    }

    // filterByRoom(roomsByType, date) {
    //     let filteredRooms = roomsByType.filter(room => {
    //         return !this.filterByDate(date).some(booking => {
    //             return booking.roomNumber === room.number
    //         })
    //     })
    //     if (filteredRooms.length > 0) {
    //         return filteredRooms
    //     } else {
    //         return 'no available rooms'
    //     }
    // }
}

export default BookingsRepo