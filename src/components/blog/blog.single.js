import React, {Component} from 'react';
import Articles from '../../data/articles';
import PageTitle from '../common/page.title';
import Dialog from '../dialog';
// import AuthDialog from '../dialog/authdlg';
import { JwModal } from '../dialog/authdlg';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import {PostData} from '../services/PostData';

export default class SinglePost extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loginError: false,
      redirect: false
    };
    this.signup = this
      .signup
      .bind(this);
  }

  goBack() {
    console.log('goback:', this.props)
    this.props.history.goBack()
  }
  
  signup(res, type) {
    let postData;
    if (type === 'facebook' && res.email) {
      postData = {
        name: res.name,
        provider: type,
        email: res.email,
        provider_id: res.id,
        token: res.accessToken,
        provider_pic: res.picture.data.url
      };
    }

    if (type === 'google' && res.w3.U3) {
      postData = {
        name: res.w3.ig,
        provider: type,
        email: res.w3.U3,
        provider_id: res.El,
        token: res.Zi.access_token,
        provider_pic: res.w3.Paa
      };
    }

    if (postData) {
      PostData('signup', postData).then((result) => {
        let responseJson = result;
        sessionStorage.setItem("userData", JSON.stringify(responseJson));
        this.setState({redirect: true});
      });
    } else {}
  }

  render () {
    const blogDetails = Articles.find((article)=>{
      return this.props.match.params.id == article.id
    });
    const responseFacebook = (response) => {
      console.log("facebook console");
      console.log(response);
      this.signup(response, 'facebook');
    }

    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
      this.signup(response, 'google');
    }
    return (
      <div className="main-content">
        <PageTitle title="Blog Details" bgimg="/images/bg/services.jpg"/>
        <section>
          <div className="container mt-30 mb-30 pt-30 pb-30">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                <div className="blog-posts single-post">
                {
                  blogDetails ?          
                  <article className="post clearfix mb-0">
                    <div className="filter">
                      <button className="Button iconButton noPadding">
                        <div className="icon">
                          <svg id="Réteg_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 12">
                            <path id="path-1_1_" d="M5.9 0c.4 0 .9.3 1 .7s.1.9-.2 1.2L2.7 6l4 4.1c.3.5.3 1.1-.1 1.6s-1.1.4-1.5.1l-4.8-5c-.4-.4-.4-1.2 0-1.6L5.1.3c.2-.2.5-.3.8-.3z"></path>
                          </svg>
                        </div>
                        <div className="desktopOnly" onClick={this.goBack}>Back to News</div>
                      </button>
                    </div>
                    <div className="entry-header">
                      <h2>{blogDetails.title}</h2>
                      <br/>
                      <div className="post-thumb thumb"> <img src={`/images/blog/${blogDetails.image}`} alt="" className="img-responsive img-fullwidth" />  </div>
                    </div>
                    <div className="entry-content">
                      <div className="entry-meta media no-bg no-border mt-15 pb-20">
                        <div className="media-body pl-15">
                        </div>
                      </div>
                      <div dangerouslySetInnerHTML={{__html: blogDetails.description}}></div>
                    </div>
                    <div className="read">
                      <button className="Button primary big" onClick={JwModal.open('auth-modal')} >
                        Comment Now
                      </button>
                    </div>
                  </article> : ''
                }
                </div>
              </div>
            </div>
          </div>
        </section> 

        <JwModal id="auth-modal">
          {/* <div class="modalContent noBackground"> */}
            <div className="close" onClick={JwModal.close('auth-modal')}>
              <svg height="9" fill="#686F75" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 11">
                <path d="M10 11a1 1 0 0 1-.73-.3L.3 1.76A1 1 0 0 1 1.76.3l8.94 8.94A1 1 0 0 1 10 11z"></path>
                <path d="M1 11a1 1 0 0 1-.7-1.76L9.24.3a1 1 0 0 1 1.46 1.46L1.76 10.7A1 1 0 0 1 1 11z"></path>
              </svg>
            </div>
            <div className="AuthModal">
              <h1 >Login account to share an article</h1>
              <div className="buttons">
                <a href="/users/auth/facebook?redirect=https://www.datacamp.com/community" >
                  <button className="Button facebook extra noPadding">
                    <div className="icon">
                      <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 90 90">
                        <path id="Facebook__x28_alt_x29_" d="M90 15.001C90 7.119 82.884 0 75 0H15C7.116 0 0 7.119 0 15.001v59.998C0 82.881 7.116 90 15.001 90H45V56H34V41h11v-5.844C45 25.077 52.568 16 61.875 16H74v15H61.875C60.548 31 59 32.611 59 35.024V41h15v15H59v34h16c7.884 0 15-7.119 15-15.001V15.001z"></path>
                      </svg>
                    </div>
                    <div className="desktopOnly">Facebook</div>
                  </button>
                </a>
                <a href="/users/auth/google_oauth2?redirect=https://www.datacamp.com/community" >
                  <button className="Button google extra noPadding">
                    <div className="icon">
                      <svg id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 455.73 455.73">
                        <path d="M0 0v455.73h455.73V0H0zm265.67 247.037c-7.793 51.194-45.961 80.543-95.376 80.543-55.531 0-100.552-45.021-100.552-100.552 0-55.517 45.021-100.538 100.552-100.538 26.862 0 50.399 9.586 67.531 26.226l-28.857 28.857c-9.773-9.846-23.147-15.094-38.674-15.094-32.688 0-59.189 27.874-59.189 60.548 0 32.703 26.501 59.768 59.189 59.768 27.397 0 48.144-13.243 54.129-39.758h-54.129v-40.38h95.131c1.142 6.506 1.72 13.315 1.72 20.37-.001 6.998-.507 13.663-1.475 20.01zm120.749-12.52h-35.233v35.218H326.16v-35.218h-35.233v-25.041h35.233v-35.233h25.026v35.233h35.233v25.041z"></path>
                      </svg>
                    </div>
                    <div className="desktopOnly">Google +</div>
                  </button>
                </a>
              </div>
            </div>
          {/* </div> */}
            {/* <button onClick={JwModal.close('auth-modal')}>Close</button> */}
        </JwModal>
      </div>
    );
  }
}
