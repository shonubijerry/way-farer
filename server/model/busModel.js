import Model from './model';

/**
* @fileOverview - class manages all bus data storage
* @class - BusModel
* @requires - ./model
* @exports - BusModel
* */

class BusModel extends Model {
  /**
   * Add new bus to database
   * @param {object} req
   * @returns {object} created bus
   */

  async createBusQuery({
    number_plate, manufacturer, model, year, capacity,
  }) {
    try {
      const { rows } = await this.insert(
        'number_plate, manufacturer, model, year, capacity', '$1, $2, $3, $4, $5',
        [
          number_plate.toUpperCase(), manufacturer, model, year, capacity,
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

  /**
     * Get buses
     * @returns {object} an array objects with all buses
     */

  async getBusesQuery() {
    try {
      const { rows } = await this.select('*');
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export default BusModel;
