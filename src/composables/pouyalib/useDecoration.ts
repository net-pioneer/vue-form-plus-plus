import { reactive, ref, shallowRef, toRefs } from "vue";
import type { DecoratorItem, validationKey,formError } from "@/composables/pouyalib/types";

function createDecorator(decoratorName: validationKey) {
    return function (target: any, key: string): void {
        if (!target[key]) {
            target[key] = ref({
                _decorator: []
            });
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
export function Group(tabId: number) {
    return function (target: any, key: string): void {
        createDecoratorWithValue(target, key, 'GROUP', tabId);
    };
}

export function reactiveForm<T extends object>(Cls: new () => T): T {
    return reactive(new Cls());
}

export function toReactiveValues(model: Record<string, any>) {
    const output: Record<string, any> = {};
    for (const key in model) {
        output[key] = model[key].value;
    }
    return output;
}
