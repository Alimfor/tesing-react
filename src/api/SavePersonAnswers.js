import axios from 'axios';

const apiEndpoint = 'http://localhost:5283/api/PersonAnswer/new';

export async function SavePersonAnswers(personAnswers) {
    try {
        await axios.post(apiEndpoint, personAnswers);
    } catch (error) {
        console.log("222");
        console.error('Error fetching data:', error);
    }
}