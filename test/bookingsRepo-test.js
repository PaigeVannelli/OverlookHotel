import chai from 'chai';
import User from '../src/User';
import customers from './all-test-data/user-data';
import bookings from './all-test-data/bookings-data';
import rooms from './all-test-data/rooms-data';
import BookingsRepo from '../src/BookingsRepo';
import RoomsRepo from '../src/RoomsRepo';
const expect = chai.expect;

describe('Test BookingRepo Functionality', function() {

  let currentUser;
  let id;
  let customerData = customers;
  let bookingsData = bookings;
  let allBookings = bookings;
  let newBookingsRepo 
  let allRooms = rooms;
  let newRoomsRepo

  beforeEach(function() {
    id = 3
    newBookingsRepo = new BookingsRepo(allBookings)
    newRoomsRepo = new RoomsRepo(allRooms)
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

  it('should filter rooms by date', function() {
    // const filteredByType = newRoomsRepo.filterByType("single room")
    // const filterByRoom = newBookingsRepo.filterByRoom(filteredByType, '2020/02/11')
    const filterByRoom = newBookingsRepo.filterByDate(allRooms, '2020/02/11')
    expect(filterByRoom.length).to.equal(9)
  })

  it('should fiter rooms by type', function() {
    const filterByDate = newBookingsRepo.filterByDate(allRooms, '2020/02/11')
    const filterByType = newBookingsRepo.filterByType(filterByDate, 'suite')
    expect(filterByType.length).to.equal(1)
  })

  it('should return all rooms if no room if no room is specified', function() {
    const filterByDate = newBookingsRepo.filterByDate(allRooms, '2020/02/11')
    const filterByType = newBookingsRepo.filterByType(filterByDate, 'all rooms')
    expect(filterByType.length).to.equal(9)
  })

  // it('should return all room if no rooms are booked', function() {
  //   const filteredByType = newRoomsRepo.filterByType("single room")
  //   const filterByRoom = newBookingsRepo.filterByRoom(filteredByType, '2021/02/11')
  //   expect(filterByRoom.length).to.equal(6)
  // })

  // it('should return no available rooms when all rooms are booked', function() {
  //   const filteredByType = newRoomsRepo.filterByType("single room")
  //   const filterByRoom = newBookingsRepo.filterByRoom(filteredByType, '2021/04/26')
  //   expect(filterByRoom).to.equal('no available rooms')
  // })

})