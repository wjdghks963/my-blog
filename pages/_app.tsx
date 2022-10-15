import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { Provider } from "react-redux";
import { wrapper } from "../store/index";

function MyApp({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <SWRConfig
      value={{
        fetcher: (response) => fetch(response).then((res) => res.json()),
      }}
    >
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <SessionProvider session={props.session}>
            <Component {...props.pageProps} />
          </SessionProvider>
        </ThemeProvider>
      </Provider>
    </SWRConfig>
  );
}

export default MyApp;
