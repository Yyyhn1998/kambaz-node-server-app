import * as dao from "./Dao.js";

export default function GradeRoutes(app) {
    app.get("/api/grades", async (req, res) => {
        const grades = await dao.getAllGrades();
        res.json(grades);
    });

    app.get("/api/grades/:uid/:qid", async (req, res) => {
        const { uid, qid } = req.params;
        const grade = await dao.getGradeByUserAndQuiz(uid, qid);
        res.json(grade);
    });

    app.post("/api/grades/:uid/:qid", async (req, res) => {
        const { uid, qid } = req.params;
        const { score } = req.body;
        const newGrade = await dao.createGrade(uid, qid, score);
        res.json(newGrade);
    });

    app.put("/api/grades/:uid/:qid", async (req, res) => {
        const { uid, qid } = req.params;
        const updates = req.body;
        const updated = await dao.updateGrade(uid, qid, updates);
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).send("Grade not found");
        }
    });
}
