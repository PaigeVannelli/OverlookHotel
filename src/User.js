

class User {
    constructor(userID, customers, bookings) {
        // shoud have a user id name and all their bookings 
        this.id = userID;
        this.customers = customers;
        this.allBookings = bookings;
        this.name = this.fetchName();
        this.userBookings = this.fetchBookings();
    }

    fetchName() {
        const currentCustomer = this.customers.find(customer => {
            return customer.id === this.id
        })
        return currentCustomer.name
    }

    fetchBookings() {
        const currentCustomerBookings = this.allBookings.filter(booking => {
            return booking.userID === this.id
        })
        return currentCustomerBookings.sort((a, b) => {
           return a.date - b.date
        })
        // Need to sort bookings by date 
    }

    addRoomData() {
        
    }
}

export default User