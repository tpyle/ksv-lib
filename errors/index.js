export class KSVAlreadyPresentError extends Error {
    constructor(element, conflictingName) {
        super(`An ${element} with name ${conflictingName} is already present`);
    }
}