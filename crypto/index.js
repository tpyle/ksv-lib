import { createMessage, readMessage, encrypt as _encrypt, decrypt as _decrypt } from 'openpgp';


export async function encrypt(text, password) {
    const message = await createMessage({
        text,
    });
    const encrypted = await _encrypt({
        message,
        passwords: [password],
        format: "armored",
    });
    return encrypted
}

export async function decrypt(armoredMessage, password) {
    const encryptedMessage = await readMessage({
        armoredMessage,
    });
    const { data: decrypted } = await _decrypt({
        message: encryptedMessage,
        passwords: [password],
        format: 'armored',
    });
    return decrypted;
}