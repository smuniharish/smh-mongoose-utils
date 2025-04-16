# 🔐 smh-mongoose-utils

`smh-mongoose-utils` is a lightweight and flexible Mongoose plugin utility that allows you to easily add **field-level encryption and decryption** to your schemas using your own `encrypt` and `decrypt` functions. It works seamlessly with your schema definitions and preserves all Mongoose options like `required`, `default`, etc.

Perfect for securing sensitive fields like PAN, Aadhaar, contact numbers, or any personally identifiable information (PII).

---

## 🚀 Installation

```bash
# Using NPM
npm install smh-mongoose-utils

# Using Yarn
yarn add smh-mongoose-utils
```

---

## 🔧 Features

- 🔐 Plug-and-play encryption support for string fields
- 📦 Works with any custom `encrypt` and `decrypt` functions
- ✅ Keeps Mongoose field options like `default`, `required`, etc.
- 🔁 Supports both `toJSON` and `toObject` getters
- 📄 Clean and modular design for easy integration

---

## 🛠️ Usage

### 1. Your Schema (example)

```ts
import { Schema } from 'mongoose';

const CustomerSchema = new Schema({
  pan: { type: String, required: true },
  aadhaar: { type: String },
  contactNumber: { type: String, default: null },
});
```

### 2. Your Encryption Functions

```ts
export const encryptText = (text: string): string => {
  // your encryption logic
  return 'encrypted-' + text;
};

export const decryptText = (text: string): string => {
  // your decryption logic
  return text.replace('encrypted-', '');
};
```

### 3. Apply Encrypted Fields

```ts
import { applyEncryptedFields } from 'smh-mongoose-utils';
import { CustomerSchema } from './models';
import { encryptText, decryptText } from './crypto';

applyEncryptedFields({
  schema: CustomerSchema,
  encryptedFields: ['pan', 'aadhaar', 'contactNumber'],
  options:{
    encrypt: encryptText,
    decrypt: decryptText,
  }
});
```

---

## 📦 API

### `applyEncryptedFields(options: ApplyEncryptedFieldsOptions)`

| Option           | Type             | Description                                     |
|------------------|------------------|-------------------------------------------------|
| `schema`         | `Schema`         | The Mongoose schema to apply encryption to.     |
| `encryptedFields`| `string[]`       | Array of field names to encrypt/decrypt.        |
| `encrypt`        | `(value: string) => string` | Your encryption function (not mandatory defaults to AES-256-GCM) - But not recommended to use the default, but, default is also very secure.            |
| `decrypt`        | `(value: string) => string` | Your decryption function  (not mandatory defaults to AES-256-GCM) - But not recommended to use the default, but, default is also very secure.            |

> 📝 Note: Fields should be of type `String`. For optional fields, nulls are preserved.

---

## 💡 Example

```ts
const encryptedFields = ['pan', 'aadhaar', 'email'];

applyEncryptedFields({
  schema: UserSchema,
  encryptedFields,
  options:{
    encrypt: encryptText,
    decrypt: decryptText,
  }
});
```

---

## 📥 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. Let's make data security easier together 💪

---

## 🧑‍💻 Author

Made with ❤️ by [S MUNI HARISH](mailto:samamuniharish@gmail.com)

[GitHub](https://github.com/smuniharish) • [LinkedIn](https://www.linkedin.com/in/smuniharish)

---

## 📄 License

Apache-2.0 License – see [LICENSE](./LICENSE)