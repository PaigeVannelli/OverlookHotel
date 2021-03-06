

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

    addRoomData() {
        
    }
}

export default User