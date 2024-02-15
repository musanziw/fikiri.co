import Topbar from "@/app/shared/utils/Topbar";
import Form from "@/app/(pages)/reset-password-request/Form";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Fikiri | Reset password",
};

export default function Login() {
    return (
        <div className={'relative'}>
            <Topbar/>
            <Form/>
        </div>
    );
}