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
      <div className="grid grid-row-[1fr_3fr_2fr] gap-4 border p-10 h-full">
        <h4 className="font-bold">{showArticle.title}</h4>
        <p>{showArticle.description}</p>
        {/* Achtung Fehlermeldung, falls image nicht mehr vorhanden! */}
        {showArticle.urlToImage && <img className="w-full" src={showArticle.urlToImage} alt={showArticle.title} />}
      </div>
    </>
  )
}
