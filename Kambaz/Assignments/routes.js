import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/assignments", async (req, res) => {
        const assignments = await dao.findAllAssignments();
        res.json(assignments);
    });

    app.get("/api/courses/:courseId/assignments", async (req, res) => {
        const { courseId } = req.params;
        const assignments = await dao.findAssignmentsForCourse(courseId);
        res.json(assignments);
    });

    app.post("/api/assignments", async (req, res) => {
        const newAssignment = await dao.createAssignment(req.body);
        res.json(newAssignment);
    });

    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.updateAssignment(assignmentId, req.body);
        res.json(status);
    });

    app.delete("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const status = await dao.deleteAssignment(assignmentId);
        res.json(status);
    });
}