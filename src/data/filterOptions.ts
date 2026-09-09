import nationalities from './nationalities.json';
import ratings from './ratings.json';

export const availableNationalities: string[] = nationalities;
export const availableMinimumRatingOptions: number[] = [...ratings].reverse();
