import { createI18n } from "vue-i18n";
import i18nLangs_fa from '@/langs/fa.js';

const messages = {
  fa: i18nLangs_fa,
};
const i18n = new createI18n({
  locale: "fa",
  legacy: false,
  messages,
});
export default i18n;
