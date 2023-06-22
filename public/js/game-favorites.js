document.addEventListener('DOMContentLoaded', getGameFavorites);

// 获取游戏收藏
async function getGameFavorites() {
  try {
    const response = await fetch('/game/favorites');
    const data = await response.json();

    if (response.ok) {
      displayGameFavorites(data);
    } else {
      displayErrorMessage(data.message);
    }
  } catch (error) {
    console.log('获取游戏收藏失败：', error);
    displayErrorMessage('获取游戏收藏失败');
  }
}

// 显示游戏收藏
function displayGameFavorites(favorites) {
  const gameFavoritesDiv = document.getElementById('game-favorites');

  if (favorites.length === 0) {
    gameFavoritesDiv.innerHTML = '<p>暂无游戏收藏</p >';
  } else {
    let html = '';
    favorites.forEach(favorite => {
      html += `
        <p>游戏名称: ${favorite.gameName}</p >
        <p>发布日期: ${favorite.releaseDate}</p >
        <hr>
      `;
    });
    gameFavoritesDiv.innerHTML = html;
  }
}