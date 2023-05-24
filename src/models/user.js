import autoBind from 'auto-bind';
import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
const SALT_WORK_FACTOR = 10;

class User {
  initSchema() {
    const schema = new Schema(
      {
        name: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          unique: true,
          trim: true,
          lowercase: true,
          required: true,
          trim: true,
        },
        gender: {
          type: String,
          trim: true,
        },
        birthYear: {
          type: Number,
        },
        height: {
          type: Number,
        },
        weight: {
          type: Number,
        },
        inTreatment: {
          type: Boolean,
          default: false,
        },
        password: {
          type: String,
          required: true,
          select: false,
          trim: true,
          minLength: [8, 'Adgangskoden skal være mindst 8 tegn lang'],
        },
        role: {
          type: String,
          enum: ['admin'],
          default: 'admin',
        },
        status: {
          type: Boolean,
          required: true,
          default: false,
        },
        deviceId: {
          type: String,
          required: true,
          trim: true,
        },
        isDeleted: {
          type: Boolean,
          default: false,
        },
        accountDeleted: {
          type: Date,
          default: Date.now,
        },
      },
      { timestamps: true }
    );

    // Pre save Hook
    schema.pre('save', function (next) {
      const user = this;
      // only hash the password if it has been modified (or is new)

      if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
          if (err) {
            return next(err);
          }
          bcrypt.hash(user.password, salt, (hashErr, hash) => {
            if (hashErr) {
              return next(hashErr);
            }
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
          });
        });
      } else {
        return next();
      }
    });

    // Compare Password
    schema.methods.comparePassword = async function (candidatePassword) {
      return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
          if (err) {
            reject(err);
          } else {
            resolve(isMatch);
          }
        });
      });
    };
    schema.statics.findByEmail = (email) => {
      return mongoose.model('user').findOne({ email: email, isDeleted: false });
    };
    schema.plugin(uniqueValidator);
    try {
      mongoose.model('user', schema);
    } catch (e) {
      console.error('✘ Error occured in the model creation :- ', e);
    }
  }

  getInstance() {
    this.initSchema();
    return mongoose.model('user');
  }
}

export default User;
