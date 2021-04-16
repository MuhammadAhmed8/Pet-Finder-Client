import React, { useEffect, useState } from "react";
import { Table, Layout, Button, Modal , Tag, Divider} from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FullPageLoader from "../components/loader";
//services
import {
  getAdoptionRequests,
  ChangeRequestStatus,
} from "../services/user.services";
import Title from "antd/lib/skeleton/Title";
const { Content } = Layout;

const AdoptionDashboard = ({ getAdoptionRequests }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [adoptionRequest, setAdoptionRequest] = useState([]);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isDogModalVisible, setIsDogModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const showUserModal = (record = []) => {
    setSelectedData(record);
    setIsUserModalVisible(true);
  };

  const handleUserOk = () => {
    setIsUserModalVisible(false);
  };

  const handleUserCancel = () => {
    setIsUserModalVisible(false);
  };

  const showDogModal = (record = []) => {
    setSelectedData(record);
    setIsDogModalVisible(true);
  };

  const handleDogOk = () => {
    setIsDogModalVisible(false);
  };

  const handleDogCancel = () => {
    setIsDogModalVisible(false);
  };

  const getAdoptionHelper = () =>
    new Promise((resolve, reject) => {
      return getAdoptionRequests(resolve, reject);
    });

  const getAdoption = async () => {
    try {
      return await getAdoptionHelper();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    let adoptions = await getAdoption();
    setAdoptionRequest(adoptions);
    setIsLoading(false);
  }, []);

  const RequestHandlerHelper = (params, status) =>
    new Promise((resolve, reject) => {
      return ChangeRequestStatus(params, status, resolve, reject);
    });

  const RequestHandler = async (params, status) => {
    try {
      setIsLoading(true);
      await RequestHandlerHelper(params, status);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const columns = [
    {
      title: "Request Status",
      dataIndex: "status",
      key: "status",
      width: "100px",
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Accepted",
          value: "accepted",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (record) => <p>{record.toUpperCase()}</p>,
      render: record => {
        let color = record == 'accepted' ? 'green' : 'red';
              if (record == "pending"){
                color = "purple"
              }
        return(
              <Tag color={color} key={record}>
                {record.toUpperCase()}
              </Tag>
        )
        },
    },
    {
      title: "Dog Information",
      key: "showDog",
      width: "100px",
      render: (_, rec, index) => {
        return (
          <Button onClick={() => showDogModal(rec)}>
            Show Dog Information
          </Button>
        );
      },
    },
    {
      title: "User Information",
      key: "showUser",
      width: "100px",
      render: (_, record) => (
        <Button onClick={() => showUserModal(record)}>
          Show User Information
        </Button>
      ),
    },
    {
      title: "Accept Offer",
      key: "accept",
      width: "100px",
      render: (_, record) =>
        record.status === "pending" ? (
          <Button
            onClick={() => {
              return RequestHandler({ id: record._id }, { status: "accepted" });
            }}
          >
            Accept Offer
          </Button>
        ) : (
          <Button disabled={true}>Accept Offer</Button>
        ),
    },
    {
      title: "Reject Offer",
      key: "reject",
      width: "100px",
      render: (_, record) =>
        record.status === "pending" ? (
          <Button
            onClick={() => {
              return RequestHandler({ id: record._id }, { status: "rejected" });
            }}
          >
            Reject Offer
          </Button>
        ) : (
          <Button disabled={true}>Reject Offer</Button>
        ),
    },
  ];

  if (isLoading) return <FullPageLoader />;

  return (
    <Layout className="dashboard_layout">
      <Content
        className="site-layout-background"
        style={{
          margin: 0,
          minHeight: 280,
          height: "100%",
        }}
      >
 

        <Table
          columns={columns}
          dataSource={adoptionRequest}
          scroll={{ x: 240 }}
        />
        {selectedData.length !== 0 ? (
          <Modal
            title="Dog Information"
            visible={isDogModalVisible}
            onOk={handleDogOk}
            onCancel={handleDogCancel}
            destroyOnClose={true}
          >
            <div className="dogAdoption_modal" style={{display:'flex', 'flexDirection':'column', justifyContent:'center', alignContent:'center'}}>
              <div style={{textAlign:'center'}}>
                <img
                  src={selectedData.pet.image}
                  alt={selectedData.pet.name}
                  width={300}
                  height={200}
                />
              </div>
              <Divider></Divider>
              <div>
                <h3><b>Pet ID:</b> {selectedData.pet._id}</h3>
                <h3><b>Name: </b>{selectedData.pet.name}</h3>
                <h3><b>Age:</b> {selectedData.pet.age}</h3>
                <h3><b>Breed:</b> {selectedData.pet.breed}</h3>
                <h3><b>Color:</b> {selectedData.pet.color}</h3>
                <h3><b>Weight: </b>{selectedData.pet.weight}</h3>
                <h3><b>Location:</b> {selectedData.pet.location}</h3>
                <h3><b>Gender: </b>{selectedData.pet.gender}</h3>
                <h3><b>Size: </b>{selectedData.pet.size}</h3>
              </div>
            </div>
          </Modal>
        ) : null}
        {selectedData.length !== 0 ? (
          <Modal
            title="Dog Information"
            visible={isUserModalVisible}
            onOk={handleUserOk}
            onCancel={handleUserCancel}
          >
            <h3>Name: {selectedData.user.name}</h3>
            <h3>Email: {selectedData.user.email}</h3>
            <h3>Location: {selectedData.user.location}</h3>
          </Modal>
        ) : null}
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAdoptionRequests,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AdoptionDashboard);
