import moment from 'moment';
import BookingModel from '../model/bookingModel';
import TripModel from '../model/tripModel';
import errorStrings from '../helpers/errorStrings';
import ResponseHelper from '../helpers/responseHelper';

const bookingModel = new BookingModel('booking');
const tripModel = new TripModel('trip');

/**
* @fileOverview - class manages all booking logic
* @class - BookingController
* @requires - moment
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

      // get bus capacity, bus id, trip date, and status
      const tripInfo = await tripModel.getTripInformationQuery(trip_id);
      if (!tripInfo) {
        return ResponseHelper.error(res, 404, errorStrings.tripNotFound);
      }
      if (tripInfo.status === 'cancelled') {
        return ResponseHelper.error(res, 409, errorStrings.cancelledTrip);
      }
      const isPastTrip = moment().isAfter(moment(tripInfo.trip_date, 'llll'));
      if (isPastTrip) {
        return ResponseHelper.error(res, 409, errorStrings.pastTrip);
      }
      const seat_number = await BookingController.getAvailableSeatNumber(trip_id, tripInfo.capacity);
      const created_on = moment().format('llll');
      const newBooking = await bookingModel.createBookingQuery(req.user.id, trip_id, seat_number, created_on);
      if (!newBooking) {
        throw new Error('');
      }
      const booking = await bookingModel.getBookingById(newBooking.id);
      return ResponseHelper.success(res, 201, booking[0]);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
     * Get bookings (for users and admin)
     * @param {object} req
     * @param {object} res
     * @returns {object} return all user's bookings or all bookings if admin
     */

  static async getBookings(req, res) {
    try {
      const bookings = await bookingModel.getBookingsQuery(req.user.id, req.user.is_admin);

      return ResponseHelper.success(res, 200, bookings);
    } catch (error) {
      return ResponseHelper.error(res, 500, errorStrings.serverError);
    }
  }

  /**
     * Delete a specific booking using its id
     * @param {object} req
     * @param {object} res
     * @returns {object}
     */

  static async deleteBooking(req, res) {
    try {
      const deletedBooking = await bookingModel.deleteBookingQuery(req.user, req.params.bookingId);
      if (deletedBooking === 'not-found') {
        return ResponseHelper.error(res, 404, errorStrings.bookingNotFound);
      }
      if (!deletedBooking) {
        throw new Error('');
      }
      return ResponseHelper.success(res, 200, { message: 'Booking deleted successfully' });
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

      // the differece of arrays busSeats and bookedSeats gives availableSeats
      const availableSeats = busSeats.filter(x => !bookedSeats.includes(x));
      return availableSeats[0];
    } catch (error) {
      return undefined;
    }
  }
}

export default BookingController;
