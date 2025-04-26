import type { DecoratorItem, fieldSets, formError } from "@/composables/pouyalib/types";
import i18n from "@/composables/i18n";
import type { PayloadInterface } from "@/composables/pouyalib/types";
import { useErrorStore } from "@/composables/pouyalib/useErrorStore";
import { storeToRefs } from "pinia";

export default function useFormValidation(form:PayloadInterface) {
  // to show All Errors in a single place use this !
  const checkValidations = (group: number | null): formError[] => {
    const errors: formError[] = [];
    const prototypes = Object.getPrototypeOf(form);
    const formKeys = Object.keys(form);
    let errCount:number = 0;
    for (const key of formKeys) {
      const value = form[key];
      const metadata = prototypes[key] as fieldSets;
      const decorators = metadata?._decorator || [];
      const groupDecorator = decorators.find(d => d.name === 'GROUP');
      const group_id = groupDecorator?.value ?? 0;
      if (group === null || group_id === group) {
        for (const decorator of decorators) {
          const error = checkField(decorator, value, key);
          if (error) {
            errCount++;
            errors[key] = error;
          }
        }
      }
    }
    errors.len = errCount;
    return errors;
  };
  const checkValidation = (fieldName) :formError | boolean => {
    const prototypes = Object.getPrototypeOf(form);
    const fieldValue = form[fieldName];
    const fieldSets = prototypes[fieldName] as fieldSets;
    const _decorators = fieldSets?._decorator;
    if(_decorators === undefined){
      return false;
    }else{
      for (const decorator of _decorators) {
        const error = checkField(decorator, fieldValue, fieldName);
        if (error) {
          return error;
        }
      }
      return false;
    }
  }
  const checkField = (decorator:DecoratorItem,input,formFieldName) :formError|boolean=>{
    if(decorator.name === 'REQUIRED' && (input === undefined || input ==='')) {
      return {
        _decorator:null,
        fieldName:formFieldName,
        text:i18n.global.t('validation.REQUIRED')
      }
    }
    else if (decorator.name === 'EMAIL' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
      return {
        _decorator:decorator,
        fieldName:formFieldName,
        text:i18n.global.t('validation.REQUIRED')
      }
    }
    else if (decorator.name === 'MIN' && (input !== undefined && input.length < decorator.value)) {
      return {
        _decorator:decorator,
        fieldName:formFieldName,
        text:i18n.global.t('validation.MIN',[decorator.value])
      }
    }
    else if (decorator.name === 'TELEPHONE' && !/^09\d{9}$/.test(input)) {
      return {
        _decorator:decorator,
        fieldName:formFieldName,
        text:i18n.global.t('validation.TELEPHONE')
      }
    }
    else{
      return false;
    }
  }

  return{
    checkValidations,
    checkValidation
  }
}