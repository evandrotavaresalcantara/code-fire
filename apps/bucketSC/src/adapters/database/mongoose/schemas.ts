// import { Schema } from "mongoose";
// import { DatabaseConnectionMongooseAdapter } from "./DatabaseConnetionMongooseAdapter";

// const database = new DatabaseConnectionMongooseAdapter();

// const userSchema = new Schema(
//   {
//     name: String,
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     apiKey: String,
//   },
//   { timestamps: true }
// );
// export const userModel = database.connection.model("user", userSchema);

// const uploadSchema = new Schema(
//   {
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref: userModel.modelName,
//     },
//     filename: String,
//     mimeType: String,
//     path: String,
//   },
//   { timestamps: true }
// );
// export const uploadModel = database.connection.model("upload", uploadSchema);
