import React, {Component} from "react";
import ImageFilter from 'react-image-filter';
import moment from "moment/moment";
import 'moment/locale/pt';
import Footer from '../Footer/Footer';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            load: true,
            activeIndex: 0
        };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.data.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({activeIndex: nextIndex});
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.data.length - 1 : this.state.activeIndex - 1;
        this.setState({activeIndex: nextIndex});
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({activeIndex: newIndex});
    }

    componentWillUnmount() {
        this.setState({
            load: true,
        })
    }

    componentDidMount() {

        fetch('/mainNews')
            .then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log(json.data)
                    this.setState({
                        data: json.data,
                        load: false,
                    })
                }
                if(json.fail){
                    console.log('fail')

                }
            });
    }


    render() {

        //<li>{moment.utc(this.state.data[0].publishedAt).format("dddd, MMM D")}</li>
        //<li>{moment.utc(this.state.data[1].publishedAt).format("dddd, MMM D")}</li>
        //<li>{moment.utc(this.state.data[2].publishedAt).format("dddd, MMM D")}</li>
        const {activeIndex} = this.state;


        if (this.state.load) {
            return (<div className="spinner">
                <div style={{backgroundColor: '#F1F1F1'}} className="cube1"></div>
                <div style={{backgroundColor: '#F1F1F1'}} className="cube2"></div>
            </div>)
        }
        const slides = this.state.data.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.url}
                >
                    <ImageFilter
                        image={item.urlToImage}
                        filter={[
                            1.1, 0.1, 0, 0, -0.1,
                            0, 1.1, 0, 0, 0,
                            0.1, 0, 1, 0, 0,
                            2, 0.9, 0.9, 0.7, 0,
                        ]} // see docs beneath
                        colorOne={[20, 250, 250]}
                        colorTwo={[20, 150, 30]}
                        className="entry"
                        style={{width:'100%', height:'auto'}}
                    />
                    <div className="entry__content">
                                <span className="entry__category"><a style={{opacity: '0.8',backgroundColor: '#771919'}}
                                    href="#0">{item.source.name}</a></span>
                        <h1 className='textBox'><div className="boxTitle"><a
                            className="link" href={item.url}>{item.title}</a></div></h1>
                    
                    </div>
                </CarouselItem>
            );
        });
        return (<div className="pageheader-content row">
            <div className="col-full">
                <div className="featured">
                   
                            <Carousel
                                activeIndex={activeIndex}
                                next={this.next}
                                previous={this.previous}
                              
                            >
                             <CarouselIndicators items={this.state.data} activeIndex={activeIndex}
                                                    onClickHandler={this.goToIndex}/>
                                {slides}
                                <CarouselControl direction="prev" directionText="Previous"
                                                 onClickHandler={this.previous}/>
                                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next}/>
                            </Carousel>


                </div>
                {/* end featured */}
            </div>
            {/* end col-full */}
        </div>)
    }
}


export default Home;