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
    Typography

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

const { Content,Footer } = Layout;
const { Option } = Select;
const { Title } = Typography;

const DogCards = ({ Dogs }) => {
        const addToFavouritesHelper = async(petId) => {
            return new Promise((resolve, reject) => {
                return addToFavourites(petId, resolve, reject);
            });
        };

        const addToFavouritesService = async(petId) => {
            try {
                return await addToFavouritesHelper(petId);
            } catch (error) {
                console.log(error);
            }
        };

        return Dogs.map((dog, i) => ( 
                <Col span = { 8 }
                xs = { 24 }
                sm = { 12 }
                md = { 8 }
                xl = { 6 }
                key = { i } >
                <Link to = { `/pets/${dog._id}` } >
                <Card hoverable
                    cover = { < img alt = { dog.name }
                    src = { dog.image }
                    style = {
                        { height: 250, marginBottom:'20px' } }
                    />}

                >
                <Title style={{fontSize:'1.5rem', textAlign:'center'}}> { dog.name.toUpperCase() } </Title>

                    <Divider/>
                    <div className = "dog_card_footer" >
                    <HeartOutlined
                    onClick = {
                        (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToFavouritesService({ petId: dog._id });
                        }
                    }
                    className = "fvt_icon"/>
                    <h4 style={{fontWeight:"bold"}}>{dog.breed.toUpperCase()}</h4>
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
            const [sizeFilter, setSizeFilter] = useState(null);
            const [colorFilter, setGenderFilter] = useState(null);

            const getDogServiceHelper = (page, filter) => {
                return new Promise((resolve, reject) => {
                    return getDog(page, filter, resolve, reject);
                });
            };

            const getDogService = async(page, filter) => {
                try {
                    return await getDogServiceHelper(page, filter);
                } catch (error) {
                    console.log(error);
                }
            };

            useEffect(() => {
                async function loadData() {
                    setIsLoading(true);
                    let data = await getDogService();
                    setDataSource(data);
                    setIsLoading(false);
                }
                loadData();
                // eslint-disable-next-line react-hooks/exhaustive-deps
            }, []);

            const PaginationHandler = async(page, pageSize) => {
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

            const BreedFilterHandler = async(breed) => {
                setIsLoading(true);
                try {
                    let data = await getDogService(1, {breed});
                    setBreedFilter(breed);
                    setCurrentPage(1);
                    setDataSource(data);
                } catch (error) {
                    console.log(error);
                }
                setIsLoading(false);
            };

            const colorFilterHandler = async(color) => {
                setIsLoading(true);
                try {
                    let data = await getDogService(1, {color});
                    setGenderFilter(color);
                    setCurrentPage(1);
                    setDataSource(data);
                } catch (error) {
                    console.log(error);
                }
                setIsLoading(false);
            };
            const sizeFilterHandler = async(size) => {
                setIsLoading(true);
                try {
                    let data = await getDogService(1, {size});
                    setSizeFilter(size);
                    setCurrentPage(1);
                    setDataSource(data);
                } catch (error) {
                    console.log(error);
                }
                setIsLoading(false);
            };

            if (isLoading) return <FullPageLoader / > ;

            return ( 
                <Layout style = {
                    { padding: "0 24px 24px" } } >
                <div className = "breadcrumb_wrapper" >

                <Breadcrumb style = {
                    { marginTop: "16px" } } >
                <Breadcrumb.Item > Home </Breadcrumb.Item>
                <Breadcrumb.Item > Dogs </Breadcrumb.Item>
                </Breadcrumb>
                <div>
                <Select showSearch name = "breed"
                placeholder = "Breed"
                onChange = { BreedFilterHandler }
                value = { breedFilter }
                className = "breed_filter"
                allowClear>

                {
                    Breeds.map((breed, index) => {
                        return (
                            <Option value = { breed }
                            key = { index } > { breed }
                            </Option>
                        );
                    })
                }
                </Select>
                <Select showSearch name = "color"
                placeholder = "Color"
                onChange = { colorFilterHandler }
                value = { colorFilter }
                className = "breed_filter"
                allowClear>
                    <Option value = 'white'> White
                    </Option>
                    <Option value = 'brown'> Brown
                    </Option>
                    <Option value = 'black'> Black
                    </Option>
                    <Option value = 'merle'> Merle
                    </Option>
                    <Option value = 'sable'> Sable
                    </Option>
                    <Option value = 'gray'> Gray / Silver
                    </Option>
                </Select>
                <Select showSearch name = "size"
                placeholder = "Size"
                onChange = { sizeFilterHandler }
                value = { sizeFilter }
                className = "breed_filter"
                allowClear>
                    <Option value = 'small'> Small
                    </Option>
                    <Option value = 'medium'> Medium
                    </Option>
                    <Option value = 'large'> Large
                    </Option>
                    <Option value = 'giant'> Giant
                    </Option>
                </Select>
                </div>
                </div>
                <center>
                    <div style={{display:'flex', alignItems:'center', justifyContent:'center', margin: '30px 0', flexWrap:'wrap'}}>
                <img src="https://www.pngrepo.com/png/36511/512/dog.png" width="100px" ></img>
                <Title style={{fontSize:'3.2rem', margin:'0px 20px', fontFamily:'poppins', textTransform:'uppercase'}}> 
                Find a Dog </Title>
                </div>
                </center> 
                <Content className = "site-layout-background"
                        style = {
                            {
                                margin: 0,
                                minHeight: 280,
                            }
                        } 
                >
                {
                    dataSource.length === 0 ? (
                        <h3> No Pets available </h3>
                    ) : (
                        <div className = "site-card-wrapper" style={{margin:"0 auto"}} >
                        <Row gutter = { 16 } >
                        <DogCards Dogs = { dataSource }/>
                        </Row>
                        <Pagination current = { currentPage }
                        onChange = { PaginationHandler }
                        total = { dogCount }
                        className = "home_pagination"
                        pageSize = { 2 }
                        />
                        </div>
                    )
                } </Content>
                     <Footer style={{ textAlign: 'center' }}>Canine Shelter ©2018 All rights reserved</Footer>

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