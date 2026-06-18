# Vue Professional Form

A powerful and lightweight form library for **Vue 3** and **Nuxt 3**, inspired by Java Annotations and designed with a clean Object-Oriented approach.

## Features

* ✅ TypeScript Support
* ✅ Decorators & Annotations
* ✅ Async HTTP Requests
* ✅ Multi-Step Form Wizard
* ✅ Vue 3 Composition API
* ✅ No External Dependencies
* ✅ Pure SCSS Styling
* ✅ Object-Oriented Design (OOP)
* ✅ Backend Validation Rules Support

---

## Static Usage

Define your form model using decorators:

```ts
export class FormPayload extends BasePayload implements PayloadInterface {

    @Group(1)
    @Required
    @MIN(3)
    first_name: string;

    @Group(1)
    @Required
    @MIN(3)
    last_name: string;
}
```

---

## Backend Validation Rules

You can also fetch validation rules dynamically from your backend (for example, Laravel FormRequest).

```ts
@Backend({
    url: '/backend_rules.json'
})
export class SSRPayload extends BasePayload implements PayloadInterface {

    username: string;

    password: string;

    google_code: string;
}
```

Example backend response:

```json
{
    "username": ["required", "string", "min:3"],
    "password": ["required", "string", "min:8"],
    "google_code": ["required"]
}
```

The library automatically converts these rules into decorators internally.

---

## Compatibility

This package is fully compatible with:

* Vue 3
* Nuxt 3
* TypeScript
* Composition API

---

## Inspiration

This project is inspired by Java annotations:

```java
@NotNull
@Min(3)
private String firstName;
```

and brings the same developer experience to Vue and TypeScript.

---

## Previous Version

Best version of:

https://github.com/net-pioneer/vue3-form-example

---

**Built for developers who prefer clean code, decorators, and strongly typed forms.**
Regards 
Pouya
