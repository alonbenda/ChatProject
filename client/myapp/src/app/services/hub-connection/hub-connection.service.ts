import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SignalrClient, SignalrConnection } from "ngx-signalr-websocket";
import Message from "src/app/models/message.model";
import User from "src/app/models/user.model";
import { environment } from "src/environments/environment";

@Injectable()
class HubConnectionService {

    private connection?: SignalrConnection;

    constructor(httpClient: HttpClient) {
        const client = SignalrClient.create(httpClient);

        client.connect(environment.talkBackUrl).subscribe(connection =>{
            this.connection = connection;
        });
    }

    sendMessage(userName: User, messageContent: Message) {
        this.connection?.send('SendMessage', userName, messageContent);
    }

    getConnectedUsers(users: User[]) {
        this.connection?.send('GetConnectedUsers', users);
    }
}

export default HubConnectionService;