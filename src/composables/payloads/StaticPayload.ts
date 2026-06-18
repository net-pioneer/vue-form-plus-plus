import { MIN, Group, Telephone, Required } from "@/composables/pouyalib/useDecoration";
import type { PayloadInterface } from "@/composables/pouyalib/types";
import { basePayload } from "@/composables/pouyalib/abstracts.ts";

export class formPayload extends basePayload implements PayloadInterface{
    @Group(1)
    @Required
    @MIN(3)
    first_name:string;
    @Required
    @Group(1)
    @MIN(3)
    last_name:string;
    @Required
    @Telephone
    @Group(1)
    coordinate_mobile:string;
    @MIN(11)
    @Group(1)
    coordinate_phone_number:string;
    @Required
    @MIN(10)
    @Group(1)
    address:string;

    @Required
    @Group(2)
    lan:number;
    @Required
    @Group(2)
    lat:number

    gender:string='male';
    region:Number=1;
}