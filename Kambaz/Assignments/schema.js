import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
                                                // _id: { type: String, required: true },
                                                 title: String,
                                                 description: String,
                                                 points: Number,
                                                 assignmentGroup: String,
                                                 displayGrade: String,
                                                 submissionType: String,
                                                 assignTo: String,
                                                 dueDate: String,
                                                 availableFromDate: String,
                                                 availableUntilDate: String,
                                                 course: { type: String, ref: "CourseModel" },
                                             }, { collection: "assignments" });

export default assignmentSchema;