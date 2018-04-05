import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { LogWorkMySuffix } from './log-work-my-suffix.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<LogWorkMySuffix>;

@Injectable()
export class LogWorkMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/log-works';

    constructor(private http: HttpClient) { }

    create(logWork: LogWorkMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(logWork);
        return this.http.post<LogWorkMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(logWork: LogWorkMySuffix): Observable<EntityResponseType> {
        const copy = this.convert(logWork);
        return this.http.put<LogWorkMySuffix>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: string): Observable<EntityResponseType> {
        return this.http.get<LogWorkMySuffix>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<LogWorkMySuffix[]>> {
        const options = createRequestOption(req);
        return this.http.get<LogWorkMySuffix[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<LogWorkMySuffix[]>) => this.convertArrayResponse(res));
    }

    delete(id: string): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: LogWorkMySuffix = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<LogWorkMySuffix[]>): HttpResponse<LogWorkMySuffix[]> {
        const jsonResponse: LogWorkMySuffix[] = res.body;
        const body: LogWorkMySuffix[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to LogWorkMySuffix.
     */
    private convertItemFromServer(logWork: LogWorkMySuffix): LogWorkMySuffix {
        const copy: LogWorkMySuffix = Object.assign({}, logWork);
        return copy;
    }

    /**
     * Convert a LogWorkMySuffix to a JSON which can be sent to the server.
     */
    private convert(logWork: LogWorkMySuffix): LogWorkMySuffix {
        const copy: LogWorkMySuffix = Object.assign({}, logWork);
        return copy;
    }
}
