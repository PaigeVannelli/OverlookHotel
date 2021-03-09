
// import postUserBooking from './post-data'
class User {
    constructor(userID, customers) {
        this.id = userID;
        this.customers = customers;
        this.name = this.fetchName();
        this.userBookings = [];
    }

    fetchName() {
        const currentCustomer = this.customers.find(customer => {
            return customer.id === this.id
        })
        return currentCustomer.name
    }

    bookRoom(booking) {
        this.userBookings.push(booking)
    }
}

export default User