import mongoose from "mongoose";
import attemptSchema from "./Schema.js";

const AttemptModel = mongoose.model("AttemptModel", attemptSchema);
export default AttemptModel;