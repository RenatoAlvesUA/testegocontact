import React, {Component} from 'react';
import SocialShare from "../Categorias_Noticias/SocialShare";
import Comments from "../Categorias_Noticias/comments";
import 'moment/locale/pt';
import moment from 'moment';
import {Button} from 'reactstrap';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Dialog from 'material-ui/Dialog';
import YoutubeEmbedVideo from "youtube-embed-video";
import MasonryInfiniteScroller from 'react-masonry-infinite';
import ModalVideo from 'react-modal-video'
import YoutubeModal from "react-youtube-modal"

class Videos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requestSent: false,
            load: false,
            btnMore: false,
            city: 0,
            openModal: false,

        };
        this.querySearchResult = this.querySearchResult.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.doQuery = this.doQuery.bind(this);

    }


    componentDidMount() {

        window.addEventListener('scroll', this.handleOnScroll);
        if (this.props.valueVideos && this.props.valueVideos.length > 53) {
            this.props.showFooter(true);
            window.removeEventListener('scroll', this.handleOnScroll);
            this.setState({requestSent: 0, btnMore: true});
            this.props.showSemiFooter(this.props.cityVideos);
        }

        if (this.props.valueVideos && this.props.valueVideos.length > 0)
            return;

        console.log(this.props.ComboVideos)
        this.props.showFooter(false);

        if (this.props.ComboVideos.length) {
            this.setState({requestSent: true});
            console.log('option')
            fetch('/api/videos_option?city=' + this.props.ComboVideos + '&id=' + this.props.valueVideos.length + '&count=' + 35)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        console.log(json.data);
                        // var newData = (this.props.value || []).concat(json.data);
                        this.props.setValueVideos(json.data);
                        this.props.setComboVideos('');
                        this.props.showFooter(false);

                        this.props.setCityVideos(this.props.ComboVideos);
                        this.setState({requestSent: false});
                        //    var newData = (this.props.values || []).concat(json.data.slice(this.props.values.length, this.props.values.length + 2));
                        // this.props.set(newData.slice(0, this.props.values.length + 2));

                    }
                });
        }
        if (this.props.ComboVideos.length === 0) {

            console.log(this.props.IDtoken,)
            fetch('/api/videos?idUser=' + this.props.IDtoken + '&id=' + 0 + '&count=' + 35)
                .then(res => res.json())
                .then(json => {
                    if (json.success) {
                        // var newData = json.data.concat(this.props.value || []);

                        console.log(json)
                        this.props.setValueVideos(json.data);
                        this.props.setCityVideos(json.city);
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
        fetch('/api/videos_scroll?city=' + this.props.cityVideos + '&id=' + this.props.valueVideos.length + '&count=' + 6)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    if (json.data.length === 0) {
                        this.props.showFooter(true);
                        window.removeEventListener('scroll', this.handleOnScroll);
                        this.setState({requestSent: 0, btnMore: true});
                    }
                    console.log(json.data);
                    var newData = (this.props.valueVideos || []).concat(json.data);
                    this.props.setValueVideos(newData);
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
        const {openModal} = this.state;

        /* let gridArray = this.imagesArrayToGridArray(3);
         console.log(gridArray, 'gridArray');*/
        const data = this.props.valueVideos && this.props.valueVideos.map((val) =>

            (this.state.comment !== val.videoId) ? (
                <div key={val.link} style={{marginBottom: '10px'}} className="col-xs-12 col-md-6 col-lg-4 CatNew">
                <div className='masonry'> <YoutubeModal width="80%" height="800px"  videoId={val.videoId} >
                <div style={{height:'190px'}} className="entry__thumb ">
   
   <a className="entry__thumb-link">
       <img style={{
           display: 'block',
           marginLeft: 'auto',
           marginRight: 'auto',
           width: '100%'
       }} src={val.img}
       />
   </a>
</div>
 </YoutubeModal>
    
  
                        <div className="entry__text">
                            <div className="entry__header">
                                <div className="entry__date">
                                    <a href={"https://www.youtube.com/channel/"+val.channelId}>{val.channelTitle}</a>

                                </div>
                                <h4 className="entry__title"><a onClick={() => this.setState({
                                    openModal: true,
                                    modalID: val.videoId
                                })}>{val.title}</a></h4>

                            </div>
                            <br/>
                            <div className="entry__excerpt">
                                <p>{val.description}</p>
                            </div>

                            <div className="entry__meta">
                                <span className="entry__meta-links">
                                    <SocialShare title={val.title} link={val.link}/>
                                    <Button
                                        onClick={() => this.setState({comment: val.videoId})}
                                        outline
                                        color="secondary">Ver comentários</Button>{' '}
                </span>

                            </div>
                            <div className="entry__date">
                                <a>Publicado
                                    em {moment(val.publishedAt).format(" MMM D, YYYY")}</a>
                            </div>
                        </div>
               
                </div></div>) : (
                <Comments IDtoken={this.props.IDtoken} setComment={(value) => this.setState({comment: value})}
                          IDnoticia={this.state.comment}/>
            )
        );


        return (
            <div>
                <section className="s-content">


                     <div className="row narrow">
                    <div style={{margin:'0 auto'}} className="s-content__header">
                    <h1>Videos</h1>
                    <h4>Escolha a cidade:</h4>
                        </div>
                        </div>
                        <div className="row narrow">
                        <div style={{margin:'0 auto'}} className="s-content__header">

                                <DropDownMenu
                                    value={this.state.city}
                                    onChange={(event, index, value) => {
                                        this.props.setComboVideos(value)
                                        this.props.setValueVideos('')
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
                   
    {/*<Dialog
        open={openModal}
        onRequestClose={() => this.setState({openModal: false})}
        autoDetectWindowHeight={true}
        autoScrollBodyContent={false}
        fullScreen={true}
        fullWidth={true}
        //repositionOnUpdate={false}
        contentStyle={{
            width:'100%',
            maxWidth:'none'
        }}

        bodyStyle={{width:'100%', maxWidth:'none',padding: '0px 0px 0px 0px'}}
    >
        <div className='video'>
        <YoutubeEmbedVideo style={{padding: '0px 0px 0px 0px'}} autoplay={true} size='large'
                            videoId={this.state.modalID} suggestions={false} frameborder="0" />
        </div>
    </Dialog>*/}
                      <MasonryInfiniteScroller
    
    style={{height:'100%',width: '100%', maxWidth: '1200px', marginTop: '50px',marginBottom: '50px',margin: '0 auto'}}
    
>
                        {data}

                   </MasonryInfiniteScroller>

                    {(() => {
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

export default Videos;