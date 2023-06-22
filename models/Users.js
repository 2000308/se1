const sql = require('mssql');

// 用户模型
class User {
  // 根据用户名和密码验证用户登录
  static async authenticate(username, password) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .query('SELECT * FROM Users WHERE Username = @username AND Password = @password');

      return result.recordset.length > 0;
    } catch (error) {
      throw error;
    }
  }

  // 根据用户名获取用户信息
  static async getUserByUsername(username) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Users WHERE Username = @username');

      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  // 创建新用户
  static async createUser(user) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('username', sql.VarChar, user.username)
        .input('password', sql.VarChar, user.password)
        .input('email', sql.VarChar, user.email)
        .query('INSERT INTO Users (Username, Password, Email) VALUES (@username, @password, @email)');
      
      return result.rowsAffected.length > 0;
    } catch (error) {
      throw error;
    }
  }

  // 更新用户信息
  static async updateUser(user) {
    try {
      const pool = await sql.connect();
      const result = await pool.request()
        .input('username', sql.VarChar, user.username)
        .input('name', sql.VarChar, user.name)
        .input('email', sql.VarChar, user.email)
        .query('UPDATE Users SET Name = @name, Email = @email WHERE Username = @username');
      
      return result.rowsAffected.length > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;