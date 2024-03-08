import Hero from "@/app/(components)/Hero";
import About from "@/app/(components)/About";
import Footer from "@/core/utils/Footer";
import Topbar from "@/core/utils/Topbar";
import Solutions from "./(components)/Solutions";

const Home = () => {
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
export default Home

