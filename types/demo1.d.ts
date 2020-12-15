interface IArticle {
    id: number
    title: string
    body: string
}

type ArticleState = {
    demo1: any;
    articles: IArticle[]
}

type ArticleAction = {
    type: string
    article: IArticle
}

type DispatchType = (args: ArticleAction) => ArticleAction
