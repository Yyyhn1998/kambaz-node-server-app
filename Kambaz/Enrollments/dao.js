import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllEnrollments = () => {
    return Database.enrollments;
};

export const findEnrollmentsByUserId = (userId) => {
    return Database.enrollments.filter(enrollment => enrollment.user === userId);
};

export const findEnrollmentsByCourseId = (courseId) => {
    return Database.enrollments.filter(enrollment => enrollment.course === courseId);
};

export const enrollUserInCourse = (userId, courseId) => {
    const exists = Database.enrollments.some(enrollment =>
                                                 enrollment.user === userId && enrollment.course === courseId
    );
    if (exists) {
        return null;
    }

    const newEnrollment = { _id: uuidv4(), user: userId, course: courseId };
    Database.enrollments.push(newEnrollment);
    return newEnrollment;
};

export const unenrollUserFromCourse = async (userId, courseId) => {
    console.log("DAO: Unenrolling user", userId, "from course", courseId);

    const index = Database.enrollments.findIndex(e => e.user === userId && e.course === courseId);
    if (index === -1) {
        console.error("DAO: Unenrollment failed - Enrollment not found");
        return null;
    }

    const removedEnrollment = Database.enrollments.splice(index, 1);
    console.log("DAO: Unenrollment success:", removedEnrollment);
    return removedEnrollment;
};
