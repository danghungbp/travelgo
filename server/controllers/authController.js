import User from "../models/User.js";

async function getNextId() {
  const lastUser = await User.findOne().sort({ id: -1 });
  return lastUser ? lastUser.id + 1 : 1;
}

export async function register(req, res) {
  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email này đã được sử dụng." });
    }
    const id = await getNextId();
    const user = await User.create({
      id,
      name,
      email,
      password,
      phone: phone || "",
      role: "user",
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: "Email hoặc mật khẩu không đúng." });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getCurrentUser(req, res) {
  try {
    const userId = Number(req.query.userId || req.headers["x-user-id"]);
    if (!userId) return res.json(null);
    const user = await User.findOne({ id: userId });
    res.json(user || null);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = Number(req.params.id);
    const user = await User.findOneAndUpdate({ id: userId }, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng." });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
