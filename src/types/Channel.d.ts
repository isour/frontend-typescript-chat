declare interface IMessage {
    readonly message: string;
    readonly channelId: number | null;
    readonly username: string;
}

declare interface IChannel {
    readonly id: number;
    readonly name: string;
    readonly removable: boolean;
}
