import React, { useState, useEffect } from "react";
import { withRouter, Link } from 'react-router-dom';
import {
    Layout, Table, Space, Breadcrumb, Spin
} from 'antd';

import Text from 'antd/lib/typography/Text';
import styles from './MoviesList.module.css';
import axios from 'axios';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        axios.get(`/api/films`)
            .then((res) => {
                setMovies(res.data.results);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const columns = [
        {
            title: 'Movie Name',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Producer',
            dataIndex: 'producer',
            key: 'producer'
        },
        {
            title: 'Director',
            dataIndex: 'director',
            key: 'director'
        },
        {
            title: 'Release Date',
            dataIndex: 'release_date',
            key: 'release_date'
        },
        {
            title: 'Action',
            dataIndex: 'episode_id',
            key: 'episode_id',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/movies/${record.episode_id}/characters`}>View Characters</Link>
                </Space>
            )
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
            </Breadcrumb>

            <Text className={styles.moviesHeader}>Movies</Text>
            <Table 
                className={styles.moviesTable} 
                columns={columns} dataSource={movies} 
                rowKey={(record) => record.episode_id}
            />
        </Layout>
    );
};

export default withRouter(MoviesList);