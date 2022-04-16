

export const difference = (sets: string[], collections: string[]): any => sets.filter(x => !collections.includes(x));
export const intersection = (sets: string[], collections: string[]): any => sets.filter(x => collections.includes(x));

export const cFormatter = (name: string) => {
    return name.toLowerCase().substring(0, 42)
}