import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => (
    <footer>
        <div className="s-footer__main">
            <div className="row">
                <div className="col-two md-four mob-full s-footer__sitelinks">
                    <h4>Links</h4>
                    <ul className="s-footer__linklist">
                        <li><Link to="/">Atualidade</Link></li>
                        <li><Link to="/category/localnews">Notícias Locais</Link></li>
                        <li><Link to="/events">Eventos</Link></li>
                        <li><Link to="/venues">Serviços</Link></li>
                        <li><Link to="/videos">Vídeos</Link></li>

                    </ul>
                </div>
                {/* end s-footer__sitelinks */}
                <div className="col-two md-four mob-full s-footer__archives">
                    <h4>Categorias Noticias</h4>
                    <ul className="s-footer__linklist">
                        <li><Link to="/category/entretenimento">Entretenimento</Link></li>
                        <li><Link to="/category/saude">Saúde</Link></li>
                        <li><Link to="/category/desporto">Desporto</Link></li>
                        <li><Link to="/category/tecnologia">Tecnologia</Link></li>
                        <li><Link to="/category/negocios">Negócios</Link></li>

                    </ul>
                </div>
                {/* end s-footer__archives */}
                <div className="col-two md-four mob-full s-footer__social">
                    <h4>Social</h4>
                    <ul className="s-footer__linklist">
                        <li><a href="#0">Facebook</a></li>
                        <li><a href="#0">Instagram</a></li>
                        <li><a href="#0">Twitter</a></li>
                        <li><a href="#0">Pinterest</a></li>
                        <li><a href="#0">Google+</a></li>
                        <li><a href="#0">LinkedIn</a></li>
                    </ul>
                </div>
                {/* end s-footer__social */}

            </div>
        </div>
    </footer>
);

export default Footer;
