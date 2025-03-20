import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    app.get("/api/assignments", (req, res) => {
        res.json(dao.findAllAssignments());
    });

    app.get("/api/courses/:courseId/assignments", (req, res) => {
        const { courseId } = req.params;
        res.json(dao.findAssignmentsForCourse(courseId));
    });

    app.post("/api/assignments", (req, res) => {
        const newAssignment = dao.createAssignment(req.body);
        res.json(newAssignment);
    });

    app.put("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;
        const status = dao.updateAssignment(assignmentId, assignmentUpdates);
        res.send(status);
    });

    app.delete("/api/assignments/:assignmentId", (req, res) => {
        const { assignmentId } = req.params;
        const status = dao.deleteAssignment(assignmentId);
        res.send(status);
    });
}
