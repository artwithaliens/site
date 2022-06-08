import { Price, PricesContainer } from "@commercelayer/react-components"
import { Product } from "contentlayer/generated"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import useCSS from "../hooks/use-css"
import Card from "./card"
import Text from "./text"

type ProductCardProps = {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const classes = useCSS({
    price: {
      color: "$warning",
      fontFamily: "$brand",
      fontSize: 20,
      fontWeight: "700",
    },
    compare: {
      color: "$gray500",
      tdl: "line-through",
    },
  })

  return (
    <Link passHref href={product.url}>
      <Card isHoverable isPressable as="a">
        {product.images != null && (
          <Card.Body css={{ p: 0 }}>
            <Image src={product.images[0]} width={314} height={392.5} />
          </Card.Body>
        )}
        <Card.Footer css={{ fd: "column" }}>
          <Text h4 size={24} css={{ fontSize: 24, ta: "center" }}>
            {product.name}
          </Text>
          <PricesContainer
            loader={
              <Text h5 as="span" color="warning" size={20}>
                Loading...
              </Text>
            }
          >
            <Price
              skuCode={product.sku}
              className={classes.price}
              compareClassName={classes.compare}
            />
          </PricesContainer>
        </Card.Footer>
      </Card>
    </Link>
  )
}

export default ProductCard
