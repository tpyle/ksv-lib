import KeyEntry from "./KeyEntry.js";


const constants = {
    WEBSITE: Symbol('WEBSITE ITEM'),
    APPLICATION: Symbol('APPLICATION ITEM'),
}

const ITEM_TYPES = {
    [constants.WEBSITE]: 'website',
    [constants.APPLICATION]: 'application',
}

class ItemEntry {
    static constants = constants;

    constructor(itemName, alternativeNames, itemType, keyEntries) {
        if (!(itemName && typeof(itemName) == 'string')) {
            throw new Error(`An ItemEntry must contain a valid itemName`);
        }
        if (!(alternativeNames && Array.isArray(alternativeNames) && alternativeNames.map(n=>typeof(n) == 'string').reduce((a,c)=> a && c, true))) {
            throw new Error(`An ItemEntry must contain a valid list of alternativeNames`);
        }
        if (!(itemType && typeof(itemType) == 'symbol' && ITEM_TYPES[itemType])) {
            throw new Error(`An ItemEntry must contain a valid itemType`);
        }
        if (!(keyEntries && Array.isArray(keyEntries) && keyEntries.map(f=>f instanceof KeyEntry).reduce((a,c)=>a && c, true))) {
            throw new Error(`An ItemEntry must have a valid set of KeyEntries`);
        }
        this.itemName = itemName;
        this.alternativeNames = alternativeNames;
        this.itemType = itemType;
        this.keyEntries = keyEntries;
    }

    static load(jsonObject) {
        return new ItemEntry(
            jsonObject.itemName,
            jsonObject.alternativeNames,
            jsonObject.itemType,
            jsonObject.keyEntries.map(k=>new KeyEntry(k)),
        );
    }

    dump() {
        return {
            itemName: this.itemName,
            alternativeNames: this.alternativeNames,
            itemType: this.itemType,
            keyEntries: this.keyEntries.map(k=>k.dump()),
        }
    }
}


export const WEBSITE = constants.WEBSITE;
export const APPLICATION = constants.APPLICATION;

export default ItemEntry;