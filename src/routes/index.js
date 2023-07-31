import recorderRouter from "./recorder.js";
import windowRouter from "./window.js";
import userRouter from './user.js'
import userWindowRouter from './userwindow.js'

export default function route(app) {
  app.use("/api", userRouter);
  app.use("/api/recorder", recorderRouter);
  app.use("/api/window", windowRouter);
  app.use("/api/userwindow", userWindowRouter);
}
