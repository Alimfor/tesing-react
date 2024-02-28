export const shuffleAnswers = (question) => {
    if (!question) {
        return [];
    }
    const unshuffledAnswers = [
        ...question.answers,
    ];
    return unshuffledAnswers
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
};