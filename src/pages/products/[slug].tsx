import {
  CommerceLayer,
  Price,
  PricesContainer,
} from "@commercelayer/react-components"
import { css } from "@nextui-org/react"
import { allProducts, Product } from "contentlayer/generated"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import useAccessToken from "../../hooks/use-access-token"

type Props = {
  clientId: string
  endpoint: string
  product?: Product
}

const ProductPage: NextPage<Props> = ({ clientId, endpoint, product }) => {
  const accessToken = useAccessToken({
    clientId,
    endpoint,
  })

  return product == null ? null : (
    <CommerceLayer accessToken={accessToken} endpoint={endpoint}>
      <Head>
        <title>{product.name}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: product.body.html }} />
      <PricesContainer>
        <Price
          skuCode={product.sku}
          className={css({
            color: "$green600",
            mr: "$8",
          })()}
          compareClassName={css({
            color: "$gray500",
            fs: "$lg",
            tdl: "line-through",
          })()}
        />
      </PricesContainer>
    </CommerceLayer>
  )
}

export default ProductPage

export const getStaticPaths: GetStaticPaths = () => ({
  paths: allProducts.map((product) => product.url),
  fallback: false,
})

export const getStaticProps: GetStaticProps<Props> = ({ params }) => ({
  props: {
    clientId: `${process.env.CL_CLIENT_ID}`,
    endpoint: `${process.env.CL_ENDPOINT}`,
    product: allProducts.find((product) =>
      product._raw.flattenedPath.endsWith([params?.slug].flat().join("/"))
    ),
  },
})
