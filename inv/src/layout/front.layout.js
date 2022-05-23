import { Outlet } from "react-router-dom";
import { Footer } from "../component/common/footer/footer.component";
import { Header } from "../component/common/header/header.component";
import { Test } from "../helpers/card";
export function HomePageLayout(){
    return (
    <>
        <Header></Header>
            <Outlet></Outlet>
        <Footer></Footer>
    </>)
}