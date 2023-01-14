import KeyGenerator from "./KeyGenerator.js";


/**
 * @typedef {Object} KeyEntryFieldJSON
 * @property {string} name
 * @property {(string|null)} description
 * @property {(import("./KeyGenerator.js").KeyGeneratorJSON|null)} generator
 */

class KeyEntryField {
    /**
     * Creates a new KeyEntryField
     * @param {string} name The name/label associated with the field
     * @param {string|null} description A description of what the field is/what it's used for
     * @param {?KeyGenerator} generator A generator object to create more
     */
    constructor(name, description, generator) {
        if (!(name && typeof(name) === "string")) {
            throw new Error(`KeyEntryField must have a valid name`);
        }
        /*if (!(generator && typeof(generator) === 'object' && generator instanceof KeyGenerator)) {
            throw new Error(`KeyEntryField must have a valid generator`);
        }*/
        this.name = name;
        this.description = description || null;
        this.generator = generator;
    }

    /**
     * Converts a JSON representation of a KeyEntryField into an instance of a KeyEntryField
     * @param {KeyEntryFieldJSON} jsonObject 
     * @returns {KeyEntryField}
     */
    static load(jsonObject) {
        return new KeyEntryField(
            jsonObject.name,
            jsonObject.description,
            jsonObject.generator ? KeyGenerator.load(jsonObject.generator) : null,
        );
    }

    /**
     * Converts the KeyEntryField into its JSON representation
     * @returns {KeyEntryFieldJSON} A JSON representation of the KeyEntryField
     */
    dump() {
        return {
            name: this.name,
            description: this.description,
            generator: this.generator ? this.generator.dump() : null,
        };
    }
}


export default KeyEntryField;