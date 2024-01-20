import express, { Request, Response } from "express";
import { User } from "../model";

const router = express.Router();

// 获取页面数据
router.get("/", async (req: Request, res: Response) => {
  const { current = 1, pageSize = 20, name, status } = req.query; // 从url上的query获取参数
  const data = await User.find({
    ...(name && { name }),
    ...(status && { status }),
  })
    .skip((Number(current) - 1) * Number(pageSize))
    .limit(Number(pageSize));

  const total = await User.countDocuments({
    ...(name && { name }),
    ...(status && { status }),
  }); // 获取总数

  return res.status(200).json({ data, total }); // 返回给前端
});

// 创建
router.post("/", (req: Request, res: Response) => {
  const body = req.body;
  const userModel = new User({ ...body });

  // 将表单内容存储
  userModel.save();
  return res.json({ success: true, code: 200 });
});

// 删除
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params; // 'User/1' params可以拿到id
  await User.findByIdAndDelete(id); // 根据id删除
  res.status(200).json({ success: true }); // 告诉前端删除成功
});

// 获取user信息详情
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (user) {
    res.status(200).json({ data: user, success: true });
  } else {
    res.status(500).json({ message: "User does not exist" });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const body = req.body;
  const { id } = req.params;
  await User.findOneAndUpdate({ _id: id }, body);
  return res.status(200).json({ success: true });
});

export default router;
