let videoInfo = {
  id: "",
  title: "",
  playbackTime: 0,
};

let curMark = {
  noteTitle: "",
  noteBody: "",
  playbackTime: 0,
};

let video_ids = [];
let storedCurrentVideoInfo = {
  title: "",
  marks: [],
};

window.onmessage = function (e) {
  storedCurrentVideoInfo.title = e.data.title;
  videoInfo = e.data;
  console.log("videoinfo", videoInfo);
  document.getElementById("videoTitle").innerHTML = e.data.title;
  document.getElementById("inputTime").value = e.data.playbackTime;

  chrome.storage.sync.get(["video_ids"], function (result) {
    console.log("video_ids " + JSON.stringify(result));
    video_ids = result.video_ids;
  });

  chrome.storage.sync.get([videoInfo.id], function (result) {
    if (result && result[videoInfo.id]) {
      storedCurrentVideoInfo = result[videoInfo.id];
      mapStoredVideoInfoToView(storedCurrentVideoInfo);
    }
    console.log(
      "retrieved current video info : " + JSON.stringify(storedCurrentVideoInfo)
    );
  });
};
