const DBNAME = 'sampleDB';
const STORENAME = 'post';
function addpost(post){
  let viewarea = document.querySelector("#viewarea");
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
var db;
document.addEventListener("DOMContentLoaded", function(e){
  document.querySelector("#postform").addEventListener("submit", function(e){
    let post = {
      name: document.querySelector("#name").value,
      content: document.querySelector("#content").value,
      time: new Date()
    }
    // DB書き込み
    let transaction = db.transaction(STORENAME, 'readwrite');
    let os = transaction.objectStore(STORENAME);
    let request = os.add(post);
    request.onsuccess = () => {
      console.log("db add success");
    }

    alert("投稿しました。");
    document.querySelector("#name").value = "";
    document.querySelector("#content").value = "";
    e.preventDefault();
    addpost(post);
  });
  // DB作成
  let openReq  = indexedDB.open(DBNAME, 1);
  openReq.onupgradeneeded = function(e){
    let dbsetup = e.target.result;
    dbsetup.createObjectStore(STORENAME, { keyPath: "id", autoIncrement: true});
    console.log("db created");
  }
  openReq.onsuccess = function(e){
    db = e.target.result;
    let transaction = db.transaction(STORENAME, "readonly");
    let os = transaction.objectStore(STORENAME);
    document.querySelector("#submit_button").disabled = false;
    os.openCursor().onsuccess = (e) => {
      let c = e.target.result;
      if(c){
        console.log("loaded " + c.key);
        addpost(c.value);
        c.continue();
      }
    }
  }
});
