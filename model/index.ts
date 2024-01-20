import mongoose, { mongo } from "mongoose";
import userSchema from "./userModel";
import bookSchema from "./bookModel";
import categorySchema from "./categoryModel";
import borrowSchema from "./borrowModel";

const url =
  "mongodb+srv://weihaoliu99:lweihao99@library.hy5gakr.mongodb.net/library?retryWrites=true&w=majority";

async function main() {
  mongoose.connect(url);
}

main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("Mongo failed to connect");
  });

// 进行引入
const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);
const Borrow = mongoose.model("Borrow", borrowSchema);
const Category = mongoose.model("Category", categorySchema);

export { User, Book, Category, Borrow };
