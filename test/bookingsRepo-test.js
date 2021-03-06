import chai from 'chai';
import User from '../src/User';
import customers from './all-test-data/user-data';
import bookings from './all-test-data/bookings-data';
import BookingsRepo from '../src/BookingsRepo';
const expect = chai.expect;

describe('Test BookingRepo Functionality', function() {

  let currentUser;
  let id;
  let customerData = customers;
  let bookingsData = bookings;
  let allBookings = bookings;
  let newBookingsRepo 

  beforeEach(function() {
    id = 3
    newBookingsRepo = new BookingsRepo(allBookings)
    currentUser = new User(id, customerData, bookingsData)
  });

  it('should store all bookings data', function() {
    expect(newBookingsRepo.allBookings).to.equal(allBookings)
  })

  it('should be able to filter through all bookings by a user id', function() {
    const userBookings = newBookingsRepo.filterByUser(2)
    expect(userBookings.length).to.equal(2)
  })

  it('should return no bookings found if user has no bookings', function() {
    const userBookings = newBookingsRepo.filterByUser(3)
    expect(userBookings).to.equal('No booking found')
  })

})