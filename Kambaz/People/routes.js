import { findPeopleInCourse } from "./dao.js";

export default function PeopleRoutes(app) {
    app.get("/api/courses/:cid/people", (req, res) => {
        const { cid } = req.params;
        console.log("🔍 Fetching people for course:", cid);

        try {
            const courseUsers = findPeopleInCourse(cid);
            console.log("Returning users:", courseUsers);
            res.json(courseUsers);
        } catch (error) {
            console.error("Error fetching people:", error);
            res.status(500).json({ error: "Failed to fetch enrolled users" });
        }
    });
}

