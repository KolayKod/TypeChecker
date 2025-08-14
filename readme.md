# TypeChecker

A small JavaScript utility class to determine the exact type of a given value.

---

## 📌 Features

* Detects primitive and complex types (string, number, boolean, array, object, null, undefined).
* For strings, identifies sub-types like JSON, XML, Email, URL, Image URL, Date, Number String.
* Works in **both Browser and Node.js** environments.
* XML check works in Node.js using `xmldom` package.

---

## 📦 Installation

### Browser

Just include the script:

```html
<script src="TypeChecker.js"></script>
```

### Node.js

```bash
npm install xmldom
```

```js
const { TypeChecker } = require('./TypeChecker.js');
```

---

## 🚀 Usage

### Browser Example

```html
<script src="TypeChecker.js"></script>
<script>
    const t = new TypeChecker();
    console.log(t.whatIsIt([1, 2, 3])); // array
    console.log(t.whatIsIt("test@example.com")); // stringEmail
    console.log(t.whatIsIt('{"name":"Ali"}')); // stringJson
</script>
```

### Node.js Example

```js
const { TypeChecker } = require('./TypeChecker.js');

const t = new TypeChecker();

console.log(t.whatIsIt([1, 2, 3])); // array
console.log(t.whatIsIt("2025-08-14")); // stringDate
console.log(t.whatIsIt('<root>Data</root>')); // stringXml
```

---

## 📝 Return Values

`whatIsIt()` method returns one of the following:

* `null`
* `undefined`
* `number`
* `boolean`
* `array`
* `object`
* `string`
* `stringJson`
* `stringXml`
* `stringNumber`
* `stringEmail`
* `stringUrl`
* `stringImageUrl`
* `stringDate`
* `unknown`

---

## ⚠ Notes

* XML detection in Node.js requires the `xmldom` package.
* URL and Email regex patterns are basic and may not cover all edge cases.
* JSON detection uses `try...catch` for safety.

---

## 📄 License

MIT License
