import React, { useState, useEffect } from "react";
import FullPageLoader from "../components/loader";
import { List, Table } from "antd";
import { Link } from "react-router-dom";
//services
import { getAllConversations } from "../services/user.services";

const Conversations = () => {
  let columns = []
  const [isLoading, setIsLoading] = useState(false);
  let [conversations, setConversations] = useState([]);

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
    let convs = await getConversations();
    
    setConversations(convs);
    

    setIsLoading(false);
    
    console.log(conversations)
  }, []);

  if (isLoading) return <FullPageLoader />;

  

  return (
    
    <div style={{ margin: "50px 50px" }}>
      <h1>Conversations</h1>
      <List 
        itemLayout="vertical"
        dataSource={conversations}
        renderItem={(item, i) => (
          
          <List.Item style={{ background: "white", paddingLeft: 50, margin: "10px 0 ", width:"900px", cursor:"pointer" }}>
            <List.Item.Meta
              title={
                <h2>
                  <Link to={`/user/messages/${item._id}`}>
                    <h4>Topic: {item.topic.about} - #{item.topic.ref}</h4>
                  </Link>
                </h2>
              }
              description={
                <div>
                  <h4>User: {item.participants[0].name.toUpperCase()}</h4>
                  <h4>Date: {item.createdAt}</h4>
                 
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Conversations;
