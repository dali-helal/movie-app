export const minutesTohours = (minutes:number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${hours}h ${mins}m`;
};

export const ratingToPercentage = (rating: number | undefined): number => {
    if (rating === undefined) return 0;
    return Math.round(rating * 10)
};

export const resolveRatingColor = (rating:number) => {
    if (rating >= 7) {
        return "green.400";
    } else if (rating >= 5) {
        return "orange.400";
    } else {
        return "red.400";
    }
};