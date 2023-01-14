import KeyEntryField from "./KeyEntryField.js";


/**
 * @typedef {Object} KeyEntryJSON
 * @property {?string} username
 * @property {?string} email
 * @property {import("./KeyEntryField.js").KeyEntryFieldJSON[]} fields
 * @property {?string} identityProvider
 * @property {?string} notes
 */

class KeyEntry {
    /**
     * 
     * @param {?string} username The username associated with this entry
     * @param {?string} email The email associated with this entry
     * @param {KeyEntryField[]} fields A list of KeyEntryFields for additional fields for this entry
     * @param {?string} identityProvider The identity provider associated with this KeyEntry
     * @param {?string} notes Any notes on this entry
     */
    constructor(username, email, fields, identityProvider, notes) {
        if (!(username && typeof(username) == 'string') && !(email && typeof(email) == 'string')) {
            throw new Error(`A KeyEntry must have a valid username or email`);
        }
        if (!(fields && Array.isArray(fields) && fields.length > 0 && fields.map(f=>f instanceof KeyEntryField).reduce((a,c)=>a && c, true)) && !(identityProvider && typeof(identityProvider) == 'string')) {
            throw new Error(`A KeyEntry must have a field, or be associated with an identity provider`);
        }
        this.username = username || null;
        this.email = email || null;
        this.fields = fields || [];
        this.identityProvider = identityProvider || null;
        this.notes = notes || null;
    }

    /**
     * Creates a KeyEntry based on the JSON representation
     * @param {KeyEntryJSON} jsonObject 
     * @returns The KeyEntry equivalent to the provided object
     */
    static load(jsonObject) {
        return new KeyEntry(
            jsonObject.username,
            jsonObject.email,
            (jsonObject.fields || []).map(f => KeyEntryField.load(f)),
            jsonObject.identityProvider,
            jsonObject.notes
        );
    }

    /**
     * Converts a KeyEntry into its object format
     * @returns {KeyEntryJSON} The KeyEntry in object format
     */
    dump() {
        return {
            username: this.username,
            email: this.email,
            fields: this.fields.map(f=>f.dump()),
            identityProvider: this.identityProvider,
            notes: this.notes,
        }
    }
}


export default KeyEntry;