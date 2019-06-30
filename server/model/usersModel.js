import uuid from 'uuid';
import passwordHelper from '../helpers/password';
import Model from './model';


/**
* @fileOverview - class manages all users data storage
* @class - usersModel
* @exports - usersModel.js
* @requires - ../helpers/password
* @requires - ../dummy/users
* @requires - ../helpers/utils
* */

class UsersModel extends Model {
  /**
     * Add new user to data structure
     * @param {object} req
     * @returns {object} user
     */

  async signupQuery({
    email, first_name, last_name, password,
  }, registered_on) {
    const hashedPassword = passwordHelper.passwordHash(password);
    const id = uuid();
    try {
      const { rows } = await this.insert(
        'id, email, first_name, last_name, password, registered_on', '$1, $2, $3, $4, $5, $6',
        [
          id, email, first_name, last_name, hashedPassword, registered_on,
        ],
      );
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
     * Find user in data structure
     * @param {object} req
     * @returns {object}
     */

  async signinQuery({ email, password }) {
    try {
      const foundUser = await this.findUserByEmail(email);
      if (foundUser && passwordHelper.comparePasswords(password, foundUser.password)) {
        return foundUser;
      }
      return { error: 'wrong-password' };
    } catch (error) {
      throw error;
    }
  }

  /**
    * Find a user by email
    * @param {String} email
    * @return boolean
    */

  async findUserByEmail(email) {
    try {
      const { rows } = await this.selectWhere('*', 'email=$1', [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  /**
    * Find a user by id
    * @param {String} id
    * @return boolean
    */

  async findUserById(id) {
    try {
      const { rows } = await this.selectWhere('*', 'id=$1', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }
}

export default UsersModel;
