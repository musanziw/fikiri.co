import React from "react";
import Topbar from "@/core/utils/Topbar";
import UpdateSolutionFormfrom from "./Form";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Fikiri | Update solution",
};

const UpdateSolution = ({params}: { params: { id: string } }) => {
    return (
        <div className={"relative"}>
            <Topbar/>
            <UpdateSolutionFormfrom params={params}/>
        </div>
    );
}

export default UpdateSolution
