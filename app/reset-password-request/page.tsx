import Topbar from "@/app/core/utils/Topbar";
import {Form} from "@/app/reset-password-request/Form";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Fikiri | Reset password",
};

export default function Login() {
    return (
        <div className={"relative"}>
            <Topbar/>
            <Form/>
        </div>
    );
}
