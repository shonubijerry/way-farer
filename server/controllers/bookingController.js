import moment from 'moment';
import BookingModel from '../model/bookingModel';
import UsersModel from '../model/usersModel';
import TripModel from '../model/tripModel';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';

const bookingModel = new BookingModel('booking');
const usersModel = new UsersModel('users');
const tripModel = new TripModel('trip');

/**
* @fileOverview - class manages all booking logic
* @class - BookingController
* @requires - ../model/bookingsModel
* @requires - ../model/usersModel
* @requires - ../model/busModel
* @requires - ../helpers/errorStrings
* @requires - ../helpers/responseHelper
* @exports - BookingController
* */

class BookingController {
  /**
 * Create a booking (for users)
 * @param {object} req
 * @param {object} res
 */

  static async createBooking(req, res) {
    try {
      const { trip_id } = req.body;
      const { first_name, last_name, email } = await usersModel.findUserById(req.user.id);

      // get bus capacity, bus id, and trip date
      const tripInfo = await tripModel.getTripInformationQuery(trip_id);
      if (!tripInfo) {
        return ResponseHelper.error(res, 404, errorStrings.noTrip);
      }

      const seat_number = await BookingController.getAvailableSeatNumber(trip_id, tripInfo.capacity);

      const newBooking = await bookingModel.createBookingQuery(req.user.id, trip_id, seat_number);
      if (!newBooking) {
        throw new Error('');
      }
      const booking = {
        booking_id: newBooking.id,
        user_id: req.user.id,
        trip_id,
        bus_id: tripInfo.bus_id,
        trip_date: moment(tripInfo.trip_date).format('llll'),
        seat_number,
        first_name,
        last_name,
        email,
        created_on: moment(newBooking.created_on).format('llll'),
      };
      return ResponseHelper.success(res, 201, booking);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
  * Generate an available seat number for user
  * @param {object} trip_id
  * @returns {integer} seat_number
  */
  static async getAvailableSeatNumber(trip_id, capacity) {
    try {
      // convert capacity (integer) to array of integers
      const busSeats = Array.from(new Array(capacity), (x, i) => i + 1);

      // get already booked seats for this trip
      let bookedSeats = await bookingModel.getBookedSeats(trip_id);
      bookedSeats = bookedSeats.map(x => x.seat_number);

      // bookedSeats = bookedSeats.length > 0 ? bookedSeats.map(x => x.seat_number) : [];

      // the differece of arrays busSeats and bookedSeats gives availableSeats
      const availableSeats = busSeats.filter(x => !bookedSeats.includes(x));
      return availableSeats[0];
    } catch (error) {
      return undefined;
    }
  }
}

export default BookingController;
