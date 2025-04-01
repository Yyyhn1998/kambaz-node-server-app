import Database from "../Database/index.js";
import model from "./model.js";
import { v4 as uuidv4 } from "uuid";
export function updateModule(moduleId, moduleUpdates) {
    return model.updateOne({ _id: moduleId }, moduleUpdates);
}

export function deleteModule(moduleId) {
    const { modules } = Database;
    Database.modules = modules.filter((module) => module._id !== moduleId);
}

export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    return model.create(newModule);
}

export function findModulesForCourse(courseId) {
    return model.find({ course: courseId });
}
