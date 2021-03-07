import chai from 'chai';
import User from '../src/User';
import customers from './all-test-data/user-data';
import bookings from './all-test-data/bookings-data';
import BookingsRepo from '../src/BookingsRepo';
const expect = chai.expect;

describe('See if the tests are running', function() {

  let currentUser;
  let id;
  let customerData = customers;
  let allBookings = bookings;
  let newBookingsRepo 

  beforeEach(function() {
    id = 2
    newBookingsRepo = new BookingsRepo(allBookings)
    currentUser = new User(id, customerData)
  });

  it('should store an id', function() {
    expect(currentUser.id).to.equal(id)
  })

  it('should store be able to access users name', function() {
    expect(currentUser.name).to.equal("Rocio Schuster")
  })

  // it('should allow user to book a room', function() {
  //   let bookedRoom = currentUser.bookRoom(5, "2021/03/24")
  //   expect(bookedRoom.newBooking.userID).to.equal(currentUser.id)
  // })


});