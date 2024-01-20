import express, { Request, Response } from "express";
import { User } from "../model";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";

const router = express.Router();
router.post("/", async (req: Request, res: Response) => {
  const { name, password } = req.body;
  const user = await User.findOne({ name, password });

  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ success: true, data: user, token });
  } else {
    res.status(500).json({ message: "User or Password wrong." });
  }
});

export default router;
