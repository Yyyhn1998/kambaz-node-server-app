import Database from "../Database/index.js";
import { findEnrollmentsByCourseId } from "../Enrollments/dao.js";
import { findAllUsers } from "../Users/dao.js";

export const findPeopleInCourse = (courseId) => {
    const enrollments = findEnrollmentsByCourseId(courseId);
    const userIds = enrollments.map(enrollment => enrollment.user);

    return findAllUsers().filter(user => userIds.includes(user._id));
};
