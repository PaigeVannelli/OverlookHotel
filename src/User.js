

class User {
    constructor(userID, customers, bookings) {
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
        return currentCustomerBookings
    }
}

export default User