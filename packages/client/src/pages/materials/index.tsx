import { Card } from "./components/Card"
import { Header } from "../../components/header"
import { Page } from "../../components/page"

import Style from "./materials.module.scss"
import { useSelector } from "react-redux"
import { IRootState } from "store/index"
import { Loader } from "pages/loader"



export const Materials = () => {
    const materialsData = useSelector(
        (state: IRootState) => state.auth.materialData.materials
    );
    const materialsIsLoading = useSelector(
        (state: IRootState) => state.auth.materialData.isLoading
    )
    return (
        <>
        { materialsIsLoading ? 
            <Loader /> :  
            <Page header={<Header>Дополнительные материалы</Header>} className={Style.page}>
                {materialsData?.map(({_id, materialName, materialDescription, materialLink}) => (
                    <Card key={_id} materialName={materialName} materialDescription={materialDescription} materialLink={materialLink}/>
                ))}
            </Page>
            
        }
        </>
        
    )
}
