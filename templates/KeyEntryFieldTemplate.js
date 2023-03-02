import KeyEntryField from "../schemas/KeyEntryField.js";


/**
 * @typedef {Object} KeyEntryFieldTemplateJSON
 * @property {string} name
 * @property {string} description
 * @property {import("../schemas/KeyEntryField.js").KeyEntryFieldJSON} schema
 */

class KeyEntryFieldTemplate {
    /**
     * Creates a new KeyEntryFieldTemplate
     * @param {string} name 
     * @param {string} description 
     * @param {KeyEntryField} schema 
     */
    constructor(name, description, schema) {
        if (!(name && typeof(name) === 'string')) {
            throw new Error(`A Template must contain a valid name`);
        }
        if (!(schema && schema instanceof KeyEntryField)) {
            throw new Error(`A Template must have a valid schema`);
        }
        this.name = name;
        this.description = description || null;
        this.schema = schema;
    }

    /**
     * Loads a KeyEntryFieldTemplate from JSON
     * @param {KeyEntryFieldTemplateJSON} jsonObject 
     * @returns {KeyEntryFieldTemplate}
     */
    static load(jsonObject) {
        return new KeyEntryFieldTemplate(
            jsonObject.name,
            jsonObject.description,
            KeyEntryField.load(jsonObject.schema),
        )
    }

    /**
     * Converts this object into its JSON representation
     * @returns {KeyEntryFieldTemplateJSON}
     */
    dump() {
        return {
            name: this.name,
            description: this.description,
            schema: this.schema.dump(),
        };
    }

    /**
     * Creates a new example of this template
     * @returns {KeyEntryField}
     */
    createInstance() {
        return KeyEntryField.load(this.schema.dump());
    }
}


export default KeyEntryFieldTemplate;