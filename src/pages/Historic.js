import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SearchItem from '../components/SearchItem';
import styles from "../styles/pages/Historic.module.css"

export default function Historic() {
    const [searchItems, setSearchItems] = useState([]);

    function getURL() {
        return `https://api.airtable.com/v0/app6wQWfM6eJngkD4/Buscas?filterByFormula=({Squad}='2')&_Limit='5'`;
    }

    useEffect(() => {
        axios.get(getURL(), {
            headers: {
                "Authorization": "Bearer key2CwkHb0CKumjuM"
            }
        }).then(
            response => {
                const results = response.data.records.map(
                    record => {
                        return {
                            "hashtag": record.fields.Hashtag,
                            "data": record.fields.Data,
                            "hora": record.fields.Hora
                        }
                    }
                )
                setSearchItems(results);
            }
        )
    }, []);

    return (
        <div className={styles.body}>
            <Header template="tableSearch" />
            <div className={styles.container}>
                <h2>Buscas realizadas</h2>
                <div className={styles.list}>
                    {/* Topo da lista */}
                    <div className={styles.listTop}>
                        <div className={styles.listHeader}>
                            <div className={styles.hashtag}>Hashtag</div>
                            <div className={styles.date}>Data</div>
                            <div className={styles.time}>Hora</div>
                        </div>
                    </div>
                    {
                        /* Dados das buscas realizadas */
                        searchItems.map(item => <SearchItem item={item} />)
                    }
                </div>
            </div>
        </div>
    );
}
