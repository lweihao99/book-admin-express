import express, { Request, Response } from "express";
import { Book, Borrow } from "../model";

const router = express.Router();

// 获取借阅书籍信息
router.get("/", async (req: Request, res: Response) => {
  const { current, pageSize, book, user, status } = req.query; // 获取查询字符

  // 统计指定documents的数量
  const total = await Borrow.countDocuments({
    ...(book && { book }),
    ...(user && { user }),
    ...(status && { status }),
  });

  // 如果用户是普通用户，则只返回自己的借阅，若是管理员返回所有的
  let newUser = user;

  const data = await Borrow.find({
    ...(book && { book }),
    ...(newUser && { user: newUser }),
    ...(status && { status }),
  })
    .sort({ updatedAt: -1 })
    .skip((Number(current) - 1) * Number(pageSize))
    .populate(["user", "book"]);

  res.status(200).json({ message: true, data, total });
});

// 进行借书
router.post("/", async (req: Request, res: Response) => {
  const { book, user } = req.body;
  const borrow = new Borrow(req.body);

  const bookData = await Book.findOne({ _id: book });

  if (bookData) {
    // 若库存大于1，则可以借阅
    if (bookData.stock > 0) {
      await borrow.save();

      // 保存成功后库存减少1
      await Book.findByIdAndUpdate(bookData._id, { stock: bookData.stock - 1 });

      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ message: "书籍库存不足" });
    }
  } else {
    res.status(500).json({ message: "书籍不存在" });
  }

  const obj = await borrow.save();
  res.status(200).json({ message: true });
});

// 查询单个借阅
router.get("/:id", async (req: Request, res: Response) => {
  const data = await Borrow.findOne({ _id: req.params.id });
  if (data) {
    res.status(200).json({ success: true, data });
  } else {
    res.status(500).json({ message: "该借阅不存在" });
  }
});

// -
router.put("/:id", async (req: Request, res: Response) => {});

// 删除单个借阅信息
router.delete("/:id", async (req: Request, res: Response) => {
  const borrow = await Borrow.findById(req.params.id);
  if (borrow) {
    await Borrow.deleteOne({ _id: req.params.id });
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ message: "该借阅不存在" });
  }
});

// 书籍归还
router.put("/back/:id", async (req: Request, res: Response) => {
  const borrow = await Borrow.findOne({ _id: req.params.id });
  if (borrow) {
    if (borrow.status === "off") {
      res.status(500).json({ message: "当前书籍已被还" });
    } else {
      borrow.status = "off";
      borrow.backAt = Date.now();
      await borrow.save();
      // 书籍归还后需要更新书的库存
      const book = await Book.findOne({ _id: borrow.book });

      if (book) {
        book.stock += 1;
        await book.save();
      } else {
        res.status(500).json({ message: "书籍不存在" });
      }

      // 书籍归还后，把库存增加一个
      res.status(200).json({ success: true });
    }
  } else {
    res.status(500).json({ message: "该借阅不存在" });
  }
});

export default router;
