import { User } from "../models/user.model.js";

export const findUserByEmailService = async (email) => {
  return await User.findOne({ email }).select("+password");
};

export const createUserService = async (data) => {
  return await User.create(data);
};
