import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {

        text: String,
        type: {
            type: String,
            enum: ["Multiple Choice", "True/False", "Fill in the Blank"]
        },
        answer: String,
        points: Number,
        choices: [String],
        correctAnswer: {
            type: Number,
            required: function() { return this.type === "Multiple Choice"; },
            validate: {
                validator: function(v) {
                    return v >= 0 && v < this.choices.length;
                },
                message: props => `Correct Answer index is out of bounds for the choices array!`
            }
        },
        caseSensitive: Boolean
    },
    { collection: "questions" }
);


const quizSchema = new mongoose.Schema(
    {
            title: { type: String, required: true },
            description: { type: String },
            course: { type: String, required: true },
            quizType: { type: String, default: "Graded Quiz" },
            assignmentGroup: { type: String, default: "Quizzes" },
            shuffleAnswers: { type: Boolean, default: true },
            timeLimit: { type: Number, default: 20 },
            multipleAttempts: { type: Boolean, default: false },
            attempts: { type: Number, default: 1 },
            allowedAttempts: { type: Number, default: 1 },
            showCorrectAnswers: { type: String, default: "" },
            accessCode: { type: String, default: "" },
            oneQuestionAtATime: { type: Boolean, default: false },
            webcamRequired: { type: Boolean, default: false },
            lockQuestionsAfterAnswering: { type: Boolean, default: false },
            published: { type: Boolean, default: false },
            availableDate: { type: Date },
            dueDate: { type: Date },
            untilDate: { type: Date },
            points: { type: Number, default: 0 },
            questions: [questionSchema],
    },
    { collection: "quizzes" }
);

export default quizSchema;