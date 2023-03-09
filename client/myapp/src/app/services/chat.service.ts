import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Message from "../models/message.model";
import User from "../models/user.model";


@Injectable()
class ChatService {

    private url = "Chat/";

    constructor(private httpClient : HttpClient) { }

    getUserById(id: number) : Observable<User> {
        return this.httpClient.get<User>(`${environment.apiUrl}/Users/` + id);
    }

    getMessages() : Observable<Message[]> {
        return this.httpClient.get<Message[]>(`${environment.apiUrl}/${this.url}`);
    }

    sendMessage(message: Message) : Observable<Message> {
        return this.httpClient.post<Message>(`${environment.apiUrl}/${this.url}`, message);
    }
}

export default ChatService;