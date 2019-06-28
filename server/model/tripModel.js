import uuid from 'uuid';
import moment from 'moment';
import Model from './model';


/**
* @fileOverview - class manages all trip data storage
* @class - tripModel
* @exports - tripModel.js
* @requires - uuid
* @requires - ./model
* */

class TripModel extends Model {
  /**
   * Add new trip to database
   * @param {object} req
   * @returns {object} user
   */

  async createTripQuery({
    bus_id, origin, destination, trip_date, fare,
  }) {
    try {
      const formatted_date = moment(trip_date).format('llll');
      const id = uuid();
      const { rows } = await this.insert(
        'id, bus_id, origin, destination, trip_date, fare', '$1, $2, $3, $4, $5, $6',
        [
          id, bus_id, origin, destination, formatted_date, fare,
        ],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
     * Get trips
     * @returns {object} an object with all trips
     */

  async getTrips() {
    try {
      const { rows } = await this.select('*');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Query to cancel a particular trip
   * @param {object} req
   * @param {object} res
   * @returns {object} response object
   */

  async cancelTrip(tripId) {
    try {
      const trip = await this.selectWhere('*', 'id=$1', [tripId]);
      if (!trip.rows[0]) {
        return 'no-trip';
      } if (trip.rows[0].status === 'cancelled') {
        return 'already-cancelled';
      }
      const { rows } = await this.update('status=$1', 'id=$2', ['cancelled', tripId]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
 * Check if a bus has been assigned to another trip already
 * A bus can be available if it has no active trip
 * @param {string} bus_id
 * @returns {object} An object containing the bus trip info
 */
  async checkBusAvailability(bus_id) {
    try {
      const { rows } = await this.selectWhere('*', 'bus_id=$1 and status=$2', [bus_id, 'active']);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
 * Check if a bus exists in the database
 * @param {string} bus_id
 * @returns {object} An object containing the bus trip info
 */
  async checkBusExists(bus_id) {
    try {
      const { rows } = await this.selectWhere('*', 'id=$1', [bus_id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default TripModel;
