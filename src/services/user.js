'use strict';
import autoBind from 'auto-bind';
import Service from './common.js';

class UserService extends Service {
  constructor(model) {
    super(model);
    this.model = model;
    autoBind(this);
  }

  async updatePassword(id, data) {
    try {
      await this.model.findByIdAndUpdate(id, data, { new: true });
      return { passwordChanged: true };
    } catch (errors) {
      throw errors;
    }
  }

  /**
   *
   * @param email : string
   * @param includePassword : boolean
   * @returns {Promise<*>}
   */
  async findByEmail(email, includePassword = false) {
    return includePassword
      ? this.model.findByEmail(email).select('+password')
      : this.model.findByEmail(email);
  }

  async updateProfile(id, data) {
    try {
      const userData = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { userData };
    } catch (errors) {
      throw errors;
    }
  }

  async getProfile(id) {
    try {
      const userData = await this.model.findById(id);
      return { userData };
    } catch (errors) {
      throw errors;
    }
  }
}

export default UserService;
