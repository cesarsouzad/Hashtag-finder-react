import React from 'react';

import styles from '../styles/components/TextResult.module.css';

export default function TextResult({ result }) {
    return (
        <div className={styles.textResultWrapper}>
            <div className={styles.content}>
                <div className={styles.imageWrapper}>
                    <img src={result.author.profile_image_url} alt="" />
                </div>
                <div className={styles.textWrapper}>
                    <h1>{result.author.name} <span className={styles.userName}>@{result.author.username}</span></h1>
                    <p>{result.content}</p>
                </div>
            </div>
            <div className={styles.linkWrapper}>
                <a href={result.url} target="_blank" rel="noopener noreferrer">Ver mais no Twitter</a>
            </div>
        </div>
    );
}
