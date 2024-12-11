

const dataListUrl = "/data/list.json";
let dataList;

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
  // レスポンスは文字列では無く ReadbleStream であることに注意
  // text() や json() メソッドでレスポンスボディを読み込む
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
});


let sendButton = document.getElementById("sendRequest");

sendButton.addEventListener("click", () => {

  let imgurl = "https://m.media-amazon.com/images/I/61Xdn8K7JgL._AC_SL1000_.jpg";
  let imgElement = new Image();
  imgElement.src = imgurl;
  imgElement.style.height = "719px";
  imgElement.style.width = "948px";
  document.body.append(imgElement);
  
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

