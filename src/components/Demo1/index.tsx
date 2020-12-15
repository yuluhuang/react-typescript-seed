import * as React from "react"
import {useSelector, shallowEqual, useDispatch} from "react-redux"
// import "./styles.css"

import {Article} from "./Article"
import {AddArticle} from "./AddArticle"
import {addArticle, removeArticle} from "../../redux/actions/demo1/actionCreators"
import {Dispatch} from "redux"

const App: React.FC = () => {
    const articles: readonly IArticle[] = useSelector(
        (state: ArticleState) => {
            debugger

            return state.demo1.articles
        },
        shallowEqual
    )
    const dispatch: Dispatch<any> = useDispatch()

    const saveArticle = React.useCallback(
        (article: IArticle) => dispatch(addArticle(article)),
        [dispatch]
    )

    return (
        <main>
            <h1>My Articles</h1>
            <AddArticle saveArticle={saveArticle} />
            {articles && articles.map((article: IArticle) => (
                <Article
                    key={article.id}
                    article={article}
                    removeArticle={removeArticle}
                />
            ))}
        </main>
    )
}

export default App
