import express, { Request, Response } from "express";
import { Book } from "../model";

const router = express.Router();

// 获取页面数据
router.get("/", async (req: Request, res: Response) => {
  const { current = 1, pageSize = 20, name, author, category } = req.query; // 从url上的query获取参数
  const data = await Book.find({
    ...(name && { name }),
    ...(author && { author }),
    ...(category && { category }),
  })
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize)); // 请求当前的页数的所有数据, skip 忽略当前页数-1*pageSize的总数， 并限制返回pageSize数目的数据
  const total = await Book.countDocuments({
    ...(name && { name }),
    ...(author && { author }),
    ...(category && { category }),
  }); // 获取总数

  return res.status(200).json({ data, total }); // 返回给前端
});

// 创建
router.post("/", (req: Request, res: Response) => {
  const body = req.body; // 拿到创建书籍之后的数据
  const bookModel = new Book({ ...body });

  bookModel.save();
  return res.json({ success: true, code: 200 }); // 判断是否成功
});

// 删除
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // 'book/1' params可以拿到id
  await Book.findByIdAndDelete(id); // 根据id删除
  res.status(200).json({ success: true }); // 告诉前端删除成功
});

// 详情
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (book) {
    res.status(200).json({ data: book, success: true });
  } else {
    res.status(500).json({ message: "Book does not exist" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  await Book.findOneAndUpdate({ _id: id }, body);
  return res.status(200).json({ success: true });
});

export default router;
