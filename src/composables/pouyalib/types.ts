export type validationKey = 'REQUIRED' | 'EMAIL' | 'GROUP' | 'TELEPHONE';
export interface DecoratorItem{
    name:validationKey,
    value?:any;
}
export interface PayloadInterface{

}
export interface fieldSets{
    _decorator:DecoratorItem[];
}
export interface formError{
    _decorator?:DecoratorItem|null,
    fieldName?:string,
    text?:string
}