import "@fontsource/amatic-sc"
import "@fontsource/lato"
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { AppProps } from "next/app"
import React from "react"

const darkTheme = createTheme({
  type: "dark",
  theme: {
    fonts: {
      sans: '"Lato", sans-serif',
      brand: '"Amatic SC", sans-serif',
    },
  },
})

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <NextUIProvider theme={darkTheme}>
    <Component {...pageProps} />
  </NextUIProvider>
)

export default MyApp
