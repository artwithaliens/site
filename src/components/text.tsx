import { Text as NextText, TextProps as NextTextProps } from "@nextui-org/react"
import React from "react"

type TextProps<C extends React.ElementType> = Partial<NextTextProps> &
  React.ComponentPropsWithoutRef<C> & {
    as?: C
  }

const Text = <C extends React.ElementType = "span">({
  css,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ...props
}: TextProps<C>) => (
  <NextText
    css={{
      ...((h1 || h2 || h3 || h4 || h5 || h6) && {
        fontFamily: "$brand",
        fontWeight: 700,
        textTransform: "uppercase",
      }),
      ...css,
    }}
    h1={h1}
    h2={h2}
    h3={h3}
    h4={h4}
    h5={h5}
    h6={h6}
    {...props}
  />
)

export default Text
