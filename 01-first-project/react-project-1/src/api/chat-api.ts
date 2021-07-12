let WSoket: WebSocket | null;

let closeHandler = () =>
{
    alert();
    notifySubscribersAboutStatus('pending')
    console.log('reconnect');
    setTimeout(createWS, 3000);
}
let openHandler = () =>
{
    notifySubscribersAboutStatus('ready')
}
let errorHandler = () =>
{
    notifySubscribersAboutStatus('error')
    console.error('Refresh page ')
}
const onMessageHendler = (e: MessageEvent) =>
{
    const newMessage = JSON.parse(e.data);
    subscribes['messages-reveived'].forEach(s =>
    {
        s(newMessage);
    })
}

const notifySubscribersAboutStatus = (status: StatusType) =>
{
    subscribes["status-change"].forEach(s => s(status));
}

const cleanup = () =>
{
    WSoket?.removeEventListener('close', closeHandler);
    WSoket?.removeEventListener('message', onMessageHendler);

    WSoket?.removeEventListener('open', openHandler);
    WSoket?.removeEventListener('error', errorHandler);

}
function createWS()
{
    cleanup();
    WSoket?.close();

    WSoket = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    notifySubscribersAboutStatus('pending');
    WSoket.addEventListener('close', closeHandler);
    WSoket.addEventListener('open', openHandler);
    WSoket.addEventListener('error', errorHandler);
    WSoket.addEventListener('message', onMessageHendler);
}

export const chatAPI = {
    start()
    {
        createWS()
    },
    stop: () =>
    {
        cleanup();
        WSoket?.close();
        //TODO: need ti kill the whole object or just the message event
        subscribes['messages-reveived'] = []
        subscribes['status-change'] = []

    },
    subscribe: (eventName: EventsNamesType, callback: MessagesRecivedSubscriberType | StatusChangedSubscriberType) =>
    {
        // @ts-ignore
        subscribes[eventName].push(callback);
        console.log(subscribes);
        return () =>
        { // @ts-ignore
            subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe: (eventName: EventsNamesType, callback: MessagesRecivedSubscriberType | StatusChangedSubscriberType) =>
    {
        // @ts-ignore
        subscribes[eventName] = subscribes[eventName].filter(s => s !== callback)
    },
    sendMessage: (message: string) =>
    {
        WSoket?.send(message);
    }

}
export type StatusType = 'pending' | 'ready' | 'error'

type MessagesRecivedSubscriberType = (messages: ChatMessageAPIType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type EventsNamesType = 'messages-reveived' | 'status-change';

const subscribes =
{
    'messages-reveived': [] as MessagesRecivedSubscriberType[],
    'status-change': [] as Array<StatusChangedSubscriberType>
}

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
