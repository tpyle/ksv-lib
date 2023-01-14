import random from 'crypto-random';

import KeyCharacterClass from './KeyCharacterClass.js';


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(random.value() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

/**
 * @typedef {Object} KeyGeneratorJSON
 * @property {number} length
 * @property {import('./KeyCharacterClass.js').KeyCharacterClassJSON} characterClasses
 */

class KeyGenerator {
    /**
     * Creates new KeyGenerator
     * @param {number} length The length of the key for this generator
     * @param {KeyCharacterClass[]} characterClasses A list of character classes which make up the key
     */
    constructor(length, characterClasses) {
        if (!(length && typeof(length) == 'number')) {
            throw new Error(`A KeyGenerator must have a length associated with it`);
        }
        if (!(characterClasses && Array.isArray(characterClasses) && characterClasses.length > 0 && characterClasses.map(f=>f instanceof KeyCharacterClass).reduce((a,c)=>a && c, true))) {
            throw new Error(`A KeyGenerator must have at least one character class associated with it`);
        }
        this.length = length;
        this.characterClasses = characterClasses;
    }

    /**
     * Creates a new KeyGenerator from its object representation
     * @param {KeyGeneratorJSON} jsonObject a KeyGenerator in object format
     * @returns 
     */
    static load(jsonObject) {
        return new KeyGenerator(
            jsonObject.length,
            jsonObject.characterClasses.map(cc=>KeyCharacterClass.load(cc)),
        );
    }

    /**
     * Converts a KeyGenerator into its equivalent object representation
     * @returns {KeyGeneratorJSON} The object representation
     */
    dump() {
        return {
            length: this.length,
            characterClasses: this.characterClasses.map(cc=>cc.dump()),
        };
    }

    /**
     * @typedef {Object} CurrentClassCount
     * @property {number} currentCount
     * @property {KeyCharacterClass} class
     */

    /**
     * Picks a random character from the list of currently available classes
     * @param {CurrentClassCount[]} classes A list of modified key character class shims which include the current count
     */
    #pickRandomClass(classes) {
        let classInclination = classes
            .filter(c=>c.currentCount < (c.class.maxCount || this.length))
            .map(c =>{ return { quantity: c.class.getQuantity(), c } });
        if (classInclination.length == 0) {
            throw new Error(`There is not enough characters in these character classes to generate a full-length password`);
        }
        let totalQuantity = classInclination.reduce((a,c)=>a+c.quantity, 0);
        let base = 0;
        let pick = random.value();
        return classInclination
            .filter(c => {
                let result = (base + c.quantity) / totalQuantity > pick;
                base += c.quantity;
                return result;
            })[0].c;
    }

    /**
     * Creates a cryptographically random password based on the rules of this KeyGenerator's character classes and the KeyGenerator's length.
     * @returns {string} A newly created password
     */
    generate() {
        let password = [];
        this.characterClasses.forEach(c => {
            for (let _ = 0; _ < c.minCount; _++) {
                password.push(c.pick());
            }
        });
        if (password.length > this.length) {
            throw new Error(`Character class counts are inconsistent with generator length. Expected ${this.length}, received ${password.length}`)
        }

        let leftOverLength = this.length - password.length;
        let currentCounts = this.characterClasses.map(c=>{
            return {
                currentCount: c.minCount || 0,
                class: c,
            };
        });

        for (let _ = 0; _ < leftOverLength; _++) {
            let selectedClass = this.#pickRandomClass(currentCounts);
            selectedClass.currentCount += 1;
            password.push(selectedClass.class.pick());
        }

        return shuffle(password).join("");
    }
}


export default KeyGenerator;