import chai from 'chai';
import User from '../src/User';
import customers from './all-test-data/user-data';
import bookings from './all-test-data/bookings-data';
import rooms from './all-test-data/rooms-data';
import BookingsRepo from '../src/BookingsRepo';
import RoomsRepo from '../src/RoomsRepo';
const expect = chai.expect;

describe('RoomRepo Tests', function() {

  let id;
  let customerData = customers;
  let bookingsData = bookings;
  let allBookings = bookings;
  let newBookingsRepo 
  let allRooms = rooms;
  let newRoomsRepo
  let userBookings
  let currentUser

  beforeEach(function() {
    id = 3
    newBookingsRepo = new BookingsRepo(allBookings)
    currentUser = new User(id, customerData, bookingsData)
    newRoomsRepo = new RoomsRepo(allRooms)
    userBookings = newBookingsRepo.filterByUser(2)
  });

  it('should store all rooms data', function() {
    expect(newRoomsRepo.allRooms).to.equal(allRooms)
  })

  describe('RoomRepo Methods', function () {
    
      it('should be able to add room details to bookings', function() {
          let detailedUserBooking = newRoomsRepo.returnDetailedRoomData(userBookings)
          expect(detailedUserBooking[0].costPerNight).to.equal(374.67)
      })
    
      it('should calcuate and return total cost', function() {
          let totalCost = newRoomsRepo.returnTotalCost(userBookings)
          expect(totalCost).to.equal('575.06')
      })
    
      it('should be able to filter rooms by type', function() {
        let allSuites = newRoomsRepo.filterByType("suite")
        expect(allSuites[0].number).to.equal(2)
      })
  })
})