export function addThinSpaces(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
}

export function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}
