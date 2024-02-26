import type { Metadata } from "next";
import Topbar from "../shared/utils/Topbar";
import { Form } from "./Form";

export const metadata: Metadata = {
  title: "Fikiri | Login",
};

export default async function Login() {
  return (
    <div className={"relative"}>
      <Topbar />
      <Form />
    </div>
  );
}
