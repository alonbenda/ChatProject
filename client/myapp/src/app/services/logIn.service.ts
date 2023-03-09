import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import User from "../models/user.model";


@Injectable()
class LogInService {

    private url = "LogIn/";

    constructor(private httpClient : HttpClient) { }

    getUsers() : Observable<User[]> {
        return this.httpClient.get<User[]>(`${environment.apiUrl}/Users/`);
    }

    logInUser(user: User) : Observable<User> {
        return this.httpClient.put<User>(`${environment.apiUrl}/${this.url}` + user.id, user);
    }

    logOutUser(user: User) : Observable<User> {
        return this.httpClient.put<User>(`http://localhost:5050/logout`, user);
    }
}

export default LogInService;