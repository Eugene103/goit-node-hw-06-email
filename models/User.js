import { Schema, model } from "mongoose";
import { fixSaveError, fixUpdateSettings } from "./hooks.js"
import Joi from 'joi'

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const subscripList = ["starter", "pro", "business"]

const userSchema = new Schema({
     password: {
    type: String,
        required: [true, 'Set password for user'],
  },
  email: {
    type: String,
      required: [true, 'Email is required'],
    match: emailRegexp,
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscripList,
    default: "starter"
  },
  token: String,
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'], 
  }
}, {versionKey: false, timestamps: true})

userSchema.pre("findByIdAndUpdate", fixUpdateSettings)

userSchema.post("save", fixSaveError)
userSchema.post("findByIdAndUpdate", fixSaveError)

const User = model('user', userSchema)

export const userRegSchema = Joi.object({
    password: Joi.string().required(), 
  email: Joi.string().required().pattern(emailRegexp),
})
export const userSubscripSchema = Joi.object({
  subscription: Joi.string().valid(...subscripList).required().messages({
    'any.required': 'subscription is required'
  })
})
export const userVerifySchema = Joi.object({
  email: Joi.string().required().pattern(emailRegexp)
})

export default User