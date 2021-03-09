import chai from 'chai';
import User from '../src/User';
import customers from './all-test-data/user-data';
import bookings from './all-test-data/bookings-data';
import BookingsRepo from '../src/BookingsRepo';
const expect = chai.expect;

describe('User tests', function() {

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

  it('should start out with no customers bookings', function() {
    expect(currentUser.userBookings.length).to.equal(0)
  })

  it('should be able to store all of the users bookings', function() {
    currentUser.userBookings = newBookingsRepo.filterByUser(id)
    expect(currentUser.userBookings.length).to.equal(2)
  })

  it('should store the users name', function() {
    expect(currentUser.name).to.equal('Rocio Schuster')
  })

  describe('User methods', function() {
    it('should store be able to access users name', function() {
      expect(currentUser.name).to.equal("Rocio Schuster")
    })
  
    it('should allow user to book a room', function() {
      currentUser.bookRoom(allBookings[0])
      const length = currentUser.userBookings.length
      expect(currentUser.userBookings[length - 1]).to.equal(allBookings[0])
    })
  })
});