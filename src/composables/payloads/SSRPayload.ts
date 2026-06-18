import { basePayload } from "@/composables/pouyalib/abstracts.ts";
import type { PayloadInterface } from "@/composables/pouyalib/types.ts";
import { Backend } from "@/composables/pouyalib/useDecoration.ts";

@Backend({url:'/backend_rules.json'})
export class SSRPayload extends basePayload implements PayloadInterface {
  username: string;
  password: string;
  google_code: string;
}