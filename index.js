
let sendButton = document.getElementById("sendRequest");

sendButton.addEventListener("click", () => {

  let imgurl = "https://m.media-amazon.com/images/I/61Xdn8K7JgL._AC_SL1000_.jpg";

  let imgElement = new Image();
  imgElement.src = imgurl;
  imgElement.style.height = "100px";
  imgElement.style.width = "100px";
  document.body.append(imgElement);
  
});
