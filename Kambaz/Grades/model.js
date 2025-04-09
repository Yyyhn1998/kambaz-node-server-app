import mongoose from "mongoose";
import gradeSchema from "./Schema.js";

const GradeModel = mongoose.model("GradeModel", gradeSchema);
export default GradeModel;
