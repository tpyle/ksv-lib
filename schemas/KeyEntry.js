import KeyEntryField from "./KeyEntryField.js";


class KeyEntry {
    constructor(username, email, fields, identityProvider, notes) {
        if (!(username && typeof(username) == 'string') || !(email && typeof(email) == 'string')) {
            throw new Error(`A KeyEntry must have a valid username, email`);
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

    static load(jsonObject) {
        return new KeyEntry(
            jsonObject.username,
            jsonObject.email,
            (jsonObject.fields || []).map(f => KeyEntryField.load(f)),
            jsonObject.identityProvider,
            jsonObject.notes
        );
    }

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