import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import "./index.css";
import { initI18n } from "i18n";
import i18n from "i18n";
import { I18nextProvider } from "react-i18next";
const container = document.getElementById("root")!;
const root = createRoot(container);

// @ts-ignore
if (window.YaGames) {
  // @ts-ignore
  window.YaGames.init().then(async ysdk => {
      console.log('Yandex SDK initialized');
      // @ts-ignore
      window.ysdk = ysdk;
      // @ts-ignore
      const player = await window.ysdk.getPlayer();
      // @ts-ignore
      window.player = player;
      console.log("Player data: ", player);
      // @ts-ignore
      const lang = window.ysdk.environment.i18n.lang;
      console.log("Detected language: ", lang);
      // show ad
      // @ts-ignore
      ysdk.adv.showFullscreenAdv({callbacks:{}})
      initI18n(lang ?? "ru").then(() => {
        root.render(
          <React.StrictMode>
            <I18nextProvider i18n={i18n}>
            <Provider store={store}>
              <App />
            </Provider>

            </I18nextProvider>
          </React.StrictMode>
        );
      })
  });
} else {
  const sp = new URL(window.location.href).searchParams;
      initI18n(sp.get("lng") ?? sp.get("lang") ?? "ru").then(() => {
  root.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </React.StrictMode>
  );
});
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
