// nakonako3 program

const dataListUrl = "/data/list.json";
let dataList;
const sozai_max = 10;
// 素材画像を表示するコンテナ
const vegeContainer = document.getElementById('vege-container');
const dishContainer = document.getElementById('dish-container');

// 指定 URL の JSON データをフェッチするプロミスを返す非同期関数
async function fetchJsonData(url) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };
  // fetch はリソースを取得すると解決するプロミスを返す関数
  const response = await fetch(url, options);
  const jsonData = await response.json();
  // オブジェクトを return しているが非同期関数であるため
  // 解決時に jsonData が渡されるプロミスを返していることに注意
  // 上記 fetch/json でエラーがあると解決せずリジェクトされる
  return jsonData;
}

// ページ読み込み時の下処理
window.addEventListener("DOMContentLoaded", async () => {
  // 最初にデータリストだけ取得しておく
  dataList = await fetchJsonData(dataListUrl);
  console.log(`${dataListUrl}:`, dataList);
    // 初期化
    loadVege();
});

// JSONデータを取得して素材画像を表示
async function loadVege() {
  for (const file of dataList) {
    //const response = await fetch(file);
    //const data = await response.json();
      // 素材画像を作成して表示
    const img = document.createElement('img');
    img.src = dataList.image; // 素材画像のリンク
    img.alt = dataList.name; // 野菜の名前
    img.style.cursor = 'pointer'; // クリック可能にする
    img.style.margin = '10px';
    img.addEventListener('click', () => showRandomDish(dataList)); // クリックイベント追加
    vegeContainer.appendChild(img);
  }
}

// 完成料理画像をランダムに表示
function showRandomDish(data) {
  // dishContainerをクリア
  dishContainer.innerHTML = '';

  // 完成料理数の範囲内でランダムなIDを生成
  const randomIndex = Math.floor(Math.random() * data.dishes.length);

  // 完成料理画像を表示
  const dishImg = document.createElement('img');
  dishImg.src = data.dishes[randomIndex]; // 完成料理画像のリンク
  dishImg.alt = `完成料理 (${data.name})`;
  dishImg.style.margin = '10px';
  dishContainer.appendChild(dishImg);
}


