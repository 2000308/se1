const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
// 导入路由文件
const userRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');
const gameRoutes = require('./routes/game');

const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static('public'));

// 解析请求体
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SQL Server配置
const config = {
  user: 'sa',
  password: 'Ytd950625',
  server: '127.0.0.1',
  database: 'qwe',
};

// 连接到SQL Server数据库
sql.connect(config, (err) => {
  if (err) {
    console.log('无法连接到SQL Server数据库：', err);
  } else {
    console.log('已成功连接到SQL Server数据库');
  }
});

// 路由示例
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/profile', (req, res) => {
  res.sendFile(__dirname + '/views/profile.html');
});

// 其他路由...

// 使用路由
app.use('/users', userRoutes);
app.use('/profile', profileRoutes);
app.use('/game', gameRoutes);
// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
});