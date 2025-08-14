class TypeChecker {
    constructor() {
        // Node.js ortamında DOMParser yoksa xmldom paketi ile ekleriz
        if (typeof DOMParser === "undefined") {
            try {
                const { DOMParser: NodeDOMParser } = require("xmldom");
                this.DOMParser = NodeDOMParser;
            } catch (e) {
                this.DOMParser = null; // XML desteği yok
            }
        } else {
            this.DOMParser = DOMParser;
        }
    }

    whatIsIt(object) {
        if (object === null) return "null";
        if (object === undefined) return "undefined";

        switch (typeof object) {
            case 'string':
                return this.checkStringType(object);
            case 'object':
                if (Array.isArray(object)) return "array";
                return "object";
            case 'number':
                return "number";
            case 'boolean':
                return "boolean";
            default:
                return "unknown";
        }
    }

    checkStringType(string) {
        if (this.isValidXml(string)) return "stringXml";
        if (this.isNumberString(string)) return "stringNumber";
        if (this.isEmailString(string)) return "stringEmail";
        if (this.isUrlString(string)) {
            if (this.isImageUrl(string)) return "stringImageUrl"; 
            return "stringUrl";
        }
        if (this.isDateStringValid(string)) return "stringDate";
        if (this.isJsonString(string)) return "stringJson";

        return "string";
    }

    isJsonString(string) {
        try {
            JSON.parse(string);
            return true;
        } catch {
            return false;
        }
    }

    isValidXml(string) {
        if (!this.DOMParser) return false;
        try {
            const parser = new this.DOMParser();
            const xmlDoc = parser.parseFromString(string, "text/xml");
            return xmlDoc.getElementsByTagName("parsererror").length === 0;
        } catch {
            return false;
        }
    }

    isNumberString(string) {
        return !isNaN(string) && string.trim() !== "";
    }

    isEmailString(string) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(string);
    }

    isUrlString(string) {
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
        return urlRegex.test(string);
    }

    isImageUrl(string) {
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;
        return imageRegex.test(string);
    }

    isDateStringValid(string) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
        if (!dateRegex.test(string)) return false;
        const dateObject = new Date(string);
        return dateObject instanceof Date && !isNaN(dateObject.getTime());
    }
}

// Evrensel export yöntemi
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = { TypeChecker }; // Node.js
} else {
    window.TypeChecker = TypeChecker; // Tarayıcı
}
