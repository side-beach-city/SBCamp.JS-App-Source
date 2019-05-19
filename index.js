const DBNAME = 'sampleDB';
const STORENAME = 'post';
function addpost(post){
  let viewarea = document.getElementById("viewarea");
  let name = document.createElement("dt");
  let content = document.createElement("dd");
  let time = document.createElement("dd");
  name.textContent = post.name;
  content.textContent = post.content;
  time.textContent = post.time.getFullYear() + "年" +
    (post.time.getMonth() + 1) + "月" +
    post.time.getDate() + "日" +
    post.time.getHours() + "時" +
    post.time.getMinutes() + "分" +
    post.time.getSeconds() + "秒";
  viewarea.appendChild(name);
  viewarea.appendChild(content);
  viewarea.appendChild(time);
}

document.addEventListener("DOMContentLoaded", function(e){
  document.getElementById("postform").addEventListener("submit", function(e){
    let post = {
      name: document.getElementById("name").value,
      content: document.getElementById("content").value,
      time: new Date()
    }
    let data = localStorage.getItem(STORENAME);
    if(data == null){
      data = [];
    }else{
      data = JSON.parse(data);
    }
    data.push(post);
    localStorage.setItem(STORENAME, JSON.stringify(data));

    alert("投稿しました。");
    document.getElementById("name").value = "";
    document.getElementById("content").value = "";
    e.preventDefault();
    addpost(post);
  });
  let data = localStorage.getItem(STORENAME);
  if(data != null){
    data = JSON.parse(data);
    data.forEach(e => {
      e.time = new Date(e.time);
      addpost(e)
    });
  }
  document.getElementById("submit_button").disabled = false;
});
