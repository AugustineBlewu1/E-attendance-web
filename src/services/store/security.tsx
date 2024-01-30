export function encode(value: string): string {
    const encodedChars = value.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(charCode + 10); // Shift character code by 10
    });
    return encodedChars.join('');
}

export function decode(encodedValue: string): string {
    const decodedChars = encodedValue.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return String.fromCharCode(charCode - 10); // Reverse the shift to decode
    });
    return decodedChars.join('');
}

