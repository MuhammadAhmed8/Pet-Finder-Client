import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import { Message } from "./Message/Message";

import "./Messages.css";

export const Messages = ({ messages }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => {
        console.log(message);
        return (
          <div key={i}>
            <Message message={message.content} name={message.senderId.name} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};
