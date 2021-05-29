import React, { useState } from 'react';

import styles from '../styles/components/ImageResult.module.css';

export default function ImageResult({ result }) {
    const [className, setClassName] = useState(`${styles.imageResultWrapper}`)

    function toggleClassName() {
        if (className.includes('zoomView')) {
            setClassName(`${styles.imageResultWrapper}`)
        } else {
            setClassName(`${styles.imageResultWrapper} ${styles.zoomView}`)
        }
    }

    return (
        <div
            className={className}
            style={{
                backgroundImage: `url(${result.image_url})`
            }}
            onClick={toggleClassName}
            onBlur={() => alert()}
        >
            <div className={styles.infoPost}>
                <span>Postado por:</span>
                <span>@{result.author.username}</span>
            </div>
        </div>
    );
}
