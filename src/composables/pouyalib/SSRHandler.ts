import { Required ,Email,Telephone,MIN,MAX,Group} from "@/composables/pouyalib/useDecoration.ts";

type RuleFactory = (arg?: string) => (target: any, key: string) => void;

const ruleToDecorator: Record<string, RuleFactory> = {
  required:  () => Required,
  email:     () => Email,
  telephone: () => Telephone,
  min:   (arg) => MIN(Number(arg)),
  max:   (arg) => MAX(Number(arg)),
  group: (arg) => Group(Number(arg)),
  // "string" etc. have no decorator yet → ignored below
};

export function applyRules(target: any, rules: Record<string, string[]>): void {
  for (const key of Object.keys(rules)) {
    for (const raw of rules[key]) {
      const [name, arg] = raw.split(":");
      console.log(`applying ${name} to ${key}`, arg);
      const make = ruleToDecorator[name.toLowerCase()];
      if (!make) continue;            // skips "string" and any unmapped rule
      make(arg)(target, key);         // key = "first_name" / "username" / ...
    }
  }
}