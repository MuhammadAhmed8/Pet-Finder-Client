import React, { useState, useEffect } from "react";
import FullPageLoader from "../components/loader";
import { InfoBar } from "../components/InfoBar/InfoBar";
import { Input } from "../components/Input/Input";
import { Messages } from "../components/Messages/Messages";
import { TextContainer } from "../components/TextContainer/TextContainer";
//services
import { getAllMessages, sendMessageRequest } from "../services/user.services";

const Message = ({ match }) => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMessagesHelper = () =>
    new Promise((resolve, reject) => {
      getAllMessages(match.params.id, resolve, reject);
    });

  const getMessages = async () => {
    try {
      return await getMessagesHelper();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    let conv = await getMessages();
    setMessages(conv);
    setIsLoading(false);
  }, []);

  const sendMessageHelper = () =>
    new Promise((resolve, reject) => {
      sendMessageRequest(
        match.params.id,
        { message: message },
        resolve,
        reject
      );
    });

  const sendMessage = async (event) => {
    event.preventDefault();
    try {
      return await sendMessageHelper();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <FullPageLoader />;

  return (
    <div className="outerContainer">
      {/* <TextContainer users={users} /> */}
      <div className="container">
        <InfoBar room={room} />
        <Messages messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Message;
