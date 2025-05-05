import SlideshowHome from "./SlideshowHome";
import Footer from "./Footer";
import Searchbar from "./Searchbar";
import Header from "./Header";

function Home() {
    return(
        <>
            <Header/>
            <Searchbar/>
            <SlideshowHome/>
            <Footer/>
        </>
    );
}

export default Home;