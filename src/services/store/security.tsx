import { Buffer } from 'buffer';


export function encode(value: string): string {
  const encodedChars = value.split("").map((char) => {
    const charCode = char.charCodeAt(0);
    return String.fromCharCode(charCode + 10); // Shift character code by 10
  });
  return encodedChars.join("");
}

export function decode(encodedValue: string): object {
  const decodedChars = encodedValue.split("").map((char) => {
    const charCode = char.charCodeAt(0);
    return String.fromCharCode(charCode - 10); // Reverse the shift to decode
  });

  const decodedString = decodedChars.join("");

  // Parse the decoded string as JSON to get the original object
  const decodedObject = JSON.parse(decodedString);

  return decodedObject;
}


export function encodeJson(value: string): string {
  return Buffer.from(value).toString('base64');
}

export function decodeJson(encodedValue: string): object {
  const decodedString = Buffer.from(encodedValue, 'base64').toString('utf8');
  return JSON.parse(decodedString);
}

