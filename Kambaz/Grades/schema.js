import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema(
    {
        userRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel",
            required: true,
        },
        quizRef: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizModel",
            required: true,
        },
        score: {
            type: Number,
            required: true,
        },
        submittedOn: {
            type: Date,
            default: Date.now,
        },
    },
    { collection: "quiz_grades" }
);

export default gradeSchema;
