export function normalize(min: number, max: number, value: number) {
    return (value - min) / (max - min);
}
export function lerp(min: number, max: number, value: number) {
    return min * (1 - value) + max * value;
}