//import Database from "../Database/index.js";
//import { v4 as uuidv4 } from "uuid";

import AssignmentModel from "./model.js";

export const findAllAssignments = () => AssignmentModel.find();

export const findAssignmentsForCourse = (courseId) =>
    AssignmentModel.find({ course: courseId });

export const createAssignment = (assignment) =>
    AssignmentModel.create(assignment);

export const updateAssignment = (assignmentId, updates) =>
    AssignmentModel.updateOne({ _id: assignmentId }, { $set: updates });

export const deleteAssignment = (assignmentId) =>
    AssignmentModel.deleteOne({ _id: assignmentId });
