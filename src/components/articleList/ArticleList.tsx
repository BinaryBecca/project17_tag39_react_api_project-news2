import React, { useEffect, useState } from "react"
import type { IArticle } from "../../interfaces/IArticle"
import ArticleItem from "../articleItem/ArticleItem"

// Nutzt useEffect für den Fetch und einen useState um die Daten abzuspeichern

// url: https://newsapi.org/v2/everything?

// const BASE_URL = `https://newsapi.org/v2/everything?q=Apple&from=2025-08-15&sortBy=popularity&apiKey=${myAPI}`

interface ArticleProps {
  article: IArticle[]
  setArticle: React.Dispatch<React.SetStateAction<IArticle[]>>
}

export default function ArticleList(props: ArticleProps) {
  const myAPI = import.meta.env.VITE_apiKey
  // console.log(myAPI)
  const BASE_URL = `https://newsapi.org/v2/everything?`

  const [data, setData] = useState<null | IArticle[]>([])
  // console.log("data", data)
  // console.log("data.articles", data.articles)

  const [searchField, setSearchField] = useState<string>("")
  const [selectLanguage, setSelectLanguage] = useState<string>("")

  const [clickSearchButton, setClickSearchButton] = useState<boolean>(false)

  const searchInput = () => {
    setClickSearchButton(true)
  }

  useEffect(() => {
    // ! auf searchfield/selectLanguage zugreifen
    const fetchData = async () => {
      // const url = `${BASE_URL}&apiKey=${myAPI}`
      const url = `${BASE_URL}q=${searchField}&from=2025-08-15&sortBy=popularity&language=${selectLanguage}&apiKey=${myAPI}`
      const resp = await fetch(url)
      const respInJson = await resp.json()
      setData(respInJson.articles)
      // console.log("respInJson", respInJson)
      console.log("respInJson.articles", respInJson.articles)
    }
    if (clickSearchButton) {
      fetchData()
    }
    // fetchData()
    // !
    // if (searchInput) {
    //   fetchData()
    // }
  }, [])
  return (
    <>
      <div className="m-10 border bg-red-100">
        <h1>Breaking News</h1>

        <input
          type="text"
          value={searchField}
          placeholder="Type to search..."
          onChange={(event) => setSearchField(event.target.value)}
        />

        <select value={selectLanguage} onChange={(event) => setSelectLanguage(event.target.value)}>
          <option value="" disabled>
            Select your language
          </option>
          <option value="ar">Arabic</option>
          <option value="de">German</option>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="he">Hebrew</option>
          <option value="it">Italien</option>
          <option value="nl">Dutch</option>
          <option value="no">Norwegian</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="sv">Swedish</option>
          <option value="zh">Chinese</option>
        </select>

        <p></p>
        <button onClick={searchInput}>Search</button>
      </div>

      <div>
        {data ? (
          <>
            <div>
              {data.map((itemObj: IArticle, index) => {
                return (
                  <div key={index}>
                    <ArticleItem showArticle={itemObj} articleItem={props.article} setArticleItem={props.setArticle} />
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <p>No Article found</p>
        )}
      </div>
    </>
  )
}
