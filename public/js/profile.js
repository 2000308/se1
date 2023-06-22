document.addEventListener('DOMContentLoaded', getUserInfo);

// 获取用户信息
async function getUserInfo() {
  try {
    const response = await fetch('/users/profile');
    const data = await response.json();

    if (response.ok) {
      displayUserInfo(data);
    } else {
      displayErrorMessage(data.message);
    }
  } catch (error) {
    console.log('获取用户信息失败：', error);
    displayErrorMessage('获取用户信息失败');
  }
}

// 显示用户信息
function displayUserInfo(user) {
  const userInfoDiv = document.getElementById('user-info');
  const html = `
    <p>用户名: ${user.username}</p >
    <p>姓名: ${user.name}</p >
    <p>电子邮箱: ${user.email}</p >
  `;
  userInfoDiv.innerHTML = html;
}

// 显示错误消息
function displayErrorMessage(message) {
  const errorMessageDiv = document.getElementById('response-message');
  errorMessageDiv.innerHTML = `
    <div class="alert alert-danger" role="alert">
      ${message}
    </div>
  `;
}