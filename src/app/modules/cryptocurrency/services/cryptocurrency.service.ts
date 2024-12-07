import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { IGeneralResponse } from "../../shared/interfaces/generalresponse.interface";
import { ICryptoCurrencyCreate } from "../interfaces/cryptocurrency-create.interface";
import { ICryptoCurrencyUpdate } from "../interfaces/cryptocurrency-update.interface";
import { ICryptoCurrency } from "../interfaces/cryptocurrency.interface";

@Injectable({
    providedIn:'root'
})
export class CryptocurrencyService{
    private _httpClient = inject(HttpClient);
    urlBase: string = environment.apiBaseUrl;

    getCryptocurrencies(limit:number, offset:number, filter:string): Observable<IGeneralResponse<ICryptoCurrency[]>> {
        return this._httpClient.get<IGeneralResponse<ICryptoCurrency[]>>(
            `${this.urlBase}/api/v1/cryptocurrency?limit=${limit}&offset=${offset}&filter=${filter}`
        );
    }

    getCryptocurrency(cryptocurrencyId:number): Observable<IGeneralResponse<ICryptoCurrency[]>> {
        return this._httpClient.get<IGeneralResponse<ICryptoCurrency[]>>(
            `${this.urlBase}/api/v1/cryptocurrency/${cryptocurrencyId}`
        );
    }

    deleteCryptocurrency(cryptocurrencyId:number): Observable<IGeneralResponse<string>> {
        return this._httpClient.delete<IGeneralResponse<string>>(
            `${this.urlBase}/api/v1/cryptocurrency/${cryptocurrencyId}`
        );
    }

    updateCryptocurrency(payload:ICryptoCurrencyUpdate): Observable<IGeneralResponse<ICryptoCurrency>> {
        return this._httpClient.put<IGeneralResponse<ICryptoCurrency>>(
            `${this.urlBase}/api/v1/cryptocurrency`,
            payload
        );
    }

    createCryptocurrency(payload:ICryptoCurrencyCreate): Observable<IGeneralResponse<ICryptoCurrency>> {
        return this._httpClient.post<IGeneralResponse<ICryptoCurrency>>(
            `${this.urlBase}/api/v1/cryptocurrency`,
            payload
        );
    }
}