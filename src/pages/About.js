import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../styles/pages/About.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
//import das imagens//
import ilustração from './../assets/img/about-ilustration.svg';
import github from './../assets/img/icon-github.svg';
import email from './../assets/img/icon-envelope.svg';
import linkedin from './../assets/img/icon-awesome-linkedin.svg';


function About() {
    const [paragh, setParagh] = useState("");
    const [seniors, setSeniors] = useState([]);
    useEffect (()=>{   
        //chamada dados sobre 
        axios.get('https://api.airtable.com/v0/app6wQWfM6eJngkD4/Projeto?maxRecords=3&view=Grid%20view&api_key=key2CwkHb0CKumjuM')
        .then(function  (response) {
        //console.log('API Paragrafo-->',(response.data.records[1].fields.Sobre));
        setParagh(response.data.records[1].fields.Sobre)
        })
        .catch(function  (error) {
        console.log(error);
        });
        //chamada da equipe
        axios.get("https://api.airtable.com/v0/app6wQWfM6eJngkD4/Equipe?api_key=key2CwkHb0CKumjuM&filterByFormula=({Squad}='2')")
        .then(function (response) {
            console.log("API Equipe-->",response.data.records)

            setSeniors(response.data.records)
        })
        .catch(function (error) {
            console.log(error);
        })
    }, [])
    // fim da chamda api no conteudo sobre


    return <div className={styles.bgabout} >
        <Header template="home" />
        <div className={styles.firstContent} > { /*primeiro conteudo */}
            <div className={styles.divsobreprojeto} >
                <h1 className={styles.titulosobreprojeto} > Sobre o Projeto </h1>
                {/*paragrafo da descrição do projeto*/}
                <p className={styles.paragrafosobreprojeto} >
                {paragh}
                </p>
                  
            </div>
            <div className={styles.divilustration} >
                <img src={ilustração}
                    alt="Ilustração" />
            </div>
        </div>

        <h1 className={styles.who}>Quem somos</h1>
        <div className={styles.wrapperflex}>
        {/* USUARIOS */}
        {seniors.map (
            SR => (

            <div className={styles.container}>

                <img src={SR.fields['Imagem de perfil'][0].url} alt='profile' className={styles.profileimg}/>

                <h1 className={styles.name}>{SR.fields.Nome}</h1>
                <p className={styles.description}>{SR.fields.Descrição}</p>
                <div className={styles.social}>
                    <a href={SR.fields.Github} target='_blank' rel="noopener noreferrer">
                        <img className={styles.github} src={github} alt=""/>
                    </a>
                    <a href={"mailto:" + SR.fields.Email} target='_blank' rel="noopener noreferrer">
                        <img className={styles.email} src={email} alt=""/>
                    </a>
                    <a href={SR.fields.LinkedIn} target='_blank' rel="noopener noreferrer">
                        <img className={styles.linkedin} src={linkedin} alt=""/>
                    </a>
                </div>
            </div>

                )
            )}
        </div>

        <Footer />
        </div>

}

export default About
