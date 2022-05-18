import { defineDocumentType, makeSource } from "contentlayer/source-files"
import remarkEmoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkSlug from "remark-slug"

export const Product = defineDocumentType(() => ({
  name: "Product",
  filePathPattern: "products/*.md",
  contentType: "markdown",
  fields: {
    categories: {
      type: "list",
      of: {
        type: "string",
      },
    },
    images: {
      type: "list",
      of: {
        type: "string",
      },
    },
    name: {
      type: "string",
      required: true,
    },
    sku: {
      type: "string",
      required: true,
    },
    tags: {
      type: "list",
      of: {
        type: "string",
      },
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Product],
  markdown: {
    remarkPlugins: [remarkSlug, remarkGfm, remarkEmoji],
  },
})
