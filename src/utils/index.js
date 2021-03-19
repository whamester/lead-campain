const CryptoJS = require("crypto-js");

export const encryptData = (text) => {
  const keystring = "XXXXXXXXXX";
  const keyBytes = CryptoJS.PBKDF2(keystring, text + keystring, {
    keySize: 48 / 4,
    iterations: 1000,
  });
  // take first 32 bytes as key (like in C# code)
  const key = new CryptoJS.lib.WordArray.init(keyBytes.words, 32);
  // skip first 32 bytes and take next 16 bytes as IV
  const iv = new CryptoJS.lib.WordArray.init(keyBytes.words.splice(32 / 4), 16);
  // use the same encoding as in C# code, to convert string into bytes
  const data = CryptoJS.enc.Utf16LE.parse(keystring);
  const encrypted = CryptoJS.AES.encrypt(data, key, { iv: iv });

  return `${encrypted}`;
};
