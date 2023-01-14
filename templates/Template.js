class Template {
    static templateOf = null;
    constructor(name, description, schema) {
        if (!(name && typeof(name) === 'string')) {
            throw new Error(`A Template must contain a valid name`);
        }
        if (!(schema && schema instanceof this.constructor.templateOf)) {
            throw new Error(`A Template must have a valid schema`);
        }
        this.name = name;
        this.description = description || null;
        this.schema = schema;
    }

    static load(jsonObject) {
        return new this.constructor(
            jsonObject.name,
            jsonObject.description,
            new this.templateOf(jsonObject.keyGenerator),
        );
    }

    dump() {
        return {
            name: this.name,
            description: this.description,
            keyGenerator: this.constructor.templateOf.dump(),
        };
    }

    createInstance() {
        return this.constructor.templateOf.load(this.schema.dump());
    }
}

export default Template;
// module.exports = Template;