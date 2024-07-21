import { model, models, Schema } from "mongoose";

const AccountSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists."],
    required: [true, "Email is required and it should be unique."],
  },
  password: {
    type: String,
    required: [false, "Password is not required."],
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  image: {
    type: String,
    required: [true, "Image is required."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Account = models.Account || model("Account", AccountSchema);
export default Account;
