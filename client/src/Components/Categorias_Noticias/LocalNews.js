import React, {Component} from 'react';
import SocialShare from "./SocialShare";
import Comments from "./comments";
import 'moment/locale/pt';
import moment from 'moment';
import {Button} from 'reactstrap';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import MasonryInfiniteScroller from 'react-masonry-infinite';


class LocalNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestSent: false,
            load: false,
            btnMore: false,
            city: 0
        };
        this.querySearchResult = this.querySearchResult.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.doQuery = this.doQuery.bind(this);

    }


    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
        if (this.props.value && this.props.value.length > 120) {
            this.props.showFooter(true);
            window.removeEventListener('scroll', this.handleOnScroll);
            this.setState({requestSent: 0, btnMore: true});
            this.props.showSemiFooter(this.props.cityLocalNews);
        }

        if (this.props.value && this.props.value.length > 0)
            return;
        console.log(this.props.ComboLocalNews)
        this.props.showFooter(false);
        this.props.showSemiFooter(false);
        if (this.props.ComboLocalNews.length) {
            this.setState({requestSent: true});

            fetch('/api/localnews_option?city=' + this.props.ComboLocalNews + '&id=' + this.props.value.length + '&count=' + 60)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log(json.data);
                        // var newData = (this.props.value || []).concat(json.data);
                        this.props.setValue(json.data);
                        this.props.setComboLocalNews('');
                        this.props.showFooter(false);

                        this.props.setCityLocalNews(this.props.ComboLocalNews);
                        this.setState({requestSent: false});
                        //    var newData = (this.props.values || []).concat(json.data.slice(this.props.values.length, this.props.values.length + 2));
                        // this.props.set(newData.slice(0, this.props.values.length + 2));

                    }
                });
        }
        if (this.props.ComboLocalNews.length === 0) {
            console.log(this.props.IDtoken)
            fetch('/api/localnews?idUser=' + this.props.IDtoken + '&id=' + 0 + '&count=' + 60)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        // var newData = json.data.concat(this.props.value || []);
                        console.log(json)
                        this.props.setValue(json.data);
                        this.props.setCityLocalNews(json.city);
                        this.setState({requestSent: false});
                    }
                    if (json.fail) {
                        window.removeEventListener('scroll', this.handleOnScroll);
                    }

                });
        }

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);

    }


    querySearchResult() {
        if (this.state.requestSent) {
            return;
        }

        // enumerate a slow query

        setTimeout(this.doQuery, 10);


    }


    doQuery() {
        this.setState({requestSent: true});
        fetch('/api/localnews_scroll?city=' + this.props.cityLocalNews + '&id=' + this.props.value.length + '&count=' + 20)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    if (json.data.length === 0) {
                        this.props.showFooter(true);
                        window.removeEventListener('scroll', this.handleOnScroll);
                        this.setState({requestSent: 0, btnMore: true});
                    }
                    console.log(json.data);
                    var newData = (this.props.value || []).concat(json.data);
                    this.props.setValue(newData);
                    this.setState({requestSent: false});
                    //    var newData = (this.props.values || []).concat(json.data.slice(this.props.values.length, this.props.values.length + 2));
                    // this.props.set(newData.slice(0, this.props.values.length + 2));

                }
            });
    }

    handleOnScroll() {
        // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {

            this.querySearchResult();
        }
    }

    render() {

        /* let gridArray = this.imagesArrayToGridArray(3);
         console.log(gridArray, 'gridArray');*/
        const data = this.props.value && this.props.value.map((val) =>

            (this.state.comment !== val.link) ? (
                
                <div key={val.link} style={{marginBottom: '10px'}} className="col-xs-12 col-md-6 col-lg-4 CatNew">
                    <div style={{paddingBottom:'12%'}}className="masonry">

                        <div  className="entry__text">
                            <div className="entry__header">
                                <div className="entry__date">
                                    <a href="single-standard.html">{moment(val.pubDate).format("dddd, MMM D, h:mm:ss a")}</a>
                                </div>
                                <h4 className="entry__title"><a href={val.link}>{val.title}</a></h4>
                              
                            </div>
{(val.thumbnailUrl) ? ( 
<img src={val.thumbnailUrl}
/>)
 : (null)}
                            <div className="entry__excerpt">
                                <p>{val.description}</p>
                            </div>

                            <div className="entry__meta">
                                <span className="entry__meta-links">
                     <SocialShare title={val.title} link={val.link}/>
                                    <Button
                                        onClick={() => this.setState({comment: val.link})}
                                        outline
                                        color="secondary">Ver comentários</Button>{' '}
                                    <br/>
                                    <a href={val.link}>Ver mais em {val.publisher} </a>
                </span>

                            </div>
                        </div>
                    </div>
                </div>) : (
                                                        <div key={val.link} style={{marginBottom: '10px'}} className="col-xs-12 col-md-6 col-lg-4 CatNew">

                <Comments IDtoken={this.props.IDtoken} setComment={(value) => this.setState({comment: value})}
                          IDnoticia={this.state.comment}/>
                          </div>
            )
        );


        return (
            <div>
                <section className="s-content">


                    <div className="row narrow">
                    <div style={{margin:'0 auto'}} className="s-content__header">
                    <h1>Notícias Locais</h1>
                    <h4>Escolha a cidade:</h4>
                        </div>
                        </div>
                        <div className="row narrow">
                        <div style={{margin:'0 auto'}} className="s-content__header">

                                <DropDownMenu
                                    value={this.state.city}
                                    onChange={(event, index, value) => {
                                        this.props.setComboLocalNews(value)
                                        this.props.setValue('')
                                    }}
                                    labelStyle={{textColor: "gray", paddingLeft: 0, marginLeft: 0}}
                                    underlineStyle={{margin: 0, borderColor: 'black'}}
                                    autoWidth={true}
                                    selectedMenuItemStyle={{color: 'blue'}}
                                    animated={true}
                                    menuStyle={{fontFamily: "metropolis-regular"}}
                                >
                                    <MenuItem value={0} primaryText="Escolha a região"/>
                                    <MenuItem value={'Aveiro'} primaryText="Aveiro"/>
                                    <MenuItem value={'Beja'} primaryText="Beja"/>
                                    <MenuItem value={'Braga'} primaryText="Braga"/>
                                    <MenuItem value={'Bragança'} primaryText="Bragança"/>
                                    <MenuItem value={'Castelo Branco'} primaryText="Castelo Branco"/>
                                    <MenuItem value={'Coimbra'} primaryText="Coimbra"/>
                                    <MenuItem value={'Évora'} primaryText="Évora"/>
                                    <MenuItem value={'Faro'} primaryText="Faro"/>
                                    <MenuItem value={'Guarda'} primaryText="Guarda"/>
                                    <MenuItem value={'Madeira'} primaryText="Ilha da Madeira"/>
                                    <MenuItem value={'Açores'} primaryText="Ilha dos Açores"/>
                                    <MenuItem value={'Leiria'} primaryText="Leiria"/>
                                    <MenuItem value={'Lisboa'} primaryText="Lisboa"/>
                                    <MenuItem value={'Portalegre'} primaryText="Portalegre"/>
                                    <MenuItem value={'Porto'} primaryText="Porto"/>
                                    <MenuItem value={'Santarém'} primaryText="Santarém"/>
                                    <MenuItem value={'Setúbal'} primaryText="Setúbal"/>
                                    <MenuItem value={'Viana do Castelo'} primaryText="Viana do Castelo"/>
                                    <MenuItem value={'Vila Real'} primaryText="Vila Real"/>
                                    <MenuItem value={'Viseu'} primaryText="Viseu"/>
                                </DropDownMenu>
                                </div>
                                </div>
                    <MasonryInfiniteScroller
   style={{width: '100%', maxWidth: '1200px', marginTop: '30%',marginBottom: '30%',margin: '0 auto'}}
>
                        {data}
                        </MasonryInfiniteScroller>


                    {(() => {
                        if (this.state.btnMore) {
                            return (
                                <Button
                                    style={{position:'relative', left:'48%'}}
                                    onClick={this.doQuery}
                                    size="lg"
                                    outline
                                    color="secondary">Ver Mais...</Button>)
                        }
                    })()}
                    {(() => {
                        if (this.state.requestSent !== 0) {
                            if (this.state.requestSent && this.state.requestSent === true) {
                                return (
                                    <div className="spinner">
                                        <div style={{backgroundColor: '#000000'}} className="cube1"></div>
                                        <div style={{backgroundColor: '#000000'}} className="cube2"></div>
                                    </div>
                                );
                            }
                        }
                    })()}

                </section>

            </div>

        );
    }
};

export default LocalNews;