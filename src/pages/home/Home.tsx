import React, { useState } from "react"
import type { IArticle } from "../../interfaces/IArticle"
import ArticleList from "../../components/articleList/ArticleList"

export default function Home() {
  const [article, setArticle] = useState<IArticle[]>([])
  return (
    <>
      <ArticleList article={article} setArticle={setArticle} />
    </>
  )
}
