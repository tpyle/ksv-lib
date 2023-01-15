import KeyEntry from "./KeyEntry.js";


/**
 * @typedef {Object} ItemEntryJSON
 * @property {string} itemName
 * @property {string[]} alternativeNames
 * @property {import("./KeyEntry.js").KeyEntryJSON} keyEntries
 */

class ItemEntry {
    /**
     * Creates a new ItemEntry
     * @param {string} itemName The name of the item
     * @param {string[]} alternativeNames Any alternative names associated with the item
     * @param {KeyEntry[]} keyEntries A list of KeyEntries associated with the item
     */
    constructor(itemName, alternativeNames, keyEntries) {
        if (!(itemName && typeof(itemName) == 'string')) {
            throw new Error(`An ItemEntry must contain a valid itemName`);
        }
        if (!(alternativeNames && Array.isArray(alternativeNames) && alternativeNames.map(n=>typeof(n) == 'string').reduce((a,c)=> a && c, true))) {
            throw new Error(`An ItemEntry must contain a valid list of alternativeNames`);
        }
        if (!(keyEntries && Array.isArray(keyEntries) && keyEntries.map(f=>f instanceof KeyEntry).reduce((a,c)=>a && c, true))) {
            throw new Error(`An ItemEntry must have a valid set of KeyEntries`);
        }
        this.itemName = itemName;
        this.alternativeNames = alternativeNames;
        this.keyEntries = keyEntries;
    }

    /**
     * Converts an ItemEntry JSON format into the class format
     * @param {ItemEntryJSON} jsonObject 
     * @returns {ItemEntry}
     */
    static load(jsonObject) {
        return new ItemEntry(
            jsonObject.itemName,
            jsonObject.alternativeNames,
            jsonObject.keyEntries.map(k=>KeyEntry.load(k)),
        );
    }

    /**
     * Converts the ItemEntry into its equivalent object format
     * @returns {ItemEntryJSON}
     */
    dump() {
        return {
            itemName: this.itemName,
            alternativeNames: this.alternativeNames,
            keyEntries: this.keyEntries.map(k=>k.dump()),
        }
    }

    /**
     * Adds a new Key Entry for this item
     * @param {KeyEntry} keyEntry The new key entry to add
     */
    addKeyEntry(keyEntry) {
        if (!(keyEntry && keyEntry instanceof KeyEntry)) {
            throw new Error(`Invalid KeyEntry ${keyEntry}`);
        }
        this.keyEntries.push(keyEntry);
    }

    /**
     * Removes the specified keyEntry from this item
     * @param {KeyEntry} keyEntry The KeyEntry to remove
     */
    removeKeyEntry(keyEntry) {
        if (!(keyEntry && keyEntry instanceof KeyEntry)) {
            throw new Error(`Invalid KeyEntry ${keyEntry}`);
        }
        this.keyEntries = this.keyEntries.filter(ke => ke !== keyEntry);
    }
}


export default ItemEntry;