import mongoose from "mongoose";

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
