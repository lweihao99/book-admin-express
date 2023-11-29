import mongoose, { mongo } from "mongoose";
import userSchema from "./userModel";
import bookSchema from "./bookModel";

const uri =
  "mongodb+srv://weihaoliu99:Lweihao99-@liuw-projects.3bbubhl.mongodb.net/?retryWrites=true&w=majority";

async function main() {
  mongoose.connect(uri);
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

export { User, Book };
