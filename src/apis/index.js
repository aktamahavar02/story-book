import { bookTemplateApi } from "./bookTemplate";
import { registerApi } from "./login";

export const API = {
    ...registerApi,
    ...bookTemplateApi,
};