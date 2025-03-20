import * as enrollmentsDao from "./dao.js";

export default function enrollmentsRoutes(app) {
    app.get("/api/enrollments", (req, res) => {
        const enrollments = enrollmentsDao.findAllEnrollments();
        res.json(enrollments);
    });

    app.get("/api/users/:userId/enrollments", (req, res) => {
        const { userId } = req.params;
        const userEnrollments = enrollmentsDao.findEnrollmentsByUserId(userId);
        res.json(userEnrollments);
    });

    app.get("/api/courses/:courseId/enrollments", (req, res) => {
        const { courseId } = req.params;
        const courseEnrollments = enrollmentsDao.findEnrollmentsByCourseId(courseId);
        res.json(courseEnrollments);
    });

    app.post("/api/enrollments", (req, res) => {
        const { userId, courseId } = req.body;
        if (!userId || !courseId) {
            return res.status(400).json({ error: "Missing userId or courseId" });
        }

        const newEnrollment = enrollmentsDao.enrollUserInCourse(userId, courseId);
        if (!newEnrollment) {
            return res.status(400).json({ error: "User already enrolled in this course" });
        }

        res.status(201).json(newEnrollment);
    });

    app.delete("/api/enrollments/user/:userId/course/:courseId", async (req, res) => {
        console.log("Received unenroll request:", req.params);

        const { userId, courseId } = req.params;
        if (!userId || !courseId) {
            return res.status(400).json({ error: "Missing userId or courseId" });
        }

        try {
            const result = await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
            if (!result) {
                return res.status(404).json({ error: "Enrollment not found" });
            }
            console.log("Unenrollment successful:", result);
            res.json(result);
        } catch (error) {
            console.error("Unenrollment failed:", error);
            res.status(500).json({ error: "Failed to unenroll user" });
        }
    });
}