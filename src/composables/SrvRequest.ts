import useRequest from "@/composables/useRequest";
import { inject } from "vue";
export function http(): useRequest.Request {
  return inject<useRequest.Request>("http");
}
export default http;
