import React, { useState, useEffect } from "react";
import FullPageLoader from "../components/loader";
import { List } from "antd";
import { Link } from "react-router-dom";
//services
import { getAllConversations } from "../services/user.services";

const Conversations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const getConversationsHelper = () =>
    new Promise((resolve, reject) => {
      getAllConversations(resolve, reject);
    });

  const getConversations = async () => {
    try {
      return await getConversationsHelper();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    let conv = await getConversations();
    setConversations(conv);
    setIsLoading(false);
  }, []);

  if (isLoading) return <FullPageLoader />;

  return (
    <div style={{ marginLeft: 50 }}>
      <List
        itemLayout="horizontal"
        dataSource={conversations}
        renderItem={(item, i) => (
          <List.Item style={{ background: "white", paddingLeft: 50 }}>
            <List.Item.Meta
              title={
                <h2>
                  Conversation {i + 1}
                  <Link to={`/user/messages/${item._id}`}>
                    <h2>Participants</h2>
                  </Link>
                </h2>
              }
              description={
                <h3>
                  {item.participants[0].name.toUpperCase()} <br />{" "}
                  {item.participants[1].name.toUpperCase()}
                </h3>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Conversations;
