import request from "./request";
import { apiBaseUrl } from "../consts/env";
let _wr = function(type) {
  let orig = window.history[type];

  return function() {
    let rv = orig.apply(this, arguments);

    let e = new Event(type.toLowerCase());

    e.arguments = arguments;

    window.dispatchEvent(e);

    return rv;
  };
};

window.history.pushState = _wr("pushState");

window.history.replaceState = _wr("replaceState");

window.addEventListener("pushstate", function(event) {
  // console.log(event, 888);
});

window.addEventListener("replacestate", function(event) {
  // console.log(event, 999);
});
window.onbeforeunload = function(e) {
  e = e || window.event;
  let arr = window.location.href.split("&");
  console.log(window.location.href, 99);
  if (arr && arr[arr.length - 1] === "operator=true") {
    request
      .post(`${apiBaseUrl}/api/statistics/add`, {
        duration:
          new Date().valueOf() - sessionStorage.getItem("startpagetime"),
        action: 10006
      })
      .then(res => {
        console.log(res);
      });
  } else if (arr && arr[arr.length - 1] === "operator=false") {
    request
      .post(`${apiBaseUrl}/api/statistics/add`, {
        duration:
          new Date().valueOf() - sessionStorage.getItem("startpagetime"),
        action: 10005
      })
      .then(res => {
        console.log(res);
      });
  } else if (window.location.href.indexOf("/login") === -1) {
    request
      .post(`${apiBaseUrl}/api/statistics/add`, {
        duration:
          new Date().valueOf() - sessionStorage.getItem("startpagetime"),
        url: window.location.href
      })
      .then(res => {
        console.log(res);
      });
  }
};
