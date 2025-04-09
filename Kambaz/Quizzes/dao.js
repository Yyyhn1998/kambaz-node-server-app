import QuizModel from "./model.js";
import mongoose from "mongoose";

export const createQuiz = async (quiz) => {
    try {
        const createdQuiz = await QuizModel.create(quiz);

        console.log('Created Quiz:', createdQuiz);


        return createdQuiz;
    } catch (error) {
        console.error('Error creating quiz:', error);
        throw error;
    }
};

export const findQuizzesByCourse = (cid) =>
    QuizModel.find({ course: cid });

export const findQuizById = (qid) => QuizModel.findById(qid);

export const updateQuiz = async (qid, quiz) => {
    try {
        quiz.questions = quiz.questions.map((question) => {
            if (!question._id) {
                question._id = new mongoose.Types.ObjectId();
            }
            return question;
        });

        console.log("Updated quiz:", quiz);

        const updatedQuiz = await QuizModel.updateOne(
            { _id: qid },
            { $set: quiz }
        );

        return updatedQuiz;
    } catch (error) {
        console.error("Error updating quiz:", error);
        throw error;
    }
};


export const deleteQuiz = (qid) => QuizModel.deleteOne({ _id: qid });


