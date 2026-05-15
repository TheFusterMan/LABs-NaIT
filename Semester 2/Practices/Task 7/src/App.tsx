import React from 'react';
import './styles/App.css';
import Navbar from "./components/Navbar";
import Gallery from "./main/components/Gallery";
import Content from "./main/components/Content";
import Footer from "./components/Footer"

function App() {
    return (
        <div>
            <Navbar
                active="1"
            />
            <Gallery/>
            <Content/>
            <Footer/>
        </div>
    );
}

export default App;
