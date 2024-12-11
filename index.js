
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

