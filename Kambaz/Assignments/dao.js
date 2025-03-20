import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllAssignments() {
    return Database.assignments;
}

export function findAssignmentsForCourse(courseId) {
    return Database.assignments.filter(assignment => assignment.course === courseId);
}

export function createAssignment(assignment) {
    const newAssignment = { ...assignment, _id: uuidv4() };
    Database.assignments.push(newAssignment);
    return newAssignment;
}

export function updateAssignment(assignmentId, assignmentUpdates) {
    const index = Database.assignments.findIndex(a => a._id === assignmentId);
    if (index === -1) return { error: "Assignment not found" };

    Database.assignments[index] = { ...Database.assignments[index], ...assignmentUpdates };
    return { message: "Assignment updated successfully" };
}

export function deleteAssignment(assignmentId) {
    const index = Database.assignments.findIndex(a => a._id === assignmentId);
    if (index === -1) return { error: "Assignment not found" };

    Database.assignments.splice(index, 1);
    return { message: "Assignment deleted successfully" };
}
