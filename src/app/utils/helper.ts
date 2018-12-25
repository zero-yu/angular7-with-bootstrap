import { HttpParams } from "@angular/common/http";

export function urlParamsEncodeing<T>(params: T) {
    return Object.keys(params)
        .filter(key => params[key])
        .reduce((sum: string, key: string, index: number) => {
            sum += (`${(index === 0 ? "?" : "&")}${key}=${params[key]}`);
            return sum;
        }, '');
}
