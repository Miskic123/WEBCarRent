const express = require("express");
const cors = require("cors");
const userController = require("./controller/user_controller");
const rentObjectController = require("./controller/rentObject_controller")
const vehicleController = require("./controller/vehicle_controller")
const commentController = require("./controller/comment_controller")

const app = express();
const corsOptions = {
		origin: "http://localhost:8080",
		};
app.use(cors(corsOptions));

app.use("/users", userController);
app.use("/rentObjects", rentObjectController);
app.use("/vehicles", vehicleController)
app.use("/comments",commentController)

app.listen(8081, () => console.log("Server running!"));
