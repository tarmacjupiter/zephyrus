import Header from './components/Header';
import Footer from './components/Footer';
import Dropdown from "./components/Dropdown";

import {AwesomeButton} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css"

import './App.css';

function App() {
    return (
        <div className="App">
            <Header/>
            <h1>Hello!</h1>
            <AwesomeButton type='primary'
                           className='aws-btn' onPress={() => console.log("clicked!")}>Click Me!</AwesomeButton>
            <div>
                <Dropdown/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
