import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ChatMessageAPIType } from "../../api/chat-api";
import { sendMessages, startMessagesListening } from "../../redux/chat-reducer";
import { AppStateType } from "../../redux/redux-store";





const ChatPage: React.FC = () =>
{
  return (
    <>
      <Chat />
    </>
  )
}

const Chat: React.FC = () =>
{
  const dispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  useEffect(() =>
  {
    dispatch(startMessagesListening())
  }, []);



  return (
    <div>
      {status === 'error' && <div> Some error occured. Please Refresh the Page</div>}
      <>
        <Messages />
        <AddMessageForm />
      </>
    </div>
  )
}

const Messages: React.FC<{}> = ({ }) =>
{
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messageAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(false)

  useEffect(() =>
  {
    if (isAutoScroll)
    {
      messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  const scrollHendler = (e: React.UIEvent<HTMLDivElement, UIEvent>) =>
  {
    let block = e.currentTarget;
    if (Math.abs((block.scrollHeight - block.scrollTop) - block.clientHeight) < 300)
    {
      console.log('scrolled');
      !isAutoScroll && setIsAutoScroll(true)
    } else
    {
      isAutoScroll && setIsAutoScroll(false)
    }
  }

  return (
    <div style={{ maxHeight: '400px', overflowY: 'auto' }} onScroll={scrollHendler}>
      {messages.map((m, index) => <Message message={m} key={m.id} />)}
      <div ref={messageAnchorRef}></div>
    </div>
  )
}
const Message: React.FC<{ message: ChatMessageAPIType }> = React.memo(({ message }) =>
{
  console.log('>>>>>>Message');
  return (
    <div>
      <img style={{ width: '30px', height: '30px' }} src="{message.url}" alt="" />{message.userName}
      <br />
      {message.message}
      <hr />
    </div>
  )
})

const AddMessageForm: React.FC<{}> = ({ }) =>
{
  const [message, setMessage] = useState('');
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');
  const dispatch = useDispatch();
  const status = useSelector((state: AppStateType) => state.chat.status);

  const sendMessageHandler = () =>
  {
    if (!message)
    {
      return
    }
    dispatch(sendMessages(message));
    setMessage('');
  }
  return (
    <div>
      {status}
      <textarea value={message} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)} ></textarea>
      <br />
      <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
    </div>
  )
}
export default ChatPage;