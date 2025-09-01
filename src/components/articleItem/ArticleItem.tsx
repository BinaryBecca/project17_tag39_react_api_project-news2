import React from "react"
import type { IArticle } from "../../interfaces/IArticle"

interface ArticleItemProps {
  showArticle: IArticle
  articleItem: IArticle[]
  setArticleItem: React.Dispatch<React.SetStateAction<IArticle[]>>
}

export default function ArticleItem({ showArticle, articleItem, setArticleItem }: ArticleItemProps) {
  return (
    <>
      <div>
        <h4>{showArticle.title}</h4>
        <p>{showArticle.description}</p>
        {/* Achtung Fehlermeldung, falls image nicht mehr vorhanden! */}
        {showArticle.urlToImage && <img src={showArticle.urlToImage} alt={showArticle.title} />}
      </div>
    </>
  )
}
