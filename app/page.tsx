import {Hero} from "@/app/components/Hero";
import {About} from "@/app/components/About";
import {Footer} from "@/app/shared/utils/Footer";
import Sdg from "@/app/components/Sdg";
import Topbar from "@/app/shared/utils/Topbar";

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
