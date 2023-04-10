import { ReactNode } from "react";
import { RouterType } from "../types/menu-type.type";
import { Route } from "react-router-dom";

export default function GenerateRouter(routers: RouterType[]) : ReactNode {
    // return routers.map((router, index) => (
    //     router.index ? (
    //         <Route 
    //         index 
    //         path={router.path} 
    //         element={router.index},
    //         ></Route>
    //     )
    // )

    return(
        <></>
    )
}