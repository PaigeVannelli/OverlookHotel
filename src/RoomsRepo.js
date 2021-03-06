class RoomsRepo {
    constructor(rooms) {
        this.allRooms = rooms
    }

    returnDetailedRoomData(userBookings) {
        const detailedBookings = userBookings.map(booking => {
            let matchingRoom = this.allRooms.find(room => {
                return room.number === booking.roomNumber
            })
            let detailedBooking = {
                ...booking,
                ...matchingRoom,
            }
            return detailedBooking
        })
        return detailedBookings
    }

    returnTotalCost(bookings) {
        const detailedBookings = this.returnDetailedRoomData(bookings)
        let totalCost = 0
        detailedBookings.forEach(booking => {
            totalCost += booking.costPerNight
        })
        return totalCost
    }
}

export default RoomsRepo