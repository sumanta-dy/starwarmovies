import React, { useState, useEffect, Fragment } from "react";
import { withRouter, Link } from 'react-router-dom';
import {
    Layout, Table, Space, Modal, Breadcrumb, Spin
} from 'antd';

import Text from 'antd/lib/typography/Text';
import styles from './MovieCharacters.module.css';
import axios from 'axios';

const MovieCharacters = (props) => {
    const [characters, setCharacters] = useState([]);
    const [charDetails, setCharDetails] = useState([]);
    const [showCharacterModal, setShowCharacterModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const inviteUserModalToggle = () => {
        setShowCharacterModal(!showCharacterModal);
    };

    useEffect(() => {
        let movieID = props.match.params.movieID;

        if(movieID) {
            setLoading(true);

            axios.get(`/api/films/${movieID}`)
                .then((res) => {                    
                    let tempCharactersAPI = (res && res.data && res.data.characters ? res.data.characters : []);
                    let tempCharacters = [];
                    
                    //tempCharactersAPI.map((value, index) => {
                    tempCharactersAPI.forEach((value, index) => {
                        axios.get(value)
                            .then((response) => {
                                let data = response.data;
                                data.id = index + 1;
                                tempCharacters.push(data);
                                
                                if(index === tempCharactersAPI.length - 1) {
                                    setCharacters(tempCharacters);
                                    setLoading(false);
                                }
                            })
                            .catch((error) => {
                                setLoading(false);
                            })
                    });
                    
                })
                .catch((err) => {
                    console.log('Error: ', err);
                });
        }
    }, [props.match.params.movieID]);

    const handleView = (e, id) => {
        e.preventDefault();

        inviteUserModalToggle();
        let tempCharDetails = [];

        characters.forEach(value => {
            if(id === value.id) {
                tempCharDetails = value;
            }
        });
        setCharDetails(tempCharDetails);
    };

    const columns = [
        {
            title: 'Character Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => (
                <Space size="middle">
                    <a href="/#" onClick={(e) => handleView(e, record.id)}>View Details</a>
                </Space>
            ),
        }
    ];

    return (
        <Layout className={styles.mainLayout}>
            {loading ? 
                <div className={styles.overlay}>
                    <Spin className={styles.spinner} tip="Loading..." size="large" spinning={loading} />
                </div>
            : null}

            <Breadcrumb className={styles.breadcrumb}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/">Movies</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Characters</Breadcrumb.Item>
            </Breadcrumb>

            <Text className={styles.charactersHeader}>Characters</Text>
            <Table className={styles.charactersTable} columns={columns} dataSource={characters} />

            <Modal
                className=""
                title="Character's Details"
                visible={showCharacterModal}
                onOk={inviteUserModalToggle}
                onCancel={inviteUserModalToggle}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <Layout className={styles.modalBody}>
                    {charDetails && Object.keys(charDetails).length ? 
                        <Fragment>
                            <Layout>
                                <ul className={styles.detailsList}>
                                    <li>
                                        <span>Name</span>
                                    </li>
                                    <li>
                                        <span>{charDetails.name}</span>
                                    </li>
                                </ul>
                            </Layout>
                            <Layout>
                                <ul className={styles.detailsList}>
                                    <li>
                                        <span>Eye Color</span>
                                    </li>
                                    <li>
                                        <span>{charDetails.eye_color}</span>
                                    </li>
                                </ul>
                            </Layout>
                            <Layout>
                                <ul className={styles.detailsList}>
                                        <li>
                                            <span>Gender</span>
                                        </li>
                                        <li>
                                            <span>{charDetails.gender}</span>
                                        </li>
                                </ul>
                            </Layout>
                            <Layout>
                                <ul className={styles.detailsList}>
                                    <li>
                                        <span>Height(cm)</span>
                                    </li>
                                    <li>
                                        <span>{charDetails.height}</span>
                                    </li>
                                </ul>
                            </Layout>
                            <Layout>
                                <ul className={styles.detailsList}>
                                    <li>
                                        <span>Complexion</span>
                                    </li>
                                    <li>
                                        <span>{charDetails.skin_color}</span>
                                    </li>
                                </ul>
                            </Layout>
                            <Layout>
                                <ul className={styles.detailsList}>
                                    <li>
                                        <span>Hair Color</span>
                                    </li>
                                    <li>
                                        <span>{charDetails.hair_color}</span>
                                    </li>
                                </ul>
                            </Layout>
                        </Fragment>
                    :
                        <Text>Nothing to display.</Text>
                    }
                </Layout>
            </Modal>
        </Layout>
    );
};

export default withRouter(MovieCharacters);