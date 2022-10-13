import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import { wrapper } from "../store/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const persistor = persistStore(store);
  return (
    <SWRConfig
      value={{
        fetcher: (response) => fetch(response).then((res) => res.json()),
      }}
    >
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider attribute="class">
            <SessionProvider session={props.session}>
              <Component {...props.pageProps} />
            </SessionProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;
