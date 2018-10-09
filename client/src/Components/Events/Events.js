import React, {Component} from 'react';
import SocialShare from "../Categorias_Noticias/SocialShare";
import Comments from "../Categorias_Noticias/comments";
import 'moment/locale/pt';
import moment from 'moment';
import {Button} from 'reactstrap';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Map from "../Venues/map";
import Dialog from 'material-ui/Dialog';
import MasonryInfiniteScroller from 'react-masonry-infinite';


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestSent: false,
            load: false,
            btnMore: false,
            cityy: '',
            openModalMap: false,

        };
        this.querySearchResult = this.querySearchResult.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.doQuery = this.doQuery.bind(this);

    }

    componentWillMount() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat_Origem: position.coords.latitude,
                    lng_Origem: position.coords.longitude
                })
            })
        }
    }
    componentDidMount() {

        window.addEventListener('scroll', this.handleOnScroll);
        if (this.props.valueEvents && this.props.valueEvents.length > 36) {
            this.props.showFooter(true);
            window.removeEventListener('scroll', this.handleOnScroll);
            this.setState({requestSent: 0, btnMore: true});
            this.props.showSemiFooter(this.props.id);
        }
        if (this.props.valueEvents && this.props.valueEvents.length > 0)
            return;

        console.log(this.props.ComboEvents)
        //console.log(this.props.ComboEvents)
        console.log(this.props.cityEvents)
        if (this.props.ComboEvents.length) {
            this.setState({requestSent: true});

            fetch('/api/events_option?city=' + this.props.ComboEvents + '&id=' + 0 + '&count=' + 6)
                .then(res => res.json())
                .then(json => {
                    // console.log('entrou2')
                    if (json.success) {
                        this.props.setValueEvents(json.data);
                        console.log(json.data)
                        this.props.setComboEvents('');
                        this.props.showFooter(false);

                        this.props.setCityEvents(this.props.ComboEvents);

                        this.setState({requestSent: false});
                        //    var newData = (this.props.values || []).concat(json.data.slice(this.props.values.length, this.props.values.length + 2));
                        // this.props.set(newData.slice(0, this.props.values.length + 2));

                    }
                });
        }
        if (this.props.ComboEvents.length === 0) {
            this.setState({requestSent: true});

            fetch('/api/events?idUser=' + this.props.IDtoken + '&id=' + this.props.valueEvents.length + '&count=' + 6)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log(json)


                        // var newData = json.data.concat(this.props.valueEvents || []);
                        this.props.setValueEvents(json.data);
                        this.props.setCityEvents(json.city);
                        this.setState({requestSent: false});
                    }
                    if (json.fail) {
                        console.log('teste3')
                        window.removeEventListener('scroll', this.handleOnScroll);
                        this.setState({requestSent: false});

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
        fetch('/api/events_scroll?city=' + this.props.cityEvents + '&id=' + this.props.valueEvents.length + '&count=' + 6)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    if (json.data.length === 0) {
                        this.props.showFooter(true);
                        window.removeEventListener('scroll', this.handleOnScroll);
                        this.setState({requestSent: 0, btnMore: true});
                    }
                    // console.log(json.data);
                    var newData = (this.props.valueEvents || []).concat(json.data);
                    this.props.setValueEvents(newData);
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
        if(this.state.openModalMap){
            const DirectionsService = new window.google.maps.DirectionsService();


            DirectionsService.route({
                origin: new window.google.maps.LatLng(this.state.lat_Origem, this.state.lng_Origem),
                destination: new window.google.maps.LatLng(this.state.lat_Destino, this.state.lng_Destino),
                travelMode: window.google.maps.TravelMode.DRIVING,
            }, (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    console.log(status)
                    console.log(result)
                    this.setState({
                        directions: result,
                        loading: true,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            })
        }
        /* let gridArray = this.imagesArrayToGridArray(3);
         console.log(gridArray, 'gridArray');*/
        const data = this.props.valueEvents && this.props.valueEvents.map((val) =>

            (this.state.comment !== val.url) ? (
                <div key={val.url} className="col-xs-12 col-md-6 col-lg-4 CatNew">
                    <div className="masonry" style={{marginBottom:'2rem',paddingBottom:'10%'}}>

                        <div className="entry__text">
                            <div>

                            </div>
                            <div className="entry__header">

                                <h2 className="entry__title"><a href={val.url}>{val.title}</a></h2>

                                <a className="entry__thumb-link">
                                    {(val.photos["0"]["0"].medium) ? (
                                        <img style={{margin: '0 0 30px'}} alt=''
                                             src={val.photos["0"]["0"].medium.url}/>) : (
                                        <img style={{margin: '0 0 30px'}} alt='' src={val.photos["0"]["0"].url}/>
                                    )}
                                </a>


                            </div>
                            <div className="entry__excerpt">

                            </div>
                            <div className="entry__excerpt">
                                <h5>Horário:</h5>

                                <p>
                                    Abertura {moment.utc(val.start_time).format("dddd, MMM D, h:mm:ss a")}
                                </p>
                                {(val.stop_time) ? (
                                    <p>
                                        Até {moment.utc(val.stop_time).format("dddd, MMM D, h:mm:ss a")}
                                    </p>) : (null)}
                            </div>
                            <br/>

                            <div className="entry__excerpt">
                                <h5>Localização:</h5>

                                <p>
                                    {val.venue_name}
                                </p>
                                <p>
                                    {val.district}
                                </p>
                            </div>

                            <div className="entry__meta">
                                <span className="entry__meta-links">
                     <SocialShare title={val.title} link={val.url}/>
                                    <Button
                                        onClick={() => this.setState({comment: val.url})}
                                        outline
                                        color="secondary">Ver comentários</Button>{' '}
                                    <Button style={{marginLeft:"1.5%"}}onClick={() => this.setState({
                                        openModalMap: true,
                                        lat_Destino: val.lat,
                                        lng_Destino: val.lng
                                    })}
                                            outline
                                            color="secondary">Ver Mapa</Button>
                                    <br/>
                                    <a href={val.url}>Ver mais </a>


                </span>

                            </div>
                        </div>
                    </div>
                </div>
    ) : (

        <Comments IDtoken={this.props.IDtoken} setComment={(value) => this.setState({comment: value})}
                  IDnoticia={this.state.comment}/>
    )
    );


    return (

        <div>
            <section className="s-content">


                <div className="row narrow">
                    <div style={{margin:'0 auto'}} className="s-content__header">
                    <h1>Eventos</h1>
                    <h4>Escolha a cidade:</h4>
                        </div>
                        </div>
                        <div className="row narrow">
                        <div style={{margin:'0 auto'}} className="s-content__header">
                            <DropDownMenu
                                value={this.state.cityy}
                                onChange={(event, index, value) => {
                                    this.props.setComboEvents(value)
                                    this.props.setValueEvents('')
                                }}
                                labelStyle={{textColor: "gray", paddingLeft: 0, marginLeft: 0}}
                                underlineStyle={{margin: 0, borderColor: 'black'}}
                                autoWidth={true}
                                selectedMenuItemStyle={{color: 'blue'}}
                                animated={true}
                                menuStyle={{fontFamily: "metropolis-regular"}}
                            >
                                <MenuItem value={''} primaryText="Escolha a região"/>
                                <MenuItem value={'Aveiro'} primaryText="Aveiro"/>
                                <MenuItem value={'Beja'} primaryText="Beja"/>
                                <MenuItem value={'Braga'} primaryText="Braga"/>
                                <MenuItem value={'Bragança'} primaryText="Bragança"/>
                                <MenuItem value={'Castelo Branco'} primaryText="Castelo Branco"/>
                                <MenuItem value={'Coimbra'} primaryText="Coimbra"/>
                                <MenuItem value={'Évora'} primaryText="Évora"/>
                                <MenuItem value={'Faro'} primaryText="Faro"/>
                                <MenuItem value={'Guarda'} primaryText="Guarda"/>
                                <MenuItem value={'Ilha da Madeira'} primaryText="Ilha da Madeira"/>
                                <MenuItem value={'Ilha dos Açores'} primaryText="Ilha dos Açores"/>
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
                <Dialog
                    open={this.state.openModalMap}
                    onRequestClose={() => this.setState({openModalMap: false})}


                    contentStyle={{
                        height: '505px',
                        maxWidth: "1000px",
                        maxHeight: "628px !important",

                    }}

                    bodyStyle={{padding: '0px 0px 0px 0px'}}
                >
                    <center>
                        <div className='map'>
                            <Map
                                directions={this.state.directions}
                                latDestino={this.state.lat_Destino}
                                lngDestino={this.state.lng_Destino}
                                center={{lat: this.state.lat_Origem, lng: this.state.lng_Origem}}
                                containerElement={<div style={{width: '100%', height: '100%'}}/>}
                                mapElement={<div style={{width: '100%', height: '100%'}}/>}/></div>
                    </center>

                </Dialog>
                <MasonryInfiniteScroller
    hasMore={this.state.hasMore}
    style={{width: '94%', maxWidth: '1200px',marginTop: '20%', marginBottom: '20%',margin: '0 auto'}}
    loadMore={() => this.setState({ elements: this.state.elements.push("Element") })}
>                    {data}
                </MasonryInfiniteScroller>


                {(() => {
                    if (this.state.btnMore) {
                        return (
                            <Button
                                onClick={this.doQuery}
                                size="lg"
                                outline
                                color="secondary">teste</Button>)
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

    export default Events;