import useFormValidation from "@/composables/pouyalib/useFormValidation";
import type { formError } from "@/composables/pouyalib/types.ts";

export abstract class basePayload{
    public validate(group: number | null) : formError[]{
        const FormValidation = useFormValidation(this);
        return FormValidation.checkValidations(group);
    }
    public reset(): void {
        Object.assign(this, new (this.constructor as any)());
    }
}