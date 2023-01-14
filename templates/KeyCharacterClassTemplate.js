import KeyCharacterClass from "../schemas/KeyCharacterClass.js";


/**
 * @typedef {Object} KeyCharacterClassTemplateJSON
 * @property {string} name
 * @property {string} description
 * @property {import("../schemas/KeyCharacterClass.js").KeyCharacterClassJSON} schema
 */

class KeyCharacterClassTemplate {
    constructor(name, description, schema) {
        if (!(name && typeof(name) === 'string')) {
            throw new Error(`A Template must contain a valid name`);
        }
        if (!(schema && schema instanceof KeyCharacterClass)) {
            throw new Error(`A Template must have a valid schema`);
        }
        this.name = name;
        this.description = description || null;
        this.schema = schema;
    }

    static load(jsonObject) {
        return new KeyCharacterClassTemplate(
            jsonObject.name,
            jsonObject.description,
            KeyCharacterClass.load(jsonObject.schema),
        )
    }

    dump() {
        return {
            name: this.name,
            description: this.description,
            schema: this.schema.dump(),
        };
    }

    createInstance() {
        return KeyCharacterClass.load(this.schema.dump());
    }
}


export default KeyCharacterClassTemplate;