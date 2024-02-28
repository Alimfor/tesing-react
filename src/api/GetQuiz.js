import axios from 'axios';

const apiEndpoint = 'http://localhost:5283/api/Quiz/start';

export async function GetQuiz() {
    try {
        const response = await axios.get(apiEndpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}