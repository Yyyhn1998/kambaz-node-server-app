import mongoose from "mongoose";
import gradeSchema from "./schema.js";

const GradeModel = mongoose.model("GradeModel", gradeSchema);
export default GradeModel;
