import React, {Component} from 'react';
import SocialShare from "./SocialShare";
import Comments from "./comments";
import 'moment/locale/pt';
import moment from 'moment';
import {Button} from 'reactstrap';
import MasonryInfiniteScroller from 'react-masonry-infinite';
import Swipe from 'react-easy-swipe';

class CategoryNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            requestSent: false,
            load: false,
            btnMore: false,
        };
        this.querySearchResult = this.querySearchResult.bind(this);
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.doQuery = this.doQuery.bind(this);

    }


    componentDidMount() {
        
        //window.addEventListener('touchtap', this.handleOnScroll);
        window.addEventListener('scroll', this.handleOnScroll);
        

        
        if (this.props.values && this.props.values.length > 110) {
            this.props.showFooter(true);
            window.removeEventListener('scroll', this.handleOnScroll);
            this.setState({requestSent: 0, btnMore: true});
            this.props.showSemiFooter(this.props.id);
        }
        if (this.props.values && this.props.values.length > 0)
            return;

        this.props.showFooter(false);
        //  console.log(this.props.id) //undefiened
        fetch('/api/CategoryNews?idNews=' + this.props.id + '&id=' + this.props.values.length + '&count=' + 50)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log(json.data)
                    var newData = json.data.concat(this.props.values || []);
                    this.props.setValues(newData);
                    this.setState({requestSent: false});


                }
            });
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
        /*var data = this.createFakeData(this.state.data.length, 10,false);

        this.setState({data: data});*/
    }


    querySearchResult() {
        if (this.state.requestSent) {
            return;
        }

        // enumerate a slow query

        setTimeout(this.doQuery, 10);


    }

    onSwipeStart(event) {
        //console.log('Start swiping...', event);
      }
     
      onSwipeMove(position, event) {
        //console.log(`Moved ${position.x} pixels horizontally`, event);
        //console.log(`Moved ${position.y} pixels vertically`, event);
      }
     
      onSwipeEnd(event) {
console.log(event)
    }
     
   
    doQuery() {

        this.setState({requestSent: true});
        fetch('/api/CategoryNews?idNews=' + this.props.id + '&id=' + this.props.values.length + '&count=' + 20)
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log(json.data);
                    var newData = (this.props.values || []).concat(json.data);
                    this.props.setValues(newData);
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
        console.log('NOscrollBottom')

        if (scrolledToBottom) {
console.log('scrollBottom')
            this.querySearchResult();
        }
    }

    render() {

        /* let gridArray = this.imagesArrayToGridArray(3);
         console.log(gridArray, 'gridArray');*/
        const data = this.props.values && this.props.values.map((val) =>

            (this.state.comment !== val.url) ? (
                <div key={val.url} style={{marginBottom: '10px'}} className="col-xs-12 col-md-6 col-lg-4 CatNew">
                    <div className="masonry">
                        {(val.urlToImage) ? (
                        <div style={{height:'190px'}} className="entry__thumb ">
                            <a href={val.url} className="entry__thumb-link">
                                <img src={val.urlToImage}
                                />
                            </a>
                        </div>
                        ) : (null)}
                        <div className="entry__text">
                            <div className="entry__header">
                                <div className="entry__date">
                                    <a href="single-standard.html">{moment.utc(val.publishedAt).format("dddd, MMM D, h:mm:ss a")}</a>

                                </div>

                                <h4 className="entry__title"><a href={val.url}>{val.title}</a></h4>
                            </div>
                            <div className="entry__excerpt">
                                <p>
                                    {val.description}
                                </p>
                            </div>
                            <div className="entry__meta">
                                <span className="entry__meta-links">
                     <SocialShare title={val.title} link={val.urlToImage}/>
                                    <Button
                                        onClick={() => this.setState({comment: val.url})}
                                        outline
                                        color="secondary">Ver comentários</Button>{' '}
                                    
                                  <br />

                                    <a href={val.url}>Ver mais em {val.idName} </a>


                </span>

                            </div>
                        </div>
                    </div>
                </div>) : (
                                    <div key={val.url} style={{marginBottom: '10px'}} className="col-xs-12 col-md-6 col-lg-4 CatNew">


                <Comments IDtoken={this.props.IDtoken} setComment={(value) => this.setState({comment: value})}
                          IDnoticia={this.state.comment}/>
                          </div>
            )
        );


        return (
            <div>
                <Swipe
         onSwipeStart={this.onSwipeStart}
        onSwipeMove={this.onSwipeMove}
        onSwipeEnd={this.onSwipeEnd}>
                <section className="s-content">
                    <div className="row narrow">
                        <div style={{margin:'0 auto'}} className="s-content__header">
                            <h1> {this.props.id}</h1>
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
                                <Button style={{position:'relative', marginTop:'20%', left:'48%'}}
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
                                        <div style={{backgroundColor: '#000000'}} className="cube1"></div>
                                        <div style={{backgroundColor: '#000000'}} className="cube2"></div>
                                    </div>
                                );
                            } else {
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
                </Swipe>
            </div>

        );
    }
};

export default CategoryNews;