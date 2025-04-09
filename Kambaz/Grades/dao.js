import GradeModel from "./Model.js";

export const getAllGrades = () => GradeModel.find();

export const getGradeByUserAndQuiz = (userId, quizId) =>
    GradeModel.findOne({ userRef: userId, quizRef: quizId })
        .populate("userRef")
        .populate("quizRef");

export const createGrade = (userId, quizId, scoreValue) =>
    GradeModel.create({
                          userRef: userId,
                          quizRef: quizId,
                          score: scoreValue,
                      });

export const updateGrade = (userId, quizId, updatedData) =>
    GradeModel.findOneAndUpdate(
        { userRef: userId, quizRef: quizId },
        updatedData,
        { new: true }
    );
