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
}


export default KSVObject;