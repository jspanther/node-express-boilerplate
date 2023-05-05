import autoBind from 'auto-bind';
import mongoose from 'mongoose';
import HttpResponse from '../../helpers/HttpResponse.js';

class Service {
  /**
   * Base Service Layer
   * @param model
   */
  constructor(model) {
    this.model = model;
    autoBind(this);
  }

  async getAll(query) {
    let { skip, limit, sortBy } = query;

    skip = skip ? Number(skip) : 0;
    limit = limit ? Number(limit) : 10;
    sortBy = sortBy ? sortBy : { createdAt: -1 };

    delete query.skip;
    delete query.limit;
    delete query.sortBy;

    if (query._id) {
      try {
        query._id = new mongoose.mongo.ObjectId(query._id);
      } catch (error) {
        throw new Error('Not able to generate mongoose id with content');
      }
    }

    try {
      const items = await this.model
          .find(query)
          .sort(sortBy)
          .skip(skip)
          .limit(limit),
        total = await this.model.countDocuments(query);

      return new HttpResponse(items, { totalCount: total });
    } catch (errors) {
      throw errors;
    }
  }

  async get(id) {
    try {
      const item = await this.model.findById(id);

      if (!item) {
        const error = new Error('Item not found');

        error.statusCode = 404;
        throw error;
      }

      return new HttpResponse(item);
    } catch (errors) {
      throw errors;
    }
  }

  async insert(data) {
    try {
      const item = await this.model.create(data);
      if (item) {
        return new HttpResponse(item);
      }
      throw new Error('Something wrong happened');
    } catch (error) {
      const obj = {};
      if (error && error.message.split(':')[0] === 'user validation failed') {
        const messageArray = error.message.split(':');
        obj.error =
          messageArray[1].trim() === 'email'
            ? 'Fejl, forventet at "e-mail" var unik'
            : messageArray[2];
      }
      throw new Error(obj.error);
    }
  }

  async update(id, data) {
    try {
      const item = await this.model.findByIdAndUpdate(id, data, { new: true });

      return new HttpResponse(item);
    } catch (errors) {
      throw errors;
    }
  }

  async delete(id) {
    try {
      const item = await this.model.findByIdAndDelete(id);

      if (!item) {
        const error = new Error('Item not found');

        error.statusCode = 404;
        throw error;
      } else {
        return new HttpResponse(item, { deleted: true });
      }
    } catch (errors) {
      throw errors;
    }
  }
}

export default Service;
