import KeyGenerator from "../schemas/KeyGenerator.js";


/**
 * @typedef {Object} KeyGeneratorTemplateJSON
 * @property {string} name
 * @property {string} description
 * @property {import("../schemas/KeyGenerator.js").KeyGeneratorJSON} schema
 */

class KeyGeneratorTemplate {
    /**
     * Creates a new KeyGeneratorTemplate
     * @param {string} name The name of the template
     * @param {?string} description The description of the template
     * @param {KeyGenerator} schema The KeyGenerator associated with this template
     */
    constructor(name, description, schema) {
        if (!(name && typeof(name) === 'string')) {
            throw new Error(`A Template must contain a valid name`);
        }
        if (!(schema && schema instanceof KeyGenerator)) {
            throw new Error(`A Template must have a valid schema`);
        }
        this.name = name;
        this.description = description || null;
        this.schema = schema;
    }

    /**
     * Converts a KeyGeneratorTemplate in JSON format into its class representation
     * @param {KeyGeneratorTemplateJSON} jsonObject The object to be converted
     * @returns {KeyGeneratorTemplate}
     */
    static load(jsonObject) {
        return new KeyGeneratorTemplate(
            jsonObject.name,
            jsonObject.description,
            KeyGenerator.load(jsonObject.schema),
        )
    }

    /**
     * Converts a KeyGeneratorTemplate into its equivalent JSON format
     * @returns {KeyGeneratorTemplateJSON}
     */
    dump() {
        return {
            name: this.name,
            description: this.description,
            schema: this.schema.dump(),
        };
    }

    /**
     * Creates a new cloned instance of the KeyGenerator in this template
     * @returns {KeyGenerator} The newly cloned KeyGenerator
     */
    createInstance() {
        return KeyGenerator.load(this.schema.dump());
    }
}


export default KeyGeneratorTemplate;