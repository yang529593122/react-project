import "./webpackpublicpath.js"
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

setTimeout(() => {
  if (!window.__POWERED_BY_QIANKUN__) {
    ReactDOM.render(<App />, document.getElementById("marvelroot"));
  }
});
export async function bootstrap() {
  console.log("react app bootstraped");
}

export async function mount(props) {
  ReactDOM.render(<App />, document.getElementById("marvelroot"));
}

export async function unmount() {
  console.log("remove modes");
}

export async function update(props) {
  console.log("update props", props);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
