//imports
const express = require("express");
const cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose");
const Feedback = require("./models/feedback");
const bodyParser = require("body-parser");
const user = require("./models/user");
const userRoutes = require("./api/routes/user");
const checkAuth = require("./middleware/check-auth");
const app = express();
const PORT = process.env.PORT || 8086;
const feedbacksys = require("./api/controllers/feedback");
//DB Connection
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://admin:admin123@fmsmern.laux6.mongodb.net/fmsmern?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
mongoose.connection.on("connected", () => {
  console.log("Database is connected");
});
mongoose.connection.on("error", () => {
  console.log("error ocuured");
});
//Middleware

app.use(cors());
app.use(express.json());

//app.use("/feedback",Feedback);
app.use("/user", userRoutes);

//Routes
app.get("/feedback", feedbacksys.get_feedback);
//res.send("get request successful");
///});
app.post("/feedback_submit", checkAuth, feedbacksys.post_feedback);
app.post("/feedback_summary", feedbacksys.post_feedbacksummary);
app.get("/feedback_summary", feedbacksys.get_feedbacksummary);
////res.send("posted data successfully");
app.delete("/feedback/:id", feedbacksys.delete_feedback);
app.put("/feedback/:id", feedbacksys.put_feedback);
app.put("/edit/:id", feedbacksys.put_feedback_edit);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}
//server
app.listen(PORT, () => {
  console.log("server is liestening on 5000");
});
