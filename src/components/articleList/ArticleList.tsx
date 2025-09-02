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

  // const [emptyFieldUserMessage, setEmptyFieldUserMessage] = useState<string>("Please enter something into the search field")

  const handleSearchClick = () => {
    if (searchField === "") {
      alert("Please enter something into the search field")
      return
    }
    setClickSearchButton(!clickSearchButton)
  }
  console.log(clickSearchButton)

  useEffect(
    () => {
      const fetchData = async () => {
        // const url = `${BASE_URL}&apiKey=${myAPI}`
        const url = `${BASE_URL}q=${searchField}&from=2025-08-15&sortBy=popularity&language=${selectLanguage}&apiKey=${myAPI}`
        const resp = await fetch(url)
        const respInJson = await resp.json()
        setData(respInJson.articles)
        // console.log("respInJson", respInJson)
        // console.log("respInJson.articles", respInJson.articles)
      }
      if (clickSearchButton) {
        fetchData()
        // console.log("FetchData:", fetchData())
      }
      // fetchData()
      // !
      // if (searchInput) {
      //   fetchData()
      // }
    },
    [clickSearchButton]
    // [searchField, selectLanguage]
  )

  return (
    <>
      <div className="flex flex-col items-center justify-center m-10 p-5 border bg-gray-100 gap-4">
        <h1 className="text-2xl font-bold">Breaking News</h1>

        <div className="flex flex-row justify-evenly gap-20 pl-4 pr-4">
          <input
            className="min-w-fit border bg-white p-2"
            type="text"
            value={searchField}
            placeholder=" Type to search..."
            onChange={(event) => setSearchField(event.target.value)}
          />

          <select
            className="min-w-fit border bg-white p-2"
            value={selectLanguage}
            onChange={(event) => setSelectLanguage(event.target.value)}>
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
        </div>

        <p></p>
        <button
          className="flex border-2 bg-gray-300 pt-2 pr-10 pb-2 pl-10 font-bold cursor-pointer
          hover:bg-black hover:border-2-gray-300 hover:text-gray-300"
          onClick={handleSearchClick}>
          Search
        </button>
      </div>

      <div>
        {data ? (
          <>
            <div className="grid grid-cols-3 gap-2 m-2">
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
          <p className="flex items-center justify-center text-2xl">No Article found</p>
        )}
      </div>
    </>
  )
}
