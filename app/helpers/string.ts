export function addThinSpaces(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u2009');
}
