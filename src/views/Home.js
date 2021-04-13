import React, { useEffect, useState } from "react";
import {
  Layout,
  Breadcrumb,
  Card,
  Col,
  Row,
  Divider,
  Pagination,
  Select,
  Button,
} from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FullPageLoader from "../components/loader";
import { Breeds } from "../json/dogBreeds";
import { Link } from "react-router-dom";

//services
import { getDog } from "../services/dog.services";
import { addToFavourites } from "../services/user.services";

const { Content } = Layout;
const { Option } = Select;

// const Dogs = [
//   {
//     key: 0,
//     name: "Bella",
//     price: "$15",
//     breed: "German Shepherd",
//     owner: "Ahmed",
//     img: "images/mydog.jpg",
//   },
//   {
//     key: 1,
//     name: "Luna",
//     price: "$15",
//     breed: "Bulldog ",
//     owner: "Ahmed",
//     img: "images/mydog.jpg",
//   },
//   {
//     key: 2,
//     name: "Bailey",
//     price: "$15",
//     breed: "ABC",
//     owner: "Ahmed",
//     img: "images/mydog.jpg",
//   },
//   {
//     key: 3,
//     name: "Daisy",
//     price: "$15",
//     breed: "ABC",
//     owner: "Ahmed",
//     img: "images/mydog.jpg",
//   },
//   {
//     key: 4,
//     name: "ABC",
//     price: "$15",
//     breed: "ABC",
//     owner: "Ahmed",
//     img: "images/mydog.jpg",
//   },
//   {
//     key: 5,
//     name: "ABC",
//     price: "$15",
//     breed: "ABC",
//     owner: "Ahmed",
//     img: "images/mydog.jpg",
//   },
// ];

const DogCards = ({ Dogs }) => {
  const addToFavouritesHelper = async (petId) => {
    return new Promise((resolve, reject) => {
      return addToFavourites(petId, resolve, reject);
    });
  };

  const addToFavouritesService = async (petId) => {
    try {
      return await addToFavouritesHelper(petId);
    } catch (error) {
      console.log(error);
    }
  };

  return Dogs.map((dog, i) => (
    <Col span={8} key={i}>
      <Link to={`/pets/${dog._id}`}>
        <Card
          hoverable
          style={{ width: 300 }}
          cover={<img alt={dog.name} src={dog.image} style={{ height: 250 }} />}
          style={{ marginTop: 10 }}
        >
          <h3>{dog.name.toUpperCase()}</h3>

          <h3>{dog.breed.toUpperCase()}</h3>
          <Divider />
          <div className="dog_card_footer">
            <HeartOutlined
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToFavouritesService({ petId: dog._id });
              }}
              className="fvt_icon"
            />
            {dog.price}
          </div>
        </Card>
      </Link>
    </Col>
  ));
};

const Home = ({ getDog, dogCount }) => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [breedFilter, setBreedFilter] = useState(null);

  const getDogServiceHelper = (page, breedFilter) => {
    return new Promise((resolve, reject) => {
      return getDog(page, breedFilter, resolve, reject);
    });
  };

  const getDogService = async (page, breedFilter) => {
    try {
      return await getDogServiceHelper(page, breedFilter);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    setIsLoading(true);
    let data = await getDogService();
    setDataSource(data);
    setIsLoading(false);
  }, []);

  const PaginationHandler = async (page, pageSize) => {
    setIsLoading(true);
    try {
      let data = await getDogService(page, breedFilter);
      setCurrentPage(page);
      setDataSource(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const BreedFilterHandler = async (breed) => {
    setIsLoading(true);
    try {
      let data = await getDogService(1, breed);
      setBreedFilter(breed);
      setCurrentPage(1);
      setDataSource(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (isLoading) return <FullPageLoader />;

  return (
    <Layout style={{ padding: "0 24px 24px" }}>
      <div className="breadcrumb_wrapper">
        <Breadcrumb style={{ marginTop: "16px" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dogs</Breadcrumb.Item>
        </Breadcrumb>
        <Select
          showSearch
          name="breed"
          placeholder="Select the Breed Filter"
          onChange={BreedFilterHandler}
          value={breedFilter}
          className="breed_filter"
          allowClear
        >
          {Breeds.map((breed, index) => {
            return (
              <Option value={breed} key={index}>
                {breed}
              </Option>
            );
          })}
        </Select>
      </div>
      <Content
        className="site-layout-background"
        style={{
          margin: 0,
          minHeight: 280,
        }}
      >
        {dataSource.length === 0 ? (
          <h3>No Pets available</h3>
        ) : (
          <div className="site-card-wrapper">
            <Row gutter={16}>
              <DogCards Dogs={dataSource} />
            </Row>
            <Pagination
              current={currentPage}
              onChange={PaginationHandler}
              total={dogCount}
              className="home_pagination"
              pageSize={2}
            />
          </div>
        )}
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
  bindActionCreators({ getDog }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
