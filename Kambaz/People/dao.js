import Database from "../Database/index.js";
import { findEnrollmentsByCourseId } from "../Enrollments/dao.js";
import { findAllUsers } from "../Users/dao.js";

export const findPeopleInCourse = async (courseId) => {
    const enrollments = await findEnrollmentsByCourseId(courseId);
    const userIds = enrollments.map(enrollment => enrollment.user);

    const allUsers = await findAllUsers();
    return allUsers.filter(user => user && user._id && userIds.includes(user._id));
};
