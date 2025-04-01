import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import UserModel from "../Users/model.js";
import model from "./model.js";
export async function findCoursesForUser(userId) {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course)
        .filter((course) => course !== null);
}

export async function findUsersForCourse(courseId) {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
}
export async function enrollUserInCourse(user, course) {
    const _id = `${user}-${course}`;
    const existing = await model.findById(_id);
    if (existing) {
        return { message: "Already enrolled" };
    }
    const newEnrollment = { user, course, _id };
    return model.create(newEnrollment);
}
export function unenrollUserFromCourse(user, course) {
    return model.deleteOne({ user, course });
}



export const findAllEnrollments = () => {
    return Database.enrollments;
};

export const findEnrollmentsByUserId = (userId) => {
    return Database.enrollments.filter(enrollment => enrollment.user === userId);
};

export const findEnrollmentsByCourseId = (courseId) => {
    return Database.enrollments.filter(enrollment => enrollment.course === courseId);
};


