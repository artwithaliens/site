/* eslint-disable import/no-unresolved */
import { defineDocumentType, makeSource } from "contentlayer/source-files"
import fs from "node:fs"
import path from "node:path"
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
      resolve: (product) => `/${product._raw.flattenedPath}`,
    },
    publishDate: {
      type: "date",
      resolve: (product) =>
        fs.statSync(path.resolve(`./content/${product._raw.sourceFilePath}`))
          .ctime,
    },
  },
}))

export const Tag = defineDocumentType(() => ({
  name: "Tag",
  filePathPattern: "tags/*.md",
  contentType: "markdown",
  fields: {
    name: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (tag) => `/${tag._raw.flattenedPath}`,
    },
  },
}))

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Product, Tag],
  markdown: {
    remarkPlugins: [remarkSlug, remarkGfm, remarkEmoji],
  },
})
