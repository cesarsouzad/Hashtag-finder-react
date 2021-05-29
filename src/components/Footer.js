import React from 'react';

import styles from '../styles/components/Footer.module.css';

export default function Footer() {
    return (
        <div className={styles.footerWrapper}>
            <span>@Cocreare {new Date().getFullYear()}. Todos os direitos reservados</span>
        </div>
    );
}
