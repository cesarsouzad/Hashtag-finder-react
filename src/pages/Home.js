import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../styles/pages/Home.module.css';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageResult from '../components/ImageResult';
import TextResult from '../components/TextResult';

// Images
import iconSearch from '../assets/img/icon-search.svg';
import noImage from '../assets/img/no-image.png';

export default function Home() {
    const [buttonActive, setButtonActive] = useState('images');
    const [textSearch, setTextSearch] = useState('');
    const [imagesResult, setImagesResult] = useState([]);
    const [textsResult, setTextsResult] = useState([]);
    const [lastHashtag, setLastHashtag] = useState('backend');

    useEffect(() => {
        searchPosts('backend');
    }, []);


    function getCurrentDate() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function getCurrentHour() {
        const date = new Date();
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        return `${hour}:${minute}`;
    }

    function getURLTwitter(type, hashtag) {
        if (type === 'image') {
            return `https://cors.bridged.cc/https://api.twitter.com/2/tweets/search/recent?query=${hashtag} has:hashtags -is:retweet -is:quote has:images&max_results=10&expansions=author_id,attachments.media_keys&user.fields=id,name,username,profile_image_url,url&media.fields=type,url,width,height&tweet.fields=source`;
        } else if (type === 'text') {
            return `https://cors.bridged.cc/https://api.twitter.com/2/tweets/search/recent?query=${hashtag} has:hashtags -is:retweet -is:quote -has:links -has:images&max_results=10&expansions=author_id,attachments.media_keys&user.fields=id,name,username,profile_image_url,url&media.fields=type,url,width,height&tweet.fields=source`;
        }
    }

    function getURLAirtable() {
        return `https://api.airtable.com/v0/app6wQWfM6eJngkD4/Buscas`;
    }

    function handleTextChange(event) {
        setTextSearch(event.target.value);
    }

    function submitForm(event) {
        event.preventDefault();
        registerSearch();
        let withoutHash = textSearch;
        searchPosts(withoutHash.replace(/#/g, ''));
        setLastHashtag(withoutHash.replace(/#/g, ''));
        setTextSearch('');
    }

    function registerSearch() {
        axios.post(getURLAirtable(), {
            "records": [
                {
                    "fields": {
                        "Squad": "2",
                        "Hashtag": textSearch,
                        "Data": getCurrentDate(),
                        "Hora": getCurrentHour()
                    }
                }
            ]
        }, {
            headers: {
                "Authorization": "Bearer key2CwkHb0CKumjuM",
                "Content-Type": "application/json"
            }
        }).catch(e => console.log('erro\n' + e));
    }

    function searchPosts(hashtag) {
        const headers = {
            headers: {
                "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAFlKHgEAAAAApBW4nRyRkiogluzAbXlS4KuHlMU%3DFcR7r8N19LRnMHLVmYlFsod6Be6zUvZD2rxATotl6mLPAh2UEX"
            }
        }

        axios.get(getURLTwitter('image', hashtag), headers).then(
            response => {
                const users = {};
                response.data.includes.users.forEach(
                    user => {
                        users[String(user.id)] = user.username || '';
                    }
                );

                const medias = {};
                response.data.includes.media.forEach(
                    media => {
                        medias[String(media.media_key)] = media.url || noImage;
                    }
                );

                const results = response.data.data.map(
                    post => {
                        return {
                            "url": `https://twitter.com/user/status/${post.id}`  || '',
                            "image_url": medias[String(post.attachments.media_keys[0])],
                            "author": {
                                "username": users[String(post.author_id)]
                            }
                        };
                    }
                );

                setImagesResult(results);
            }
        )

        axios.get(getURLTwitter('text', hashtag), headers).then(
            response => {
                const users = {};
                response.data.includes.users.forEach(
                    user => {
                        users[String(user.id)] = {
                            "name": user.name || '',
                            "username": user.username || '',
                            "profile_image_url": String(user.profile_image_url).replace('normal', 'bigger')  || noImage,
                            "profile_url": `https://twitter.com/${user.username}`  || ''
                        };
                    }
                );

                const results = response.data.data.map(
                    post => {
                        return {
                            "content": post.text  || '',
                            "url": `https://twitter.com/user/status/${post.id}`  || '',
                            "author": users[String(post.author_id)]
                        };
                    }
                );

                setTextsResult(results);
            }
        );
    }

    return (
        <div>
            <div className={styles.hero}>
                <Header fixed="true" template="home" />
                <div className={styles.heroContent}>
                    <div className={styles.titles}>
                        <h1>Encontre hashtags de maneira fácil.</h1>
                        <h2>Digite o que deseja no campo de buscas e confira os resultados do Twitter abaixo</h2>
                    </div>
                    <form onSubmit={submitForm}>
                        <button>
                            <img src={iconSearch} alt="" />
                        </button>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            className={styles.inputMain}
                            value={textSearch}
                            onChange={handleTextChange}
                            maxLength="140"
                            required
                        />
                    </form>
                </div>
            </div>
            <div className={styles.transition}>
                <div className={styles.switchResults}>
                    <span
                        onClick={() => setButtonActive('tweets')}
                        style={{
                            color: `${buttonActive === 'tweets' ? '#72EFDB' : 'white'}`,
                        }}
                    >
                        Tweets
                    </span>
                    <span
                        onClick={() => setButtonActive('images')}
                        style={{
                            color: `${buttonActive === 'images' ? '#72EFDB' : 'white'}`,
                        }}
                    >
                        Imagens
                    </span>
                </div>
                <div className={styles.baseButtons}>
                    <div
                        style={{
                            transform: `${buttonActive === 'images' ? 'translateX(100%)' : 'translateX(0%)'}`
                        }}
                    >
                    </div>
                </div>
            </div>
            <div className={styles.mainContentWrapper}>
                <h2>Exibindo os 10 resultados mais recentes para #{lastHashtag}</h2>
                <main className={styles.mainContent}>
                    <div className={styles.imagesResults}>
                        {imagesResult.length === 0 ? (
                            <div>Carregando</div>
                        ) : (
                            <ul>
                                {
                                    imagesResult.map(
                                        (result, index) => (
                                            <li key={index}>
                                                <ImageResult result={result}/>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        )}
                    </div>
                    <div className={styles.textsResults}>
                        {textsResult.length === 0 ? (
                            <div>Carregando</div>
                        ) : (
                            <ul>
                                {
                                    textsResult.map(
                                        (result, index) => (
                                            <li key={index}>
                                                <TextResult result={result}/>
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        )}
                    </div>
                </main>
                <main className={styles.mainContentResponsive}>
                    {buttonActive === 'images' ? (
                        <div className={styles.imagesResults}>
                            {imagesResult.length === 0 ? (
                                <div>Carregando</div>
                            ) : (
                                <ul>
                                    {
                                        imagesResult.map(
                                            (result, index) => (
                                                <li key={index}>
                                                    <ImageResult result={result}/>
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            )}
                        </div>
                    ) : (
                        <div className={styles.textsResults}>
                            {textsResult.length === 0 ? (
                                <div>Carregando</div>
                            ) : (
                                <ul>
                                    {
                                        textsResult.map(
                                            (result, index) => (
                                                <li key={index}>
                                                    <TextResult result={result}/>
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            )}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
}
