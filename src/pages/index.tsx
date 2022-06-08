import {
  CommerceLayer,
  OrderContainer,
  OrderStorage,
} from "@commercelayer/react-components"
import { Container, Grid } from "@nextui-org/react"
import { allProducts, Product } from "contentlayer/generated"
import { GetStaticProps, NextPage } from "next"
import ProductCard from "../components/product-card"
import useAccessToken from "../hooks/use-access-token"

type Props = {
  clientId: string
  endpoint: string
  products: Product[]
}

const FilterPage: NextPage<Props> = ({ clientId, endpoint, products }) => {
  const accessToken = useAccessToken({
    clientId,
    endpoint,
  })

  return !endpoint ? null : (
    <CommerceLayer accessToken={accessToken} endpoint={endpoint}>
      <OrderStorage persistKey="order">
        <OrderContainer>
          <Container>
            <Grid.Container gap={2}>
              {products.map((product) => (
                <Grid key={product._id} xs={6} sm={4} md={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid.Container>
          </Container>
        </OrderContainer>
      </OrderStorage>
    </CommerceLayer>
  )
}

export default FilterPage

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    clientId: `${process.env.CL_CLIENT_ID}`,
    endpoint: `${process.env.CL_ENDPOINT}`,
    products: allProducts.sort((a, b) => a.publishDate - b.publishDate),
  },
  revalidate: 60,
})
