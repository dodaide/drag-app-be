import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối thành công");
  } catch (error) {
    console.log("Kết nối thất bại");
  }
}
