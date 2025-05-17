import logo from "./assets/TaskNow_logo.png";
import {Link} from "react-router-dom";
import React from "react";

function Contactos() {
    return (
        <div className="Container">
            <Link to="/">
                <img alt="TaskNow Logo" src={logo} style={{height: "4em"}}/>
            </Link>
            <div className="Subcontainer">
                <main>
                    <section >
                        <h1>Contactos</h1>
                        <p>
                            Precisas de ajuda ou tens alguma questão? A nossa equipa de apoio ao utilizador está sempre
                            pronta a ajudar!
                        </p>

                        <ul>
                            <li>
                                <strong>Email:</strong> <a href="mailto:apoio@tasknow.pt">apoio@tasknow.pt</a>
                            </li>
                            <li>
                                <strong>Telefone:</strong> <a href="tel:+351210230449">+351 210 230 449</a>
                            </li>
                            <li>
                                <strong>Horário de Atendimento:</strong> Segunda a Sexta, das 9h às 18h
                            </li>
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Contactos;