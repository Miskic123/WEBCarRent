const express = require("express");
const cors = require("cors");
const userController = require("./controller/user_controller");
const rentObjectController = require("./controller/rentObject_controller")
const vehicleController = require("./controller/vehicle_controller")
const commentController = require("./controller/comment_controller")
const orderController = require("./controller/order_controller")
const basketController = require("./controller/basket_controller")

const app = express();
const corsOptions = {
		origin: "http://localhost:8080",
		};
app.use(cors(corsOptions));

app.use("/users", userController);
app.use("/rentObjects", rentObjectController);
app.use("/vehicles", vehicleController)
app.use("/comments",commentController)
app.use("/orders",orderController)
app.use("/baskets",basketController)

app.listen(8081, () => console.log("Server running!"));
