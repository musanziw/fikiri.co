import Topbar from "@/app/shared/utils/Topbar";
import Form from "@/app/(pages)/login/Form";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Fikiri | Login",
};

export default function Login() {
    return (
        <div className={'relative'}>
            <Topbar/>
            <Form/>
        </div>
    );
}