import mongoose from "mongoose";
import schema from "./schema.js";

const db = mongoose.connection.useDb("kambaz");
const model = db.model("UserModel", schema, "users");

export default model;

