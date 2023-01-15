export const LOWERCASE_LETTER_CHARACTER_CLASS = {
    characterList: null,
    standardCharacterClass: 'ALPHABET_LOWERCASE',
    minCount: 1,
    maxCount: null,
}

export const UPPERCASE_LETTER_CHARACTER_CLASS = {
    characterList: null,
    standardCharacterClass: 'ALPHABET_UPPERCASE',
    minCount: 1,
    maxCount: null,
};

export const DIGITS_CHARACTER_CLASS = {
    characterList: null,
    standardCharacterClass: 'DIGITS',
    minCount: 1,
    maxCount: null,
};

export const OWASP_SPECIAL_CHARACTER_CLASS = {
    characterList: null,
    standardCharacterClass: 'OWASP_SPECIAL_CHARACTERS',
    minCount: 1,
    maxCount: null,
};

export const PIN_GENERATOR = {
    length: 4,
    characterClasses: [
        DIGITS_CHARACTER_CLASS,
    ],
};

export const LONG_PIN_GENERATOR = {
    length: 8,
    characterClasses: [
        DIGITS_CHARACTER_CLASS,
    ],
};

export const PASSWORD_GENERATOR = {
    length: 16,
    characterClasses: [
        LOWERCASE_LETTER_CHARACTER_CLASS,
        UPPERCASE_LETTER_CHARACTER_CLASS,
        DIGITS_CHARACTER_CLASS,
        OWASP_SPECIAL_CHARACTER_CLASS,
    ],
};

export const PASSWORD_FIELD = {
    name: 'password',
    description: 'A standard password',
    generator: PASSWORD_GENERATOR,
}

export const PIN_FIELD = {
    name: 'pin',
    description: 'A standard pin',
    generator: PIN_GENERATOR,
}

export const DEFAULT_KSV_OBJECT = {
    itemEntries: [],
    keyCharacterClassTemplates: [
        {
            name: 'lowercase-letters',
            description: 'Standard lowercase latin letters',
            schema: LOWERCASE_LETTER_CHARACTER_CLASS,
        },
        {
            name: 'uppercase-letters',
            description: 'Standard uppercase latin letters',
            schema: UPPERCASE_LETTER_CHARACTER_CLASS,
        },
        {
            name: 'digits',
            description: 'Standard digits',
            schema: DIGITS_CHARACTER_CLASS,
        },
        {
            name: 'owasp-specials',
            description: 'Standard OWASP special characters',
            schema: OWASP_SPECIAL_CHARACTER_CLASS,
        }
    ],
    keyGeneratorTemplates: [
        {
            name: 'pin',
            description: 'A standard 4 character PIN',
            schema: PIN_GENERATOR,
        },
        {
            name: 'long-pin',
            description: 'A longer 8 character PIN',
            schema: LONG_PIN_GENERATOR,
        },
        {
            name: 'owasp-password',
            description: 'A 16 character randomized password containing number, lowercase and uppercase letters, as well as OWASP compliant special characters',
            schema: PASSWORD_GENERATOR,
        }
    ],
    keyEntryFieldTemplates: [
        {
            name: 'standard-password',
            description: 'An OWASP-compliant password',
            schema: PASSWORD_FIELD,
        },
        {
            name: 'standard-pin',
            description: 'A standard length PIN',
            schema: PIN_FIELD
        }
    ]
}