import nationalities from './nationalities.json';
import positions from './positions.json';
import ratings from './ratings.json';

export const availableNationalities: string[] = nationalities;
export const availableBestPositions: string[] = positions;
export const availableMinimumRatingOptions: number[] = [...ratings].reverse();
