import KeyGenerator from "./KeyGenerator.js";


class KeyEntryField {
    /**
     * Creates a new KeyEntryField
     * @param {string} name The name/label associated with the field
     * @param {string|null} description A description of what the field is/what it's used for
     * @param {KeyGenerator} generator A generator object to create more
     */
    constructor(name, description, generator) {
        if (!(name && typeof(name) === "string")) {
            throw new Error(`KeyEntryField must have a valid name`);
        }
        if (!(generator && typeof(generator) === 'object' && generator instanceof KeyGenerator)) {
            throw new Error(`KeyEntryField must have a valid generator`);
        }
        this.name = name;
        this.description = description || null;
        this.generator = generator;
    }

    /**
     * Converts a JSON representation of a KeyEntryField into an instance of a KeyEntryField
     * @param {object} jsonObject 
     * @returns {KeyEntryField}
     */
    static load(jsonObject) {
        return new KeyEntryField(
            jsonObject.name,
            jsonObject.description,
            KeyGenerator.load(jsonObject.generator),
        );
    }

    /**
     * Converts the KeyEntryField into its JSON representation
     * @returns {object} A JSON representation of the KeyEntryField
     */
    dump() {
        return {
            name: this.name,
            description: this.description,
            generator: this.generator.dump(),
        };
    }
}


export default KeyEntryField;