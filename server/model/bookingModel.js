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

  async createBookingQuery(user_id, trip_id, seat_number) {
    try {
      const id = uuid();
      const { rows } = await this.insert(
        'id, user_id, trip_id, seat_number', '$1, $2, $3, $4',
        [
          id, user_id, trip_id, seat_number,
        ],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add new booking to database
   * @param {object} req
   * @returns {object} user
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
