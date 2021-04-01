import React from 'react';
import { Jumbotron } from 'reactstrap';

function Contact() {

    return(
        <div className="container">
        <br/>
            <Jumbotron>
                <p className="lead">Pas d’édition 2021. Rendez-vous en 2022 !</p>
                <hr className="my-2" />
                <p>            L’équipe du Festival du jeu de Montpellier vous souhaite à tous une belle année ludique avec vos proches !

                Vous vous en doutez certainement, au vu du contexte épidémique actuel, il ne nous est malheureusement pas possible de tenir le Festival cette année, à l’origine prévu au Corum les 27 & 28 mars prochain.

                Même si nous étions autorisés à tenir le Festival avec une jauge de visiteurs limitée, cette solution ne serait pas viable financièrement. Festival gratuit, rappelons que nos recettes proviennent essentiellement de la participation financière des éditeurs, des ventes de jeux par la boutique du Festival, des ventes de notre espace restauration et des tickets de tombola. Moins de tables de jeux, donc moins d’éditeurs présents, et une fréquentation plus faible impacteraient fortement l’atteinte de l’équilibre financier qui permet au Festival de perdurer.

                Nous étudions les possibilités d’organisation d’événements ludiques avec les associations de la région, membres du Festival du jeu. Notamment, nous espérons pouvoir vous proposer une émission sur une radio locale autour du jeu de société et des nouveautés ludiques 2021.

                Et nous vous donnons rendez-vous en 2022 pour une nouvelle édition dans son format habituel.

                Prenez soin de vous !

                L’équipe du Festival du jeu de Montpellier</p>
                <p className="lead">
                </p>
            </Jumbotron>
        </div>
    );
}

export default Contact;
