import { createMessage, readMessage, encrypt, decrypt } from 'openpgp';


async function encrypt(plaintextMessage, password) {
    const message = await createMessage({
        text: plaintextMessage,
    });
    const encrypted = await encrypt({
        message, // input as Message object
        passwords: [password], // multiple passwords possible
        format: 'armored' // don't ASCII armor (for Uint8Array output)
    });
    return encrypted
}

async function decrypt(encryptedText, password) {
    const encryptedMessage = await readMessage({
        armoredMessage: encryptedText,
    });
    const { data: decrypted } = await decrypt({
        message: encryptedMessage,
        passwords: [password],
        format: 'armored',
    });
    return decrypted;
}


export const encrypt = encrypt;
export const decrypt = decrypt;