import { Card } from "./components/Card"
import { Header } from "../../components/header"
import { Page } from "../../components/page"

import Style from "./main.module.scss"
import { useSelector } from "react-redux"
import { IRootState } from "store/index"
import { Loader } from "pages/loader"



export const MainPage = () => {
    const newsData = useSelector(
        (state: IRootState) => state.auth.newsData.articles
    );
    const newsIsLoading = useSelector(
        (state: IRootState) => state.auth.newsData.isLoading
    )
    return (
        <>
        { newsIsLoading ? 
            <Loader /> :  
            <Page header={<Header>Главная</Header>} className={Style.page}>
                {newsData?.map(({source:{id, name}, author, title, description, url, urlToImage, publishedAt}) => (
                    title!=="[Removed]"?
                    <Card key={id} title={title} description={description} link={url} publishedAt={publishedAt}/>:""
                ))}
            </Page>
            
        }
        </>
        
    )
}
