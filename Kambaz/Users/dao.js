import model from "./model.js";
import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";
import Database from "../Database/index.js";
let { users } = db;

export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = async (username, password) => {
    console.log("🔍 Login Attempt:", username, password);
    const user = await model.findOne({ username, password });
    console.log("✅ Found:", user);
    return user;
};
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
/*export const findUserByUsername = (username) => users.find((user) => user.username === username);
export const findAllUsers = () => users;
export const findUserById = (userId) => users.find((user) => user._id === userId);
export const findUserByCredentials = (username, password) =>
    users.find( (user) => user.username === username && user.password === password );

export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));
export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
export function findAllCourses() {
    return Database.courses;
}
*/
export function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = Database;
    const enrolledCourses = courses.filter((course) =>
                                               enrollments.some((enrollment) => enrollment.user === userId && enrollment.course === course._id));
    return enrolledCourses;
}

export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
    const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
    return model.find({
                          $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
                      });
};

export const deleteUser = (userId) => model.deleteOne({ _id: userId });

export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    return model.create(newUser);
}
