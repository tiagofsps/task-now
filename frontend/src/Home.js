import SlideshowHome from "./SlideshowHome";
import Footer from "./Footer";
import Searchbar from "./Searchbar";
import Header from "./Header";
import Container from "react-bootstrap/Container";

function Home() {
    return (
        <>
            <Header/>
            <Container style={{marginTop: "40px", marginBottom: "40px"}}>
                <Searchbar/>
                <div className="my-5">
                    <SlideshowHome/>
                </div>
            </Container>
            <Footer/>
        </>
    );
}

export default Home;