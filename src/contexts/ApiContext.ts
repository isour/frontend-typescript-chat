import React from 'react';

interface IMessage {
    readonly message: string;
    readonly channelId: number | null;
    readonly username: string;
}

interface IChannel {
    readonly name: string;
}

interface IApiType {
    readonly sendMessage: (message: IMessage, fn: () => void, fn2: (error: any) => void) => void;
    readonly createChannel: (
        name: IChannel,
        fn: (result: any) => void,
        fn2: (error: any) => void
    ) => void;
    readonly removeChannel: (
        name: IChannel,
        fn: (result: any) => void,
        fn2: (error: any) => void
    ) => void;
    readonly renameChannel: (
        name: IChannel,
        fn: (result: any) => void,
        fn2: (error: any) => void
    ) => void;
}

const ApiContext = React.createContext<IApiType>({} as IApiType);

export { IApiType };

export default ApiContext;
