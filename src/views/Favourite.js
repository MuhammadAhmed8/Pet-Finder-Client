import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import FullPageLoader from "../components/loader";
import { Layout, Card, Col, Divider, Row } from "antd";
import { PageHeader } from 'antd';


import { HeartOutlined } from "@ant-design/icons";
//services
import { getFavourites } from "../services/user.services";

const { Content } = Layout;

const Cards = ({ favourites }) => {
        return favourites.map((dog, i) => (
                <Col span = { 8 } xs = { 24 }
                sm = { 12 }
                md = { 8 }
                xl = { 6 }
                key = { i }> 
                <Card hoverable style = {
                    { maxWidth: '300px' } }
                cover = { < img alt = { dog.name }
                    src = { dog.image }
                    style = {
                        { height: 250 }
                     }
                    />
                        }>
                    <h3 > { dog.name.toUpperCase() } </h3>

                    <h3 > { dog.breed.toUpperCase() } </h3>
                    <Divider/>
                    <div className = "dog_card_footer" >
                    <HeartOutlined/> { dog.price }
                    </div> </Card> { /* </Link> */ }
                    </Col>
                ));
        };

        const Favourite = ({ getFavourites, userFavourites }) => {
            const [isLoading, setIsLoading] = useState(false);
            const [favourites, setFavourites] = useState([]);

            const getFavouritesHelper = () =>
                new Promise((resolve, reject) => {
                    return getFavourites(resolve, reject);
                });

            const getFavouritesService = async() => {
                try {
                    return await getFavouritesHelper();
                } catch (error) {
                    console.log(error);
                }
            };

            useEffect(async() => {
                setIsLoading(true);
                let favr = await getFavouritesService();
                setFavourites(favr);
                setIsLoading(false);
            }, []);

            if (isLoading) return <FullPageLoader / > ;

            if (favourites.length === 0)
                return ( <Layout style = {
                        { padding: "0 24px 24px" } } >
                    <Content className = "site-layout-background"
                    style = {
                        {
                            marginTop: 20,
                            minHeight: 280,
                        }
                    } >
                    <h1 > You have no Favourites </h1>
                    </Content>
                    </Layout>
                );

            return (
                <Layout style = {
                    { padding: "0 24px 24px" } } >
                <Content className = "site-layout-background"
                style = {
                    {
                        marginTop: 20,
                        minHeight: 280,
                    }
                }>
                <PageHeader className = "site-page-header"
                title = "My Favourites"
                subTitle = { favourites.length }
                /> <Row gutter = { 15 }>

                <Cards span = { 8 }
                xs = { 24 }
                sm = { 12 }
                md = { 8 }
                xl = { 6 }
                favourites = { favourites }/>
                </Row>
                </Content>
                </Layout>
            );
        };

        const mapStateToProps = (state) => ({
            userFavourites: state.user.userFavourites,
        });

        const mapDispatchToProps = (dispatch) =>
            bindActionCreators({
                    getFavourites,
                },
                dispatch
            );

        export default connect(mapStateToProps, mapDispatchToProps)(Favourite);