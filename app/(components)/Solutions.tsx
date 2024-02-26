"use client";

import React from "react";
import { useQuery } from "react-query";
import { getMany } from "../shared/_requests";
import { Solution } from "../shared/models/Solution";
import Image from "next/image";
import img from "@/public/bg.jpg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Solutions() {
  const { data } = useQuery("solutions-mapped", async () =>
    getMany<Solution[]>("solutions/mapped")
  );
  const solutions = data ?? [];

  const sliceDescription = (description: string) => {
    return description.length > 100
      ? description.slice(0, 170) + "..."
      : description;
  };

  return (
    <div className={"p-8 mx-auto max-w-screen-lg"}>
      <h2 className={"text-2xl mb-6 text-gray-900 font-semibold"}>
        Les solutions cartographiées
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
        {Array.from({ length: 8 }, (_, i) => {
          return (
            <div className="flex flex-col" key={i}>
              <Image
                src={img}
                alt="img"
                height={250}
                width={300}
                className="mb-4"
              />
              <h3 className="font-semibold text-lg text-gray-800 mb-3">
                Le titre de la solution
              </h3>
              <p className="mb-1">
                {sliceDescription(`Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit possimus porro, accusamus est deserunt facilis
                architecto at obcaecati provident esse labore fuga ullam ipsam
                doloribus ipsum, asperiores suscipit odit repellat?`)}
              </p>
              <ul className="flex flex-wrap mb-4">
                <li className="mr-1.5 mt-2">
                  <div className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-500 ">
                    Inclusion financière et numérique
                  </div>
                </li>
                <li className="mr-1.5 mt-2">
                  <div className="flex items-center rounded-full bg-blue-400/10 px-3 py-1 text-xs font-medium leading-5 text-blue-500 ">
                    Mécanisation légère agricole
                  </div>
                </li>
              </ul>
              <Link
                href={"/"}
                className="flex items-center justify-between text-blue-500 text-xs border-2 rounded-sm px-6 py-2.5 border-blue-400 font-bold uppercase hover:bg-blue-400 hover:text-gray-50 transition-colors duration-300"
              >
                Plus d&apos;informations <ArrowRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
