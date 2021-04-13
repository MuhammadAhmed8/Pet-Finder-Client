import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Button,
  Row,
  Col,
  Layout,
  Card,
  Input,
  Modal,
  message as ErrorMessage,
} from "antd";
import FullPageLoader from "../components/loader";
//services
import { makeAdoption } from "../services/user.services";
import { CreateConvSendMsg } from "../services/user.services";

const { Content } = Layout;
const { TextArea } = Input;

const DogDetail = ({ dogData, dogCount, match }) => {
  const [dogDetail, setDogDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isVerified, setisVerified] = useState(false);

  const showModal = () => {
    if (isVerified) setIsModalVisible(true);
    else ErrorMessage.error("Please Login to send message");
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const AdoptionRequest = (data) =>
    new Promise((resolve, reject) => {
      return makeAdoption(data, resolve, reject);
    });

  const AdoptionRequestHandler = async () => {
    try {
      setIsLoading(true);
      AdoptionRequest({ petId: dogDetail._id });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  const CreateConversationHelper = () =>
    new Promise((resolve, reject) => {
      let data = {
        topic: { ref: dogDetail._id, about: "Dog" },
        message: message,
      };
      CreateConvSendMsg(data, resolve, reject);
    });

  const CreateConversation = async () => {
    try {
      setIsLoading(true);
      await CreateConversationHelper();
      setIsLoading(false);
      handleCancel();
      setMessage("");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      handleCancel();
    }
    setIsLoading(false);
    handleCancel();
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    console.log(user);
    if (user !== null) if (user.length !== 0) setisVerified(true);

    let dog = dogData.filter((dog) => dog._id === match.params.id);
    setDogDetail(...dog);
  }, []);

  if (isLoading) return <FullPageLoader />;

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <Content
        className="site-layout-background"
        style={{
          margin: 0,
          minHeight: 280,
        }}
      >
        <Row justify="space-between">
          <Col span={10}>
            <Card
              cover={<img src={dogDetail.image} alt={dogDetail.name} />}
              style={{ marginTop: 30 }}
            >
              <h1 className="dogDetail_h1">{dogDetail.name?.toUpperCase()}</h1>
              <h3 className="dogDetail_h3">
                <b>Breed: </b>
                {dogDetail.breed}
              </h3>
              <h3 className="dogDetail_h3">
                <b>Color: </b>
                {dogDetail.color}
              </h3>
              <h3 className="dogDetail_h3">
                <b>Age: </b>
                {dogDetail.age}
              </h3>
              <h3 className="dogDetail_h3">
                <b>Gender: </b>
                {dogDetail.gender}
              </h3>
              <h3 className="dogDetail_h3">
                <b>Size: </b>
                {dogDetail.size}
              </h3>
              <h3 className="dogDetail_h3">
                <b>Location: </b>
                {dogDetail.location}
              </h3>
            </Card>
          </Col>
          <Col span={13}>
            <h3 className="dogDetail_about">{dogDetail.about}</h3>
            <h2 style={{ color: "red" }}>
              Are you interested to adopt this pet ?
            </h2>
            <Button style={{ marginRight: 10 }} onClick={showModal}>
              Send message to Owner
            </Button>
            <Button onClick={AdoptionRequestHandler}>
              Sent an adoption request
            </Button>
          </Col>
        </Row>
        <Modal
          title="Send a message to owner"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={false}
          destroyOnClose={true}
        >
          <TextArea
            rows={4}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <Button
            style={{ marginTop: 10 }}
            disabled={message.length === 0}
            onClick={async () => await CreateConversation()}
          >
            Send
          </Button>
        </Modal>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    dogData: state.dog.dogData,
    dogCount: state.dog.dogCount,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      makeAdoption,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(DogDetail);
