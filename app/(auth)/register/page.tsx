import Topbar from "@/core/utils/Topbar";
import type {Metadata} from "next";
import RegisterForm from "./Form";

export const metadata: Metadata = {
    title: "Fikiri | Register",
};

const Register = () => {
    return (
        <div className={"relative"}>
            <Topbar/>
            <RegisterForm/>
        </div>
    );
}

export default Register
