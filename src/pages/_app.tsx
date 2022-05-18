import { createTheme, NextUIProvider } from "@nextui-org/react"
import { AppProps } from "next/app"
import React from "react"

const darkTheme = createTheme({
  type: "dark",
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <NextUIProvider theme={darkTheme}>
    <Component {...pageProps} />
  </NextUIProvider>
)

export default MyApp
