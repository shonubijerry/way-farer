import uuid from 'uuid';
import Model from './model';

/**
* @fileOverview - class manages all booking data model
* @class - tripModel
* @exports - tripModel.js
* @requires - uuid
* @requires - ./model
* */

class BookingModel extends Model {
  /**
   * Add new booking to database
   * @param {object} req
   * @returns {object} user
   */

  async createBookingQuery(user_id, trip_id, seat_number, created_on) {
    try {
      const id = uuid();
      const { rows } = await this.insert(
        'id, user_id, trip_id, seat_number, created_on', '$1, $2, $3, $4, $5',
        [
          id, user_id, trip_id, seat_number, created_on,
        ],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
     * Get bookings
     * @param {object} email
     * @returns {object} an object with all loans
     */

  async getBookingsQuery(user_id, is_admin) {
    try {
      if (is_admin) {
        const { rows } = await this.selectWithJoin(
          'booking.id as booking_id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, booking.created_on',
          'JOIN trip ON (booking.trip_id = trip.id) JOIN users ON (booking.user_id = users.id)',
          'true',
        );
        return rows;
      }
      const { rows } = await this.selectWithJoin(
        'booking.id as booking_id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, booking.created_on',
        'JOIN trip ON (booking.trip_id = trip.id) JOIN users ON (booking.user_id = users.id)',
        'booking.user_id=$1',
        [user_id],
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
     * Get bookings by id
     * @param {object} email
     * @returns {object} an object with all loans
     */

  async getBookingById(booking_id) {
    try {
      const { rows } = await this.selectWithJoin(
        'booking.id as booking_id, user_id, trip_id, bus_id, trip_date, seat_number, first_name, last_name, email, booking.created_on',
        'JOIN trip ON (booking.trip_id = trip.id) JOIN users ON (booking.user_id = users.id)',
        'booking.id=$1',
        [booking_id],
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
     * Delete a specific booking by booking_id
     * @param {string} user_id
     * @param {string} booking_id
     * @returns {object} an object with all loans
     */

  async deleteBookingQuery({ id, is_admin }, booking_id) {
    try {
      let bookingExists = {};
      if (is_admin) {
        bookingExists = await this.selectWhere('*', 'id=$1', [booking_id]);
      } else {
        bookingExists = await this.selectWhere('*', 'user_id=$1 and id=$2', [id, booking_id]);
      }
      if (!bookingExists.rows[0]) {
        return 'not-found';
      }
      const result = await this.deleteWhere('id=$1', [booking_id]);
      return result.rowCount;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get already booked seat_numbers for a particular trip
   * @param {object} req
   * @returns {object} booked seat numbers
   */

  async getBookedSeats(trip_id) {
    try {
      const { rows } = await this.selectWhere('seat_number', 'trip_id=$1', [trip_id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default BookingModel;
