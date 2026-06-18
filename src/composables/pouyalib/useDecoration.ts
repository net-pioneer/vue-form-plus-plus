import { reactive, ref, shallowRef, toRefs } from "vue";
import type { DecoratorItem, validationKey, formError, BackendOptions } from "@/composables/pouyalib/types";
import { applyRules } from "@/composables/pouyalib/SSRHandler.ts";

function createDecorator(decoratorName: validationKey) {

    return function (target: any, key: string): void {
        if (!target[key]) {
            target[key] = {
                _decorator: []
            };
        }
        const exists = target[key]._decorator?.some(
          (item: DecoratorItem) => item.name === decoratorName
        );
        if (!exists) {
            target[key]._decorator.push({ name: decoratorName });
        }
    };
}

function createDecoratorWithValue(target: any, key: string, decoratorName: validationKey, value: any): void {
    if (!target[key]) {
        target[key] = {
            _decorator: []
        };
    }
    const existingItem = target[key]._decorator.find(
      (item: DecoratorItem) => item.name === decoratorName
    );

    if (!existingItem) {
        target[key]._decorator.push({ name: decoratorName, value });
    }
}

export const Email = createDecorator('EMAIL');
export const Required = createDecorator('REQUIRED');

export const Telephone = createDecorator('TELEPHONE');

export function MIN(value: number) {
    return function (target: any, key: string): void {
        createDecoratorWithValue(target, key, 'MIN', value);
    };
}
export function MAX(value: number) {
    return function (target: any, key: string): void {
        createDecoratorWithValue(target, key, 'MAX', value);
    };
}
export function Group(tabId: number) {
    return function (target: any, key: string): void {
        createDecoratorWithValue(target, key, 'GROUP', tabId);
    };
}

export function reactiveForm<T extends object>(Cls: new () => T): Promise<T> {
    if (hasBackend(Cls)) {
        rulesReady(Cls);
    }
    return reactive(new Cls()) as T;
}

export function toReactiveValues(model: Record<string, any>) {
    const output: Record<string, any> = {};
    for (const key in model) {
        output[key] = model[key].value;
    }
    return output;
}

//--- ssr


const rulesCache = new Map<string, Promise<Record<string, string[]>>>();

const backendRegistry = new WeakMap<Function, Promise<void>>();

function fetchRules(url: string, useCache: boolean): Promise<Record<string, string[]>> {
    if (useCache) {
        const cached = rulesCache.get(url);
        if (cached) return cached;
    }
    const promise = (async () => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Backend rules fetch failed: ${res.status}`);
        const data = await res.json();
        return (data.rules ?? data) as Record<string, string[]>;
    })();

    if (useCache) {
        promise.catch(() => rulesCache.delete(url));
        rulesCache.set(url, promise);
    }

    return promise;
}

export function Backend(options: BackendOptions) {
    return function <T extends { new (...args: any[]): {} }>(constructor: T): T {
        const ready = (async () => {
            const rules = await fetchRules(options.url, options.cache ?? false);
            applyRules(constructor.prototype, rules);
        })();
        backendRegistry.set(constructor, ready);
        return constructor;
    };
}

// true only if the class was decorated with @Backend
export function hasBackend(Cls: Function): boolean {
    return backendRegistry.has(Cls);
}

export function rulesReady(Cls: Function): Promise<void> {
    return backendRegistry.get(Cls) ?? Promise.resolve();
}