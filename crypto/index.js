import { createMessage, readMessage, encrypt as _encrypt, decrypt as _decrypt } from 'openpgp';


export async function encrypt(plaintextMessage, password) {
    const message = await createMessage({
        text: plaintextMessage,
    });
    const encrypted = await _encrypt({
        message, // input as Message object
        passwords: [password], // multiple passwords possible
        format: 'armored' // don't ASCII armor (for Uint8Array output)
    });
    return encrypted
}

export async function decrypt(encryptedText, password) {
    const encryptedMessage = await readMessage({
        armoredMessage: encryptedText,
    });
    const { data: decrypted } = await _decrypt({
        message: encryptedMessage,
        passwords: [password],
        format: 'armored',
    });
    return decrypted;
}


export default {
    encrypt,
    decrypt,
}