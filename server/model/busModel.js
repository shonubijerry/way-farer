import uuid from 'uuid';
import Model from './model';

/**
* @fileOverview - class manages all bus data storage
* @class - BusModel
* @exports - BusModel
* @requires - uuid
* @requires - ./model
* */

class BusModel extends Model {
  /**
   * Add new bus to database
   * @param {object} req
   * @returns {object} created bus
   */

  async createBusQuery({
    number_plate, manufacturer, model, year, capacity, created_on,
  }) {
    try {
      const id = uuid();
      const { rows } = await this.insert(
        'id, number_plate, manufacturer, model, year, capacity, created_on', '$1, $2, $3, $4, $5, $6, $7',
        [
          id, number_plate.toUpperCase(), manufacturer, model, year, capacity, created_on,
        ],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
 * Check if a bus exists in the database
 * @param {string} bus_id
 * @returns {object} An object containing the bus info
 */
  async checkBusExists(column, value) {
    try {
      const { rows } = await this.selectWhere('*', `${column}=$1`, [value]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default BusModel;
