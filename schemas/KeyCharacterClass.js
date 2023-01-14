import random from 'crypto-random';


/**
 * @enum {symbol}
 */
const constants = {
    ALPHABET_LOWERCASE: Symbol('Alphabet Lowercase'),
    ALPHABET_UPPERCASE: Symbol('Alphabet Uppercase'),
    DIGITS: Symbol('Digits'),
    OWASP_SPECIAL_CHARACTERS: Symbol('OWASP Special Characters'),
}

/**
 * @typedef {'ALPHABET_LOWERCASE'|'ALPHABET_UPPERCASE'|'DIGITS'|'OWASP_SPECIAL_CHARACTERS'} StandardCharacterClass
 */

const STANDARD_CHARACTER_CLASSES = {
    [constants.ALPHABET_LOWERCASE]: 'abcdefghijklmnopqrstuvwxyz',
    [constants.ALPHABET_UPPERCASE]: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    [constants.DIGITS]: '0123456789',
    [constants.OWASP_SPECIAL_CHARACTERS]: '\u0020\u0021\u0022\u0023\u0024\u0025\u0026\u0027\u0028\u0029\u002a\u002b\u002c\u002d\u002e\u002f\u003a\u003b\u003c\u003d\u003e\u003f\u0040\u005b\u005c\u005d\u005e\u005f\u0060\u007b\u007c\u007d\u007e',
}

/**
 * @typedef {Object} KeyCharacterClassJSON
 * @property {(string|null)} characterList
 * @property {(string|null)} standardCharacterClass
 * @property {(number|null)} minCount
 * @property {(number|null)} maxCount
 */

class KeyCharacterClass {
    static constants = constants;

    /**
     * 
     * @param {(string|null)} characterList A list of potential characters for this class
     * @param {(StandardCharacterClass|null)} standardCharacterClass The class its a part of
     * @param {(number|null)} minCount The required minimum amount of this character class
     * @param {(number|null)} maxCount The maximum amount of this character class which should be present
     */
    constructor(characterList, standardCharacterClass, minCount, maxCount) {
        if (!(characterList && typeof(characterList) === 'string') &&
            !(standardCharacterClass && typeof(standardCharacterClass) === 'symbol' && STANDARD_CHARACTER_CLASSES[standardCharacterClass] != null)) {
            throw new Error(`A KeyCharacterClass must have a valid characterList or standardCharacterClass`);
        }
        this.characterList = characterList || null;
        this.standardCharacterClass = standardCharacterClass || null;
        this.minCount = Number(minCount) || null;
        this.maxCount = Number(maxCount) || null;
    }

    /**
     * Computes the number of characters in the character class
     * @returns {number} The number of characters in this character class
     */
    getQuantity() {
        if (this.characterList) {
            return this.characterList.length;
        } else {
            return STANDARD_CHARACTER_CLASSES[this.standardCharacterClass].length;
        }
    }

    /**
     * Creates a KeyCharacterClass from its object representation
     * @param {KeyCharacterClassJSON} jsonObject 
     * @returns {KeyCharacterClass}
     */
    static load(jsonObject) {
        return new KeyCharacterClass(
            jsonObject.characterList,
            constants[jsonObject.standardCharacterClass],
            jsonObject.minCount,
            jsonObject.maxCount,
        );
    }

    /**
     * Converts the KeyCharacterClass into its equivalent object representation
     * @returns {KeyCharacterClassJSON}
     */
    dump() {
        return {
            characterList: this.characterList,
            standardCharacterClass: Object.entries(constants).filter(([k,v])=>v === this.standardCharacterClass).map(([k])=>k)[0],
            minCount: this.minCount,
            maxCount: this.maxCount,
        }
    }

    /**
     * Computes a cryptographically-random member of the KeyCharacterClass
     * @returns {string} A single character which is a member of the KeyCharacterClass
     */
    pick() {
        let list = this.characterList ?
            this.characterList :
            STANDARD_CHARACTER_CLASSES[this.standardCharacterClass];
        return list[Math.floor(random.value() * list.length)];
    }
}


export default KeyCharacterClass;
export const ALPHABET_LOWERCASE = constants.ALPHABET_LOWERCASE;
export const ALPHABET_UPPERCASE = constants.ALPHABET_UPPERCASE;
export const DIGITS = constants.DIGITS;
export const OWASP_SPECIAL_CHARACTERS = constants.OWASP_SPECIAL_CHARACTERS;