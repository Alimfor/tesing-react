export const CurrentTime = () => {
    const now = new Date();

    const padZero = (num) => (num < 10 ? `0${num}` : num);

    const day = padZero(now.getDate());
    const month = padZero(now.getMonth() + 1); // Months are zero-indexed
    const year = now.getFullYear();
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());

    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
};