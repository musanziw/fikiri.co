import {Hero} from "@/app/(components)/Hero";
import {About} from "@/app/(components)/About";
import {Footer} from "@/app/core/utils/Footer";
import Topbar from "@/app/core/utils/Topbar";
import Solutions from "./(components)/Solutions";

export default function Home() {
    return (
        <main className={"relative"}>
            <Topbar/>
            <Hero/>
            <Solutions/>
            <About/>
            <Footer/>
        </main>
    );
}
