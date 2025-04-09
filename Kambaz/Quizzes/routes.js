import * as dao from "./dao.js";

export default function QuizRoutes(app) {
    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const cid = req.params.cid;
        const quiz = {
            ...req.body,
            course: cid,
            oneQuestionAtATime: req.body.oneQuestionAtATime,
            webcamRequired: req.body.webcamRequired,
            lockQuestionsAfterAnswering: req.body.lockQuestionsAfterAnswering
        };
        const newQuiz = await dao.createQuiz(quiz);
        res.json(newQuiz);
    });

    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const cid = req.params.cid;
        const quizzes = await dao.findQuizzesByCourse(cid);
        res.json(quizzes);
    });

    app.get("/api/quizzes/:qid", async (req, res) => {
        const quiz = await dao.findQuizById(req.params.qid);
        res.json(quiz);
    });

    app.put("/api/quizzes/:qid", async (req, res) => {
        console.log("Received quiz data:", req.body);
        try {
            const status = await dao.updateQuiz(req.params.qid, req.body);
            res.json(status);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    app.delete("/api/quizzes/:qid", async (req, res) => {
        const status = await dao.deleteQuiz(req.params.qid);
        res.json(status);
    });



}
