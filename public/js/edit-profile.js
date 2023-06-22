const editProfileForm = document.getElementById('edit-profile-form');
editProfileForm.addEventListener('submit', updateProfile);

// 更新个人信息
async function updateProfile(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  const body = {
    name,
    email
  };

  try {
    const response = await fetch('/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();

    if (response.ok) {
      displaySuccessMessage(data.message);
    } else {
      displayErrorMessage(data.message);
    }
  } catch (error) {
    console.log('修改个人信息失败：', error);
    displayErrorMessage('修改个人信息失败');
  }
}

// 显示成功消息
function displaySuccessMessage(message) {
  const successMessageDiv = document.getElementById('response-message');
  successMessageDiv.innerHTML = `
    <div class="alert alert-success" role="alert">
      ${message}
    </div>
  `;
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