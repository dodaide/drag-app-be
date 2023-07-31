import fs from "fs";
import path from "path";

function getCurrentDateTime() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${month}-${day}`;
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = "Unauthorized";
  }
}

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  if (error.name === "NotFound") {
    res.status(404).json({ message: error.message || "Not found" });
  } else if (error.name === "Unauthorized") {
    res.status(401).json({ message: error.message || "Unauthorized" });
  } else if (error.name === "ValidationError") {
    res.status(400).json({ message: "Invalid data" });
  } else if (error.name === "MongoError" && error.code === 11000) {
    res.status(409).json({ message: "Duplicate key" });
  } else {
    const status = error.status || 500;
    const message = error.message || "Something went wrong!";
    res.status(status).json({ message: message });
  }
  const rootDir = new URL("../../", import.meta.url).pathname.slice(1);
  const logFilePath = path.join(rootDir, `log/error_${getCurrentDateTime()}.log`);
  const errorJSON = JSON.stringify(error, null, 2);
  fs.appendFileSync(logFilePath, errorJSON);
};

export { Unauthorized, NotFound, errorHandler };
