import React from 'react';

import styles from '../styles/components/SearchItem.module.css';

export default function SearchItem({ item }) {
    return (
        <div className = {styles.listItems}>
            <div className = {styles.hashtag}>#{item.hashtag}</div>
            <div className = {styles.date}>{item.data}</div>
            <div className = {styles.time}>{item.hora}</div>
        </div>
    );
}
