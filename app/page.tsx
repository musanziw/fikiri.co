import {Hero} from "@/app/components/Hero";
import {About} from "@/app/components/About";
import {Footer} from "@/app/shared/components/Footer";
import Sdg from "@/app/components/Sdg";
import Topbar from "@/app/shared/components/Topbar";

export default function Home() {
    return (
        <main className={'relative'}>
            <Topbar/>
            <Hero/>
            <Sdg/>
            <About/>
            <Footer/>
        </main>
    );
}
