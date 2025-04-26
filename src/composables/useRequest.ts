import axios, {Axios} from "axios";
import type {GenericApiResult} from "@/types/api";

abstract class BaseRequest{
    private axios_instance: Axios;
    protected constructor() {
        this.axios_instance = axios.create({
            baseURL: "https://stage.achareh.ir/api",
            headers:{
                "Authorization":"Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4",
                'Content-Type': 'application/json'
            }
        });
        this.axios_instance.interceptors.request.use((config) => {
            return config;
        });
        this.axios_instance.interceptors.response.use(
            async (response) => {
                return response.data;
            },
            (error) => {
                console.error("Error fetching data UseRequest");
                alert("Error , Check Your Internet And Try Again ! masalan");
                location.reload();
                return Promise.reject(error);
            },
        );

        console.log("axios Inited");
    }

}
export namespace UseRequest {
    export class Request extends BaseRequest  {
        public constructor() {
            super();
        }
        public async signedGet<T>(url, headers = {}): Promise<GenericApiResult<T>> {
            return await this.axios_instance.get(url, headers);
        }
        public async signedPost<T>(url,loading, data, headers = {}): Promise<GenericApiResult<T>> {
            loading.value = true;
            const res = await this.axios_instance.post(url, data, headers);
            loading.value = false;
            return res;
        }
    }
}

export default UseRequest;
