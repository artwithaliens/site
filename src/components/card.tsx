import { Card as NextCard, CardProps as NextCardProps } from "@nextui-org/react"
import React, { forwardRef } from "react"

type CardProps<C extends React.ElementType> = Partial<NextCardProps> &
  React.ComponentPropsWithoutRef<C> & {
    as?: C
  }

const Card = forwardRef<HTMLDivElement, CardProps<any>>(
  ({ children, ...props }, ref) => (
    <NextCard ref={ref} {...props}>
      {children}
    </NextCard>
  )
) as unknown as (<C extends React.ElementType = "div">(
  props: CardProps<C> & React.RefAttributes<C>
) => JSX.Element) & {
  Body: typeof NextCard.Body
  Footer: typeof NextCard.Footer
}

Card.Body = NextCard.Body

Card.Footer = NextCard.Footer

export default Card
