document.addEventListener('DOMContentLoaded', getGameRecords);

// 获取游戏记录
async function getGameRecords() {
  try {
    const response = await fetch('/game/records');
    const data = await response.json();

    if (response.ok) {
      displayGameRecords(data);
    } else {
      displayErrorMessage(data.message);
    }
  } catch (error) {
    console.log('获取游戏记录失败：', error);
    displayErrorMessage('获取游戏记录失败');
  }
}

// 显示游戏记录
function displayGameRecords(records) {
  const gameRecordsDiv = document.getElementById('game-records');

  if (records.length === 0) {
    gameRecordsDiv.innerHTML = '<p>暂无游戏记录</p >';
  } else {
    let html = '';
    records.forEach(record => {
      html += `
        <p>游戏名称: ${record.gameName}</p >
        <p>得分: ${record.score}</p >
        <hr>
      `;
    });
    gameRecordsDiv.innerHTML = html;
  }
}