import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TicTacToe3Marks from './components/TicTacToe3Marks';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/tic-tac-toe-3-marks">Tic Tac Toe (3 Marks)</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Routes>
          <Route path="/tic-tac-toe-3-marks" element={<TicTacToe3Marks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

