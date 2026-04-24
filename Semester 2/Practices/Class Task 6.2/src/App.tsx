import './CSS/App.css';
import initialBooks from './data';
import TableContent from './components/TableContent';

function App() {
    return (
        <div className="App">
            <h3>Вариант 12</h3>
            <TableContent books={ initialBooks }/>
        </div>
    );
}

export default App;