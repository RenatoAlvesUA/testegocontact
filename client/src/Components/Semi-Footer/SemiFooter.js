import React, {Component} from 'react';
import 'moment/locale/pt';
import moment from 'moment';

class SemiFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        fetch('/api/lastnews?id=' + this.props.topic)
            .then(res => res.json())
            .then(json => {
                console.log(json.data)
                if (json.success) {
                    this.setState({
                        data: json.data,
                        loading: true
                    })
                }
            });
    }

    render() {
        console.log(this.props.topic)
        const data = this.state.data && this.state.data.map((val) =>
            <article key={val.url || val.link} className="col-block popular__post">
                <a href="#0" className="popular__thumb">
                    {(val.urlToImage || val.thumbnailUrl) ? (
                        <img src={val.urlToImage || val.thumbnailUrl}/>) : (null)}
                </a>
                <h5><a href={val.url || val.link}>{val.title}</a></h5>
                <section className="popular__meta">
                    <span className="popular__author"><span>De</span> <a
                        href="#0"> {val.idName || val.publisher} </a></span>
                    <span className="popular__date"><span>em</span> <time
                        dateTime="2017-12-19">{moment.utc(val.pubDate).format("dddd, MMM D, h:mm:ss a") || moment.utc(val.publishedAt).format("dddd, MMM D, h:mm:ss a")}</time></span>
                </section>
            </article>
        )


        if (this.state.loading) {
            return (<div>
                <section className="s-extra">
                    <div className="row top">
                        <div className="col-eight md-six tab-full popular">
                            <h3>{this.props.topic}</h3>
                            <div className="block-1-2 block-m-full popular__posts">
                                {data}
                            </div>
                        </div>
                        <div className="col-four md-six tab-full about">
                            <h3>Sobre Portucália</h3>
                            <p>
                                O website Portucália representa a ambição de ser uma montra atualizada sobre os diferentes territórios regionais, ambição concretizada através da filtragem de conteúdos dos principais portais de notícias e uma interface gráfica intuitiva representada por um design com uma identidade cultural bem reconhecível.
                            </p>
                            <ul className="about__social">
                                <li>
                                    <a href="#0"><i className="fa fa-facebook" aria-hidden="true"/></a>
                                </li>
                                <li>
                                    <a href="#0"><i className="fa fa-twitter" aria-hidden="true"/></a>
                                </li>
                                <li>
                                    <a href="#0"><i className="fa fa-instagram" aria-hidden="true"/></a>
                                </li>
                                <li>
                                    <a href="#0"><i className="fa fa-pinterest" aria-hidden="true"/></a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </section>

            </div>)
        }
        return (<div className="spinner">
            <div style={{backgroundColor: '#000000'}}
                 className="cube1"></div>
            <div style={{backgroundColor: '#000000'}}
                 className="cube2"></div>
        </div>)


    }
}

export default SemiFooter;

