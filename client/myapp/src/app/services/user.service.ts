import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Message from "../models/message.model";
import User from "../models/user.model";


@Injectable()
class UserService {

    private url = "Users/";

    constructor(private httpClient : HttpClient) { }


    getUsers() : Observable<User[]> {
        return this.httpClient.get<User[]>(`${environment.apiUrl}/${this.url}`);
    }

    getUserById(id: number) : Observable<User> {
        return this.httpClient.get<User>(`${environment.apiUrl}/${this.url}` + id);
    }

    createUser(user: User) : Observable<User> {
        return this.httpClient.post<User>(`${environment.apiUrl}/${this.url}`, user);
    }

    updateUser(user: User) {
        return this.httpClient.put(`${environment.apiUrl}/${this.url}` + user.id, user);
    }

    deleteUser(id:number){
        return this.httpClient.delete(`${environment.apiUrl}/${this.url}` + id);
    }
}

export default UserService;