import KeyGenerator from "../schemas/KeyGenerator.js";
import Template from "./Template.js";

class KeyGeneratorTemplate extends Template {
    static templateOf = KeyGenerator;
}

export default KeyGeneratorTemplate;