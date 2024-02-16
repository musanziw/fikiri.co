import React from "react";
import Topbar from "@/app/shared/utils/Topbar";
import { Form } from "@/app/(pages)/solutions/update/[id]/Form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fikiri | Login",
};

export default function Solution({ params }: { params: { id: string } }) {
  return (
    <div className={"relative"}>
      <Topbar />
      <Form params={params} />
    </div>
  );
}
