import nopermissionsimg from "./assets/nopermissionsimg.png";
import logo from "./assets/TaskNow_logo.png";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Button from 'react-bootstrap/Button';


function ErrorPagePermissions() {
    const navigate = useNavigate();

    return (
        <div className="Container" style={{ textAlign: "center", padding: "2em" }}>
            <Link to="/">
                <img alt="TaskNow Logo" src={logo} style={{height: "4em"}}/>
            </Link>
            <div className="Subcontainer">
                <main>
                    <section>
                        <h2>Desculpa, mas não tens permissões para aceder a esta área</h2>
                        <img alt="Sem permissões" src={nopermissionsimg} style={{ height: "200px", margin: "1em" }} />
                        <br />
                        <Button variant="primary" onClick={() => navigate("/")}>
                            Voltar à Página Inicial
                        </Button>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default ErrorPagePermissions;