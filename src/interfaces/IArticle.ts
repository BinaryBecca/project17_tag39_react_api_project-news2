import type { ISource } from "./ISource"

export interface IArticle {
  source: ISource
  author: null | string
  title: string
  description: string
  url: string
  urlToImage: null | string
  publishedAt: Date
  content: string
}
