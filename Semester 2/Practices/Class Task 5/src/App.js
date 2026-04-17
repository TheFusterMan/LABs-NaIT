import './CSS/App.css';
import words from './data.js';
import DrawWords from './components/DrawWords.js';

function App() {
    return (
        <div className="App">
            <DrawWords data={words} />
        </div>
    );
}

export default App;