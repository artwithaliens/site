import { parse } from "csv-parse/sync"
import fs from "fs"
import slugger from "github-slugger"
import { camelCase, omit } from "lodash"
import path from "path"
import { stringify } from "yaml"

const content = fs.readFileSync(
  path.resolve(__dirname, "../wc-product-export-17-5-2022-1652795081325.csv")
)

const products: any[] = parse(content, {
  cast: (value, context) => {
    if (context.header) {
      return value
    }
    if (
      typeof context.column === "string" &&
      ["categories", "images", "tags"].includes(context.column)
    ) {
      return value.split(",").map((v) => v.trim())
    }
    if (value.match(/^[\d\.]+$/)) {
      return Number(value)
    }
    if (value === "") {
      return undefined
    }
    return value
  },
  columns: (record: string[]) => record.map((column) => camelCase(column)),
  relaxColumnCount: true,
  trim: true,
})

products.forEach((product) => {
  if (product.type === "simple") {
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../content/products/${slugger
          .slug(product.name)
          .replace(/-+/g, "-")}.md`
      ),
      `---
${stringify(omit(product, ["description", "type", "shortDescription"]))}---

${product.shortDescription?.replace(/\\n/g, "\n") ?? ""}

${product.description?.replace(/\\n/g, "\n") ?? ""}`.trimEnd() + "\n"
    )
  }
})
