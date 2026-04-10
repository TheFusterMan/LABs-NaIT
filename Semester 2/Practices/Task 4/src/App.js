import './CSS/App.css';
import animals from './data.js';
import Table from './components/Table.js';
import InfoNumber from "./components/InfoNumber";

function App() {
    return (
        <div className="App">
            <h3>Каталог животных</h3>
            <Table data={ animals } amountRows="15" numPage="3" isPaginated="1"/>
            <InfoNumber />
        </div>
    );
}

export default App;