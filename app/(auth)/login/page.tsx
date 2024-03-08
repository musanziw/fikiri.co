import type {Metadata} from "next";
import Topbar from "@/core/utils/Topbar";
import LoginForm from "./Form";

export const metadata: Metadata = {
    title: "Fikiri | Login",
};

const Login = () => {
    return (
        <div className={"relative"}>
            <Topbar/>
            <LoginForm/>
        </div>
    );
}

export default Login
