import React, {Component} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import {Button} from 'reactstrap';
import "../../css/comments.css"
import {Scrollbars} from 'react-custom-scrollbars';
import 'moment/locale/pt';
import moment from 'moment';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentTxt: '',
            commentBox: false,
            data: [],
            users: [],
            load: false,
        };
        this.SendComment = this.SendComment.bind(this);
    }

    /*

<div style={{overflow: 'auto', maxHeight: 400}}>
                                       <ReactList
                                           itemRenderer={::this.renderItem}
                                           length={this.state.accounts.length}
                                           type='uniform'
                                       />
                                   </div>
    }*/
    Signin() {
        console.log('teste')
    }

    componentDidMount() {
        console.log('didmount')

        this.setState({
            load: true,
        })
        fetch('/comments?idNoticia=' + this.props.IDnoticia)
            .then(res => res.json())
            .then(json => {
                if (json.success) {

                    console.log(json.data)
                    this.setState({
                        data: json.data,
                        load: false,
                    })
                }
                this.setState({
                    load: false,
                })
            });
    }

    componentWillReceiveProps(props) {
        console.log(props)

    }

    SendComment(event) {
        //Grab state
        this.setState({
            load: true,
        })
        event.preventDefault();
        const {
            commentTxt,
        } = this.state;
        console.log(this.state.commentTxt, this.props.IDtoken, this.props.IDnoticia, 'sss')
        // POST request backend
        fetch('/comments_news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentText: this.state.commentTxt,
                idUser: this.props.IDtoken,
                idNoticia: this.props.IDnoticia,
            }),
        }).then(res => res.json())
            .then(json => {
                if (json.success) {
                    console.log(json.data)
                    /* let C = [];
                     for(let i in json.data){
                         for(let i in json.users){
                             console.log(json.data[i],'data[',i,']')
                             console.log(json.users[i],'users[',i,']')
                             C = json.data[i].concat(json.users[i].name);

                         }
                     }
 console.log(C)*/
                    this.props.setComment(this.props.IDnoticia)
                    this.setState({
                        data: json.data,
                        load: false
                    })
                } else {
                    this.setState({
                        signUpError: json.message,
                    })
                }
            })

    }

    render() {

        try {
            console.log(this.state.data)

        } catch (err) {
            console.log(err)
        }


        const data = this.state.data && this.state.data.map((data) =>

            <div className="comment-wrap">
                {(data.photo) ? (

                    <div className="photo">
                        <img className="mr-3" style={{
                            position: 'relative',
                            left: '0%',
                            top: '80%',
                            width: '80%',
                            borderRadius: '50%',
                            borderColor: 'white'
                        }} src={data.photo} alt="Generic placeholder image"/>
                    </div>

                ) : (null)}
                {(data.name) ? (
                <div className="comment-block">
                    <h5 className="comment-text">{data.name}</h5>
                    <p className="comment-text">{data._doc.description}</p>
                    <div className="bottom-comment">
                        <div
                            className="comment-date">{moment(data._doc.timestamp).format("dddd, MMM D, h:mm:ss a")}</div>

                    </div>
                </div>) : (
                    <div className="comment-wrap">

                    <div className="comment-block">
                        <h5 className="comment-text">{data.name}</h5>
                        <p className="comment-text">{data._doc.description}</p>
                        <div className="bottom-comment">
                            <div
                                className="comment-date">{moment(data._doc.timestamp).format("dddd, MMM D, h:mm:ss a")}</div>

                        </div>
                    </div>
                    </div>
                            )}
            </div>
        );
        if (this.state.load) {
            return (<div className="spinner">
                <div style={{backgroundColor: '#000000'}} className="cube1"></div>
                <div style={{backgroundColor: '#000000'}} className="cube2"></div>
            </div>)
        }
        return (
                <div className="masonry">
                    <div style={{height: '650px'}} className="entry__text">
                        <a onClick={() => this.props.setComment('')} className="close"/>


                        <h2 className="entry__titlecomments">Comentários</h2>

                        {(this.state.commentBox) ? (
                            <ValidatorForm
                                ref="forms"
                                onSubmit={this.SendComment}
                                onError={errors => console.log(errors)}
                            >
                                <TextValidator
                                    name='message'
                                    floatingLabelText='Mensagem'
                                    multiLine
                                    rows={2}
                                    value={this.state.commentTxt}
                                    onChange={(e) => this.setState({commentTxt: e.target.value})}
                                    floatingLabelFocusStyle={{color: 'black'}}
                                    underlineFocusStyle={{borderColor: 'black'}}
                                    style={{}}
                                    fullWidth
                                />
                                <br/>
                                <br/>

                                <Button style={{marginBottom: '7%'}} size="lg" type="submit" color="secondary">Enviar
                                    Comentário</Button>{' '}

                            </ValidatorForm>

                        ) : (
                            (this.props.IDtoken) ? (

                                <Button style={{marginTop: '20px'}} size='lg'
                                        onClick={() => this.setState({commentBox: true})} type="submit"
                                        color="secondary">Introduza
                                    comentário</Button>

                            ) : (<div><br/><p>Inicie sessão ou registe-se para efectuar o comentário.</p></div>)
                        )
                        }

                        <Scrollbars style={{
                            position: 'absolute',
                            left: '10%',
                            width: '80%',
                            overflow: 'hidden',
                            height: '40%'
                        }}>
                            {data}
                        </Scrollbars>

                    </div>
                </div>
        );


    }
}

export default Comments;
/*
<ul className="comment-actions">
                                        <li className="complain">Complain</li>
                                        <li className="reply">Reply</li>
                                    </ul>
 */