

const dataListUrl = "/data/list.json";
let dataList;
const sozai_max = 10;

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
});

/*
let sendButton = document.getElementById("sendRequest");

sendButton.addEventListener("click", () => {

  let imgurl = "https://m.media-amazon.com/images/I/61Xdn8K7JgL._AC_SL1000_.jpg";
  let imgElement = new Image();
  imgElement.src = imgurl;
  imgElement.style.height = "719px";
  imgElement.style.width = "948px";
  document.body.append(imgElement);
  
});
*/

// 乱数生成
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

document.getElementById("sendRequest").addEventListener("click", async () => {
  console.log("Fetch の並列実行 (Promise.all の利用)");

  // 並列処理するプロミスの配列を作る (この時点で非同期処理は順次開始)
  const promiseArray = [];
  const dataArray = [];
  dataList.forEach(async (dataItemUrl) => {
    // API アクセスだけでレスポンスデータを捨てて良いなら:
    // promiseArray.push(fetchJsonData(dataItemUrl));

    // 「データをフェッチし結果を配列に収めるプロミス」を配列に追加する
    // then でチェインを繋いた結果がプロミスであることに注意
    promiseArray.push(
      fetchJsonData(dataItemUrl).then((data) => {
        console.log(data);
        dataArray.push(data);
      })
    );
  });
  promiseArray.push();

  // Promise.all でなく Promise.race を使う場合と比較してみると良い
  await Promise.all(promiseArray);
  console.log(`全てのデータ取得完了`);
  console.log(dataArray);

  for(i=0; i>sozai_max; i++){

    let imgElement = new Image();
    imgElement.src = dataArray[i].img;
    imgElement.style.height = "500px";
    imgElement.style.width = "500px";
    document.body.append(imgElement);
    console.log(`dataArray:`,dataArray[i]);
  }
  
});

