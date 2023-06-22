const express = require('express');
const router = express.Router();
// 导入其他必要的模块和数据库模型文件
// 游戏记录路由
router.get('/records', async (req, res) => {
    const username = req.session.username; // 从会话中获取当前用户的用户名
  
    try {
      // 根据用户名获取游戏记录
      const gameRecords = await Game.getGameRecords(username);
  
      res.status(200).json(gameRecords);
    } catch (error) {
      console.log('获取游戏记录失败：', error);
      res.status(500).json({ message: '服务器错误' });
    }
  });
  
  // 游戏收藏路由
  router.get('/favorites', async (req, res) => {
    const username = req.session.username; // 从会话中获取当前用户的用户名
  
    try {
      // 根据用户名获取游戏收藏
      const gameFavorites = await Game.getGameFavorites(username);
  
      res.status(200).json(gameFavorites);
    } catch (error) {
      console.log('获取游戏收藏失败：', error);
      res.status(500).json({ message: '服务器错误' });
    }
  });
  
  // 其他游戏相关的路由...
  
  module.exports = router;