import { CssBaseline } from "@nextui-org/react"
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document"

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      // eslint-disable-next-line react/jsx-no-useless-fragment
      styles: [<>{initialProps.styles}</>],
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>{CssBaseline.flush()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
