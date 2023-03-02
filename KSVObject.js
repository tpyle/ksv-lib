import { decrypt, encrypt } from "./crypto/index.js";
import { DEFAULT_KSV_OBJECT } from "./defaults/index.js";
import { KSVAlreadyPresentError } from "./errors/index.js";
import ItemEntry from "./schemas/ItemEntry.js";
import KeyCharacterClassTemplate from "./templates/KeyCharacterClassTemplate.js";
import KeyEntryFieldTemplate from "./templates/KeyEntryFieldTemplate.js";
import KeyGeneratorTemplate from "./templates/KeyGeneratorTemplate.js";


/**
 * @typedef {Object} KSVObjectJSON
 * @property {import("./schemas").ItemEntryJSON[]} itemEntries
 * @property {import("./templates").KeyCharacterClassTemplateJSON[]} keyCharacterClassTemplates
 * @property {import("./templates").KeyEntryFieldTemplateJSON[]} keyEntryFieldTemplates
 * @property {import("./templates").KeyGeneratorTemplateJSON[]} keyGeneratorTemplates
 */

/**
 * @typedef {KSVObject} KSVObject
 */

class KSVObject {
    /**
     * Creates a KSVObject, which stores all of the information needed for the KSV application.
     * @param {ItemEntry[]} itemEntries A list of item entries to include in this object
     * @param {KeyCharacterClassTemplate[]} keyCharacterClassTemplates A list of character class templates to include
     * @param {KeyGeneratorTemplate[]} keyGeneratorTemplates A list of generator templates to include
     * @param {KeyEntryFieldTemplate[]} keyEntryFieldTemplates A list of entry field templates to include
     */
    constructor(itemEntries, keyCharacterClassTemplates, keyGeneratorTemplates, keyEntryFieldTemplates) {
        if (!(itemEntries && Array.isArray(itemEntries) && itemEntries.map(f=>f instanceof ItemEntry).reduce((a,c)=>a && c, true))) {
            throw new Error(`A KSVObject must contain a list of valid ItemEntries`);
        }
        if (!(keyCharacterClassTemplates && Array.isArray(keyCharacterClassTemplates) && keyCharacterClassTemplates.map(f=>f instanceof KeyCharacterClassTemplate).reduce((a,c)=>a && c, true))) {
            throw new Error(`A KSVObject must contain a list of valid KeyCharacterClassTemplates`);
        }
        if (!(keyGeneratorTemplates && Array.isArray(keyGeneratorTemplates) && keyGeneratorTemplates.map(f=>f instanceof KeyGeneratorTemplate).reduce((a,c)=>a && c, true))) {
            throw new Error(`A KSVObject must contain a list of valid KeyGeneratorTemplates`);
        }
        if (!(keyEntryFieldTemplates && Array.isArray(keyEntryFieldTemplates) && keyEntryFieldTemplates.map(f=>f instanceof KeyEntryFieldTemplate).reduce((a,c)=>a && c, true))) {
            throw new Error(`A KSVObject must contain a list of valid KeyEntryFieldTemplates`);
        }
        this.itemEntries = itemEntries || [];
        this.keyCharacterClassTemplates = keyCharacterClassTemplates || [];
        this.keyGeneratorTemplates = keyGeneratorTemplates || [];
        this.keyEntryFieldTemplates = keyEntryFieldTemplates || [];
    }

    static default() {
        return this.load(
            DEFAULT_KSV_OBJECT,
        );
    }

    /**
     * Converts a JSON format of a KSV into its formatted class
     * @param {KSVObjectJSON} jsonObject 
     * @returns {KSVObject}
     */
    static load(jsonObject) {
        return new KSVObject(
            jsonObject.itemEntries.map(i=>ItemEntry.load(i)),
            jsonObject.keyCharacterClassTemplates.map(cc=>KeyCharacterClassTemplate.load(cc)),
            jsonObject.keyGeneratorTemplates.map(g=>KeyGeneratorTemplate.load(g)),
            jsonObject.keyEntryFieldTemplates.map(ef=>KeyEntryFieldTemplate.load(ef)),
        );
    }

    /**
     * Converts a KSVObject into its equivalent JSON format
     * @returns {KSVObjectJSON}
     */
    dump() {
        return {
            itemEntries: this.itemEntries.map(ie=>ie.dump()),
            keyCharacterClassTemplates: this.keyCharacterClassTemplates.map(kcc=>kcc.dump()),
            keyGeneratorTemplates: this.keyGeneratorTemplates.map(kg=>kg.dump()),
            keyEntryFieldTemplates: this.keyEntryFieldTemplates.map(kef=>kef.dump()),
        }
    }

    async encrypt(password) {
        let data = JSON.stringify(this.dump());
        return await encrypt(data, password);
    }

    static async decrypt(message, password) {
        let rawData = await decrypt(message, password);
        return this.load(JSON.parse(rawData));
    }

    /**
     * Adds a new ItemEntry to the KSV object. If one with that itemName already exists, an error will be thrown.
     * @param {ItemEntry} itemEntry The ItemEntry to add
     */
    addItemEntry(itemEntry) {
        const currentItem = this.itemEntries.filter(i => i.itemName == itemEntry.itemName);

        if (currentItem.length > 0) {
            throw new KSVAlreadyPresentError(`ItemEntry`, itemEntry.itemName);
        } else {
            this.itemEntries.push(itemEntry);
        }
    }

    /**
     * Removes the item from the item entry list matching the name
     * @param {string} itemName The name to filter with
     */
    removeItemEntry(itemName) {
        this.itemEntries = this.itemEntries.filter(i => i.itemName != itemName);
    }

    /**
     * Adds a new KeyCharacterClassTemplate. If one with the same name is already present, an error is thrown.
     * @param {KeyCharacterClassTemplate} keyCharacterClassTemplate 
     */
    addKeyCharacterClassTemplate(keyCharacterClassTemplate) {
        const otherItems = this.keyCharacterClassTemplates.filter(kcct => kcct.name === keyCharacterClassTemplate.name);

        if (otherItems.length > 0) {
            throw new KSVAlreadyPresentError(`KeyCharacterClassTemplate`, keyCharacterClassTemplate.name);
        }
        this.keyCharacterClassTemplates.push(keyCharacterClassTemplate);
    }

    /**
     * Removes the KeyCharacterClassTemplate matching the given name
     * @param {string} keyCharacterClassTemplateName The name to filter with
     */
    removeKeyCharacterClassTemplate(keyCharacterClassTemplateName) {
        this.keyCharacterClassTemplates = this.keyCharacterClassTemplates.filter(i => i.name != keyCharacterClassTemplateName);
    }

    /**
     * Adds a new KeyGeneratorTemplate. If one with the same name is already present, an error is thrown.
     * @param {KeyGeneratorTemplate} keyGeneratorTemplate 
     */
    addKeyGeneratorTemplate(keyGeneratorTemplate) {
        const otherItems = this.keyGeneratorTemplates.filter(kgt => kgt.name === keyGeneratorTemplate.name);

        if (otherItems.length > 0) {
            throw new KSVAlreadyPresentError(`KeyGeneratorTemplate`, keyGeneratorTemplate.name);
        }
        this.keyGeneratorTemplates.push(keyGeneratorTemplate);
    }

    /**
     * Removes the KeyGeneratorTemplate matching the given name
     * @param {string} keyGeneratorTemplateName The name to filter with
     */
    removeKeyGeneratorTemplate(keyGeneratorTemplateName) {
        this.keyGeneratorTemplates = this.keyGeneratorTemplates.filter(i => i.name != keyGeneratorTemplateName);
    }

    /**
     * Adds a new KeyEntryFieldTemplate. If one with the same name is already present, an error is thrown.
     * @param {KeyEntryFieldTemplate} keyEntryFieldTemplate 
     */
    addKeyEntryFieldTemplate(keyEntryFieldTemplate) {
        const otherItems = this.keyEntryFieldTemplates.filter(keft => keft.name === keyEntryFieldTemplate.name);

        if (otherItems.length > 0) {
            throw new KSVAlreadyPresentError(`KeyEntryFieldTemplate`, keyEntryFieldTemplate.name);
        }
        this.keyEntryFieldTemplates.push(keyEntryFieldTemplate);
    }

    /**
     * Removes the KeyEntryFieldTemplate matching the given name
     * @param {string} KeyEntryFieldTemplateName The name to filter with
     */
    removeKeyEntryFieldTemplate(KeyEntryFieldTemplateName) {
        this.keyEntryFieldTemplates = this.keyGeneratorTemplates.filter(i => i.name != KeyEntryFieldTemplateName);
    }
}


export default KSVObject;