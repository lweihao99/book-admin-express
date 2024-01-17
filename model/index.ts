import mongoose, { mongo } from "mongoose";
import userSchema from "./userModel";
import bookSchema from "./bookModel";
import categorySchema from "./categoryModel";

const url =
  "mongodb+srv://weihaoliu99:lweihao99@library.hy5gakr.mongodb.net/?retryWrites=true&w=majority";

async function main() {
  mongoose.connect(url);
}

main()
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

// 进行引入
const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);
const Category = mongoose.model("Category", categorySchema);

export { User, Book, Category };
