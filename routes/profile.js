const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 获取个人信息路由
router.get('/', async (req, res) => {
    const username = req.session.username; // 从会话中获取当前用户的用户名
  
    try {
      // 根据用户名获取用户信息
      const user = await User.getUserByUsername(username);
  
      if (!user) {
        return res.status(400).json({ message: '用户不存在' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.log('获取个人信息失败：', error);
      res.status(500).json({ message: '服务器错误' });
    }
  });
  
  // 修改个人信息路由
  router.put('/', async (req, res) => {
    const { username } = req.session; // 从会话中获取当前用户的用户名
    const { name, email } = req.body;
  
    try {
      // 更新用户信息
      await User.updateUser({ username, name, email });
  
      res.status(200).json({ message: '个人信息已更新' });
    } catch (error) {
      console.log('修改个人信息失败：', error);
      res.status(500).json({ message: '服务器错误' });
    }
  });
  
  // 其他个人信息相关的路由...
  
  module.exports = router;