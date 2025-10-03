import User from "../auth/user.model.js";

export async function getUserById(id) {
  return User.findById(id);
}
export async function updateUserById(id, patch) {
  return User.findByIdAndUpdate(id, patch, { new: true });
}
