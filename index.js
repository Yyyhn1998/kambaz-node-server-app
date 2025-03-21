import express from 'express';
import Hello from "./hello.js"
import Lab5 from "./Lab5/index.js";
import cors from "cors";
import UserRoutes from "./Kambaz/Users/routes.js";
import session from "express-session";
import "dotenv/config";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import enrollmentsRoutes from "./Kambaz/Enrollments/routes.js";
import PeopleRoutes from "./Kambaz/People/routes.js";

const app = express()
app.use(
    cors({
             credentials: true,
             origin: [
                 process.env.NETLIFY_URL || "https://nenemomo-neu-1998.netlify.app",
                 "http://localhost:5173"
             ]
         })
);
const sessionOptions = {
    secret: process.env.SESSION_SECRET || "kambaz",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
       // secure: true,
        domain: process.env.NODE_SERVER_DOMAIN,
    };
}

app.use(
    session(sessionOptions)
);

app.use(express.json());
UserRoutes(app);
Hello(app)
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
enrollmentsRoutes(app);
PeopleRoutes(app);
Lab5(app);
app.listen(process.env.PORT || 4000)