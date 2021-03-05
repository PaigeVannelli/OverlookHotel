import chai from 'chai';
import User from '../src/User';
import customers from './all-test-data/user-data';
import bookings from './all-test-data/bookings-data';
const expect = chai.expect;

describe('See if the tests are running', function() {

  let currentUser;
  let id;
  let customerData = customers;
  let bookingsData = bookings;

  beforeEach(function() {
    id = 2
    currentUser = new User(id, customerData, bookingsData)
  });

  it('should return true', function() {
    expect(true).to.equal(true);
  });

  it('should store an id', function() {
    expect(currentUser.id).to.equal(id)
  })

  it('should store be able to access users name', function() {
    expect(currentUser.name).to.equal("Rocio Schuster")
  })

  it('should store all booking data by user id', function() {
    currentUser.fetchBookings()
    expect(currentUser.userBookings.length).to.equal(2)
  })


});