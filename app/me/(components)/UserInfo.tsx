import Image from "next/image";
import {moment} from "@/app/core/config/moment";
import {imgPath} from "@/app/core/config/api";
import {User} from "@/app/core/_models";

interface UserInfoProps {
    user: User;
}

export default function UserInfo({user}: UserInfoProps) {
    return (
        <div className="flex flex-col items-start md:items-center md:flex-row gap-4 mb-8">
            {!user?.googleImage && !user?.profile && (
                <div
                    className="relative w-32 h-32 flex flex-col items-center justify-center rounded-full bg-gray-200 overflow-hidden">
                    <h1 className={"text-xl font-bold"}>{user?.name[0]}</h1>
                </div>
            )}
            {user?.googleImage && !user?.profile && (
                <Image
                    src={user?.googleImage}
                    alt={user?.name}
                    width={100}
                    height={100}
                    className={"rounded-full w-32 h-32 object-cover"}
                />
            )}
            {user?.profile && (
                <Image src={imgPath + user?.profile} alt={user?.name} width={100} height={100}
                       className={"rounded-full w-32 h-32 object-cover"}/>
            )}
            <div className="flex flex-col items-start gap-2">
                <h1 className={"text-3xl font-bold"}>Mon compte</h1>
                <h2 className={"text-gray-600"}>
                    Inscrit {moment(user?.createdAt).fromNow(false)}
                </h2>
                <div className="flex items-center gap-2 flex-wrap text-sm">
                    <p className={"font-medium"}>{user?.email}</p>
                </div>
            </div>
        </div>
    );
}
