import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Bloglist from "../components/Bloglist";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";

const Home =()=>{
    return (
        <>
            {/* <h1>Home</h1> */}
            <Navbar />
            <Header />
            <Bloglist />
            <NewsLetter/>
            <Footer />
        </>
    )
}

export default Home;