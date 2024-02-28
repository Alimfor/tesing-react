import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './components/Registration';
import Quiz from './components/Quiz';

function App() {

    return (
        <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/quiz/:email" element={<Quiz />} />
        </Routes>
    );
}

export default App;