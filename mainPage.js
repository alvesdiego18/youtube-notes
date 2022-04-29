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

function checkVideo() {
  if (!video_ids || video_ids.indexOf(videoInfo.id) == -1) {
    if (!video_ids) video_ids = [];

    video_ids.push(videoInfo.id);
    var keyValue = {};
    keyValue["video_ids"] = video_ids;
    chrome.storage.sync.set(keyValue, function () {});
  }
}

function saveNote(playbackTime, title, description) {
  // checkVideo();
  // treat playbackTime as the primary key
  let newMarkId = guid();
  storedCurrentVideoInfo.marks.push({
    id: newMarkId,
    playbackTime: playbackTime,
    title: title,
    description: description,
  });
  let keyValue = {};
  keyValue[videoInfo.id] = storedCurrentVideoInfo;
  chrome.storage.sync.set(keyValue, function () {
    // On Create
  });
}

function deleteNote(mark) {
  let indexOfItemToDelete = storedCurrentVideoInfo.marks.indexOf(
    storedCurrentVideoInfo.marks.filter((m) => m.id == mark.id)[0]
  );
  if (indexOfItemToDelete != -1) {
    storedCurrentVideoInfo.marks.splice(indexOfItemToDelete, 1);

    let keyValue = {};
    keyValue[videoInfo.id] = storedCurrentVideoInfo;
    chrome.storage.sync.set(keyValue, function () {
      // On Delete
    });
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
}
