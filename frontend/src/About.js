import logo from "./assets/TaskNow_logo.png";
import {Link} from "react-router-dom";
import React from "react";

function About() {
    return (
        <div className="Container">
            <Link to="/">
                <img alt="TaskNow Logo" src={logo} style={{height: "4em"}}/>
            </Link>
            <div className="Subcontainer">
                <main>
                    <article>
                        <h1>Sobre a TaskNow</h1>
                        <p><strong>TaskNow</strong> é uma plataforma online inovadora que liga utilizadores a uma vasta
                            rede de prestadores de serviços, de forma rápida, segura e conveniente. O nosso objetivo é
                            simplificar o processo de contratação de serviços — desde reparações domésticas a apoio
                            técnico, passando por serviços de limpeza, design, aulas particulares e muito mais.</p>
                    </article>

                    <article>
                        <h2>O nosso propósito</h2>
                        <p>Vivemos numa era em que o tempo é precioso e a confiança é essencial. A TaskNow nasceu para
                            responder a essa realidade, oferecendo um espaço onde qualquer pessoa pode encontrar
                            facilmente profissionais qualificados para tarefas do dia a dia, sem complicações. Quer
                            precise de ajuda imediata ou de planear um serviço para mais tarde, estamos aqui para
                            facilitar cada passo do processo.</p>
                    </article>

                    <article>
                        <h2>Funcionalidades principais</h2>
                        <ul>
                            <li><strong>Pesquisar e comparar prestadores de serviço</strong> por localização, categoria
                                e avaliação;
                            </li>
                            <li><strong>Solicitar orçamentos personalizados</strong> para o seu projeto ou necessidade;
                            </li>
                            <li><strong>Agendar serviços diretamente</strong> através da plataforma;</li>
                            <li><strong>Gerir os seus pedidos e comunicações</strong> com total controlo e
                                transparência;
                            </li>
                            <li><strong>Avaliar os prestadores</strong> após a conclusão do serviço, ajudando outros
                                utilizadores a fazer escolhas informadas.
                            </li>
                        </ul>
                    </article>

                    <article>
                        <h2>Compromisso com a qualidade</h2>
                        <p>A nossa equipa de <strong>moderadores dedicados</strong> está sempre atenta para garantir que
                            todas as interações na plataforma decorrem de acordo com os nossos regulamentos. Estamos
                            comprometidos com a segurança, o respeito e a qualidade em todos os serviços oferecidos.
                            Quando escolhe a TaskNow, escolhe uma plataforma que coloca a confiança e a responsabilidade
                            em primeiro lugar.</p>
                    </article>
                </main>

            </div>
        </div>
    );
}

export default About;