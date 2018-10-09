/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-unresolved, import/extensions, import/no-extraneous-dependencies */
import React, {Component} from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TumblrIcon,
    TumblrShareButton,
    TwitterIcon,
    TwitterShareButton,
} from 'react-share';


class SocialShare extends Component {

    render() {
        return (
            <div className="Demo__container">
                <br/>
                <div className="Demo__some-network">

                    <FacebookShareButton
                        url={this.props.link}
                        quote={this.props.title}
                        className="Demo__some-network__share-button"
                        onShareWindowClose={(err, additionalProps) => {
                            console.log(err, additionalProps)
                        }}>
                        <FacebookIcon
                            size={32}
                            round/>
                    </FacebookShareButton>
                </div>

                <div className="Demo__some-network">
                    <TwitterShareButton
                        url={this.props.link}
                        title={this.props.title}
                        className="Demo__some-network__share-button">
                        <TwitterIcon
                            size={32}
                            round/>
                    </TwitterShareButton>
                </div>

                <div className="Demo__some-network">
                    <LinkedinShareButton
                        url={this.props.link}
                        title={this.props.title}
                        windowWidth={750}
                        windowHeight={600}
                        className="Demo__some-network__share-button">
                        <LinkedinIcon
                            size={32}
                            round/>
                    </LinkedinShareButton>

                </div>

                <div className="Demo__some-network">
                    <TumblrShareButton
                        url={this.props.link}
                        title={this.props.title}
                        windowWidth={660}
                        windowHeight={460}
                        className="Demo__some-network__share-button">
                        <TumblrIcon
                            size={32}
                            round/>
                    </TumblrShareButton>
                    <br/>
                </div>
            </div>
        );
    }
}

export default SocialShare;