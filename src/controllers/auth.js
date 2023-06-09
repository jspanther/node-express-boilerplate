import autoBind from 'auto-bind';
import Auth from '../models/auth.js';
import User from '../models/user.js';
import AuthService from '../services/auth.js';
const bcrypt = import('bcrypt');
const SALT_WORK_FACTOR = 10;
const authService = new AuthService(
  new Auth().getInstance(),
  new User().getInstance()
);

class AuthController {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  /**
   * Login API Route.
   * @param email     Required
   * @param password  Required
   * @returns token
   */
  async login(req, res, next) {
    try {
      const response = await this.service.login(
        req.body.email,
        req.body.password
      );

      await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Register API Route.
   * @param name      Required
   * @param email     Required
   * @param password  Required
   * @param deviceId  Required
   * @param role      Optional
   * @param status    Optional
   * @param isDeleted Optional
   * @returns registeredUserData  - Registered user data
   */
  async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const deviceId = req.headers.deviceid;
      const registerUserData = {
        email,
        password,
        deviceId,
        status: true,
      };
      const registeredUserData = await this.service.register(registerUserData);
      await res.status(200).json(registeredUserData);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Login API Route.
   * @param _id      Required
   * @param password  Required
   * @param deviceId  Required
   * @returns passwordChanged {true/false}
   */
  async changePassword(req, res, next) {
    try {
      const id = req.user._id;

      bcrypt.genSalt(SALT_WORK_FACTOR, async (err, salt) => {
        if (err) {
          return next(err);
        }
        bcrypt.hash(req.body.password, salt, async (hashErr, hash) => {
          if (hashErr) {
            return next(hashErr);
          }
          const data = { password: hash },
            response = await this.service.changePassword(id, data);

          await res.status(response.statusCode).json(response);
        });
      });
    } catch (e) {
      next(e);
    }
  }

  /**
   * Login API Route.
   * @param _id      Required
   * @param token  Required
   * @returns logout {true/false}
   */
  async logout(req, res, next) {
    try {
      const response = await this.service.logout(req.token);

      await res.status(response.statusCode).json(response);
    } catch (e) {
      next(e);
    }
  }

  /**
   * Login API Route.
   * @param req      Required
   */
  async checkLogin(req, res, next) {
    try {
      const token = this.extractToken(req);

      req.user = await this.service.checkLogin(token);
      req.authorized = true;
      req.token = token;
      next();
    } catch (e) {
      next(e);
    }
  }

  /**
   * Update Profile data
   * @param name
   * @param email
   * @param gender
   * @param birthYear
   * @param height
   * @param weight
   * @param inTreatment
   * @return User data object
   */
  async updateProfile(req, res, next) {
    try {
      const {
        _id,
        name,
        email,
        gender,
        birthYear,
        height,
        weight,
        inTreatment,
      } = req.body;
      const deviceId = req.headers.deviceid;
      const userData = {
        _id,
        name,
        email,
        gender,
        birthYear,
        height,
        weight,
        inTreatment,
        deviceId,
        status: true, // Change the status back to false once risks are started.
      };
      const registeredUserData = await this.service.updateProfile(
        _id,
        userData
      );
      await res.status(200).json(registeredUserData);
    } catch (e) {
      next(e);
    }
  }

  /**
   *
   * @param {_id, deviceId} req
   * @returns {userData}
   */
  async getProfile(req, res, next) {
    try {
      const { _id } = req.body;
      const userData = await this.service.getProfile(_id);
      res.status(200).json(userData);
    } catch (error) {}
  }

  extractToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}

export default new AuthController(authService);
