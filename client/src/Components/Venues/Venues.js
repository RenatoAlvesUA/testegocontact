import React, {Component} from 'react';
import SocialShare from "../Categorias_Noticias/SocialShare";
import Comments from "../Categorias_Noticias/comments";
import Map from "./map";
import 'moment/locale/pt';
import {Button} from 'reactstrap';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Dialog from 'material-ui/Dialog';
import ReactStars from 'react-stars'
import Gallery from 'react-grid-gallery';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    DirectionsRenderer,
} from "react-google-maps";
import MasonryInfiniteScroller from 'react-masonry-infinite';

class Venues extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestSent: false,
            load: false,
            btnMore: false,
            city: 0,
            openModalImg: false,
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
        if (this.props.valueVenues && this.props.valueVenues.length > 24) {
            console.log('full')
            this.props.showFooter(true);
            window.removeEventListener('scroll', this.handleOnScroll);
            this.setState({requestSent: 0, btnMore: true});
            this.props.showSemiFooter(this.props.id);
        }

        if (this.props.valueVenues && this.props.valueVenues.length > 0)
            return;

        //console.log(this.props.ComboVenues)
        this.props.showFooter(false);
        console.log(this.props.cityVenues)
        console.log(this.props.catVenues)
        console.log(this.props.ComboCat)


        if (this.props.ComboCat.length && this.props.cityVenues.length) {
            this.setState({requestSent: true});
            console.log('combocat Yes', this.props.ComboCat, this.props.cityVenues)
            fetch('/api/venues_optionCat?cat=' + this.props.ComboCat + '&city=' + this.props.cityVenues + '&id=' + this.props.valueVenues.length + '&count=' + 10)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log(json.data);
                        // var newData = (this.props.value || []).concat(json.data);
                        //this.props.setCityVenues(this.props.cityVenues);

                        this.props.setValueVenues(json.data);
                        this.props.setComboCat('');
                        this.props.showFooter(false);
                        this.setState({requestSent: false});
                        //    var newData = (this.props.values || []).concat(json.data.slice(this.props.values.length, this.props.values.length + 2));
                        // this.props.set(newData.slice(0, this.props.values.length + 2));

                    }
                });
        }

        if (this.props.ComboVenues.length) {
            this.setState({requestSent: true});

            fetch('/api/venues_option?city=' + this.props.ComboVenues + '&id=' + this.props.valueVenues.length + '&count=' + 10)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log(json.data);
                        this.props.setCatVenues('')

                        // var newData = (this.props.value || []).concat(json.data);
                        this.props.setValueVenues(json.data);
                        this.props.setComboVenues('');
                        this.props.showFooter(false);

                        this.setState({requestSent: false});
                        //    var newData = (this.props.values || []).concat(json.data.slice(this.props.values.length, this.props.values.length + 2));
                        // this.props.set(newData.slice(0, this.props.values.length + 2));

                    }
                });
        }

        if (this.props.ComboVenues.length === 0 && this.props.catVenues.length === 0) {
            console.log(this.props.IDtoken)
            fetch('/api/venues?idUser=' + this.props.IDtoken + '&id=' + 0 + '&count=' + 10)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        // var newData = json.data.concat(this.props.value || []);
                        console.log(json)
                        this.props.setCatVenues('')

                        this.props.setValueVenues(json.data);
                        this.props.setCityVenues(json.city);
                        this.setState({requestSent: false});
                    }
                    if (json.fail) {
                        console.log('ss')
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
        console.log(this.props.catVenues, this.props.cityVenues, this.props.valueVenues.length)
        fetch('/api/venues_scroll?cat=' + this.props.catVenues + '&city=' + this.props.cityVenues + '&id=' + this.props.valueVenues.length + '&count=' + 6)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    if (json.data.length === 0) {
                        this.props.showFooter(true);
                        window.removeEventListener('scroll', this.handleOnScroll);
                        this.setState({requestSent: 0, btnMore: true});
                    }

                    /*   if (json.data.length === 0) {
                           this.props.showFooter(true);
                           this.props.setValuesFull('true');
                           window.removeEventListener('scroll', this.handleOnScroll);
                           this.setState({requestSent: 0, btnMore: true});
                       }*/
                    console.log(json.data);
                    var newData = (this.props.valueVenues || []).concat(json.data);
                    this.props.setValueVenues(newData);
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
        console.log(this.state.lat_Origem,'lat_Origem')
        console.log(this.state.lng_Origem,'lng_Origem')
        console.log(this.state.lat_Destino,'lat_Destino')
        console.log(this.state.lat_Destino,'lng_Destino')
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
        console.log(this.state.directions)
        let fotos2 = [];

        if (this.state.photos) {
            let linkFotos = []
            for (let i in this.state.photos) {
                for (let d in this.state.photos[i]) {
                    linkFotos.push('https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=' + this.state.photos[i][d].photo_reference + '&key=AIzaSyAUs2MiGfq1pxoHQj2kz7FNt444QBgu7-I');
                }
            }
            const fotos = linkFotos && linkFotos.map((val) =>

                [{
                    src: val,
                    thumbnail: val,
                    thumbnailWidth: 1200,
                }])
            for (let i in fotos) {
                fotos2.push(fotos[i]["0"])
            }
        }
        /* let gridArray = this.imagesArrayToGridArray(3);
         console.log(gridArray, 'gridArray');*/
        const data = this.props.valueVenues && this.props.valueVenues.map((val) =>

            (this.state.comment !== val.id) ? (
                <div key={val.id} style={{marginBottom: '50px'}} className="col-xs-12 col-md-6 col-lg-4 CatNew">
                    <div className="masonry">
                        {(val.photos[0][0]) ? (
                            <div style={{ height:'200px'}} className="entry__thumb ">
                                <a href={val.link} className="entry__thumb-link">
                                    <img src={'https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=' + val.photos[0][0].photo_reference + '&key=AIzaSyBy6EzGuGYCy38pVWsLaQcnVZm_b4LTP18'}
                                    />
                                </a>
                            </div>
                        ) : (null)}
                        <div className="entry__text">
                            <div className="entry__header">
                                <div className="entry__date">
                                    <a href="single-standard.html">{val.name_category}</a>
                                </div>
                                <h4 className="entry__title"><a href={val.link}>{val.name}</a></h4>
                                <a className="entry__thumb-link">
                                    <img style={{margin: '0 0 30px'}} src={val.thumbnailUrl}/>
                                </a>
                            </div>

                            <div className="entry__excerpt">
                                {(val.adress) ? (
                                    <h5>Morada:</h5>) : (null)}
                                <p>{val.adress}</p>
                                {(val.contact) ? (
                                    <h5>Contacto:</h5>
                                ) : (null)}
                                <p>{val.contact}</p>
                                {(val.rating) ? (
                                    <ReactStars count={5} value={val.rating} half={true} className="stars" edit={false}
                                                size={21}/>) : (null)}
                            </div>

                            <div className="entry__meta">
                                <span className="entry__meta-links">
                     <SocialShare title={val.name} link={val.link}/>
                                    <Button
                                        onClick={() => this.setState({comment: val.id})}
                                        outline
                                        color="secondary">Ver comentários</Button>
                                    {(val.photos[0][0]) ? (
                                        <Button style={{marginLeft:"1.5%"}} onClick={() => this.setState({
                                            openModalImg: true,
                                            photos: val.photos,
                                        })}
                                                outline
                                                color="secondary">Ver galeria</Button>) : (null)}
                                    <Button style={{marginLeft:"1.5%"}}onClick={() => this.setState({
                                        openModalMap: true,
                                        lat_Destino: val.geoLat,
                                        lng_Destino: val.geoLong
                                    })}
                                            outline
                                            color="secondary">Ver Mapa</Button>
                                    <br/>
                                        < a href={val.link}>Ver mais em {val.name} </a>
                                        </span>

                            </div>
                        </div>
                    </div>
                </div>) : (
                <Comments IDtoken={this.props.IDtoken} setComment={(value) => this.setState({comment: value})}
                          IDnoticia={this.state.comment}/>
            )
        );


        return (
            <div>
                <section className="s-content">


                    <div className="row narrow">
                    <div style={{margin:'0 auto'}} className="s-content__header">
                    <h1>Serviços</h1>
                    <h4>Escolha a cidade e a categoria:</h4>
                        </div>
                        </div>
                        <div className="row narrow">
                        <div style={{margin:'0 auto'}} className="s-content__header">
                                <DropDownMenu
                                    value={this.state.city}
                                    onChange={(event, index, value) => {
                                        this.props.setCityVenues(value);
                                        this.props.setComboVenues(value)
                                        this.props.setValueVenues('')

                                    }}
                                    labelStyle={{textColor: "gray", paddingLeft: 0, marginLeft: 0}}
                                    underlineStyle={{marginLeft: 0, borderColor: 'black'}}
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

                                <DropDownMenu
                                    value={this.state.city}
                                    onChange={(event, index, value) => {
                                        this.props.setCatVenues(value)
                                        this.props.setValueVenues('')
                                        this.props.setComboCat(value)
                                    }}
                                    labelStyle={{textColor: "gray", paddingLeft: 0, marginLeft: 1}}
                                    underlineStyle={{marginLeft: 0, borderColor: 'black'}}
                                    autoWidth={true}
                                    selectedMenuItemStyle={{color: 'blue'}}
                                    animated={true}
                                    menuStyle={{fontFamily: "metropolis-regular"}}
                                >

                                    <MenuItem value={0} primaryText="Escolha a categoria"/>
                                    <MenuItem value={'Aeroporto'} primaryText="Aeroporto"/>
                                    <MenuItem value={'Alojamento'} primaryText="Alojamento"/>
                                    <MenuItem value={'Bar'} primaryText="Bar"/>
                                    <MenuItem value={'Gastronomia Regional'} primaryText="Gastronomia Regional"/>
                                    <MenuItem value={'Bowling'} primaryText="Bowling"/>
                                    <MenuItem value={'Casino'} primaryText="Casino"/>
                                    <MenuItem value={'Campismo'} primaryText="Campismo"/>
                                    <MenuItem value={'Cinema'} primaryText="Cinema"/>
                                    <MenuItem value={'Dentista'} primaryText="Dentista"/>
                                    <MenuItem value={'Discoteca'} primaryText="Discoteca"/>
                                    <MenuItem value={'Entrega de Refeições'} primaryText="Entrega de Refeições"/>
                                    <MenuItem value={'Estádio'} primaryText="Estádio"/>
                                    <MenuItem value={'Estação de Comboios'} primaryText="Estação de Comboios"/>
                                    <MenuItem value={'Farmácia'} primaryText="Farmácia"/>
                                    <MenuItem value={'Galeria de Arte'} primaryText="Galeria de Arte"/>
                                    <MenuItem value={'Ginásio'} primaryText="Ginásio"/>
                                    <MenuItem value={'Jardim Zoológico'} primaryText="Jardim Zoológico"/>
                                    <MenuItem value={'Loja de Eletrônicos'} primaryText="Loja de Eletrônicos"/>
                                    <MenuItem value={'Padaria'} primaryText="Padaria"/>
                                    <MenuItem value={'Parque de Diversão'} primaryText="Parque de Diversão"/>
                                    <MenuItem value={'Refeições Take-away'} primaryText="Refeições Take-away"/>
                                    <MenuItem value={'Restaurante'} primaryText="Restaurante"/>
                                    <MenuItem value={'Salão de Beleza'} primaryText="Salão de Beleza"/>
                                    <MenuItem value={'Shooping'} primaryText="Shooping"/>
                                    <MenuItem value={'Spa'} primaryText="Spa"/>
                                    <MenuItem value={'Universidade'} primaryText="Universidade"/>
                                    <MenuItem value={'Veterinário'} primaryText="Veterinário"/>

                                </DropDownMenu>


                        </div>
                    </div>
                    <Dialog
                        open={this.state.openModalImg}
                        onRequestClose={() => this.setState({openModalImg: false})}
                        autoDetectWindowHeight={true}
                        repositionOnUpdate={false}
                        autoScrollBodyContent={true}
                        style={{
                            paddingTop: '5%',
                            overflow: 'auto',

                        }}
                        contentStyle={{
                width:'80%',
                overflow:'auto'
                        }}

                        bodyStyle={{padding: '0px 0px 0px 0px'}}
                    >
                        <Gallery showCloseButton={true} images={fotos2}/>

                    </Dialog>

                    <Dialog
                        open={this.state.openModalMap}
                        onRequestClose={() => this.setState({openModalMap: false})}


                        contentStyle={{

                            height: "505px",
                            maxWidth: "1000px",
                            maxHeight: "428px !important",

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
    
    style={{width: '100%', maxWidth: '1200px', marginTop: '40%',marginBottom: '40%',margin: '0 auto'}}
    
>
                        {data}
                   </MasonryInfiniteScroller>


                    {(() => {
                        //    <YoutubeEmbedVideo style={{padding: '0px 0px 0px 0px'}} autoplay={true} size='largest'
                        //                                            controls={true} videoId={this.state.modalID} suggestions={false}/>
                        if (this.state.btnMore) {
                            return (
                                <Button
                                    style={{position: 'relative', left: '48%'}}
                                    onClick={this.doQuery}
                                    size="lg"
                                    outline
                                    color="secondary">Ver Mais...</Button>)
                        }
                    })()}
                    {(() => {
                        if (this.state.requestSent != 0) {
                            if (this.state.requestSent && this.state.requestSent == true) {
                                return (
                                    <div className="spinner">
                                        <div style={{backgroundColor: '#000000'}}
                                             className="cube1"></div>
                                        <div style={{backgroundColor: '#000000'}}
                                             className="cube2"></div>
                                    </div>
                                );
                            } else {
                                return (

                                    <div className="spinner">
                                        <div style={{backgroundColor: '#000000'}}
                                             className="cube1"></div>
                                        <div style={{backgroundColor: '#000000'}}
                                             className="cube2"></div>
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

export default Venues;