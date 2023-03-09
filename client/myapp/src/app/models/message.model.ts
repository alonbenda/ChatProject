class Message {
    id?: number;
    content: string = "";
    timeSent: Date = new Date();
    userId: number = 0;
    receiverId: number = 0;
    isInvite: boolean = false;
    gameName: string = "";
}

export default Message;