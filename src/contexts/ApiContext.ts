import React from 'react';

import { TonSuccess, TonTimeout } from '../logic/api';

interface IChannel {
    readonly name: string;
}

interface IApiType {
    readonly sendMessage: (message: IMessage, onSuccess: TonSuccess, onTimeout: TonTimeout) => void;
    readonly createChannel: (
        name: any,
        onSuccess: TonSuccess,
        onTimeout: TonTimeout
    ) => void;
    readonly removeChannel: (
        name: any,
        onSuccess: TonSuccess,
        onTimeout: TonTimeout
    ) => void;
    readonly renameChannel: (
        name: any,
        onSuccess: TonSuccess,
        onTimeout: TonTimeout
    ) => void;
}

const ApiContext = React.createContext<IApiType>({} as IApiType);

export { IApiType };

export default ApiContext;
