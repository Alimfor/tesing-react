import axios from 'axios';

export const GetReport = async (email) => {
    try {
        const response = await axios.get(`http://localhost:5283/api/AnswerResult/${email}`, {
            responseType: 'blob',
            headers: {
                Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            },
        });
        console.log(response);
        console.log(email);
        const blobUrl = window.URL.createObjectURL(response.data);
        const currentDate = new Date();
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}.xlsx`;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error downloading XLSX:', error);
    }
};