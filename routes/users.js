
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// 用户注册路由
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
  
    try {
      // 检查用户名是否已存在
      const existingUser = await User.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: '用户名已存在' });
      }
  
      // 对密码进行哈希加密
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // 创建新用户
      const newUser = {
        username,
        password: hashedPassword,
        email
      };
  
      await User.createUser(newUser);
  
      res.status(200).json({ message: '用户注册成功' });
    } catch (error) {
      console.log('用户注册失败：', error);
      res.status(500).json({ message: '服务器错误' });
    }
  });
  
  // 用户登录路由
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // 根据用户名获取用户信息
      const user = await User.getUserByUsername(username);
  
      if (!user) {
        return res.status(400).json({ message: '用户名或密码错误' });
      }
  
      // 验证密码
      const passwordMatch = await bcrypt.compare(password, user.Password);
  
      if (!passwordMatch) {
        return res.status(400).json({ message: '用户名或密码错误' });
      }
  
      res.status(200).json({ message: '登录成功' });
    } catch (error) {
      console.log('用户登录失败：', error);
      res.status(500).json({ message: '服务器错误' });
    }
  });
  
  // 其他用户相关的路由...
  
  module.exports = router;