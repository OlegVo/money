export function generateId(): string {
    let d = new Date().getTime();
    if (typeof(window) !== 'undefined' && window.performance && typeof window.performance.now === 'function') {
        // use high-precision timer if available
        d += performance.now();
    }
    return 'xxxxxxxxxx'.replace(/x/g, (c) => {
        /* tslint:disable */
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r&0x3 | 0x8)).toString(16);
        /* tslint:enable */
    });
}
