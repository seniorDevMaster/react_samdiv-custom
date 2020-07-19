import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux'

import Articles from '../../data/articles';
import PageTitle from '../common/page.title';
import { JwModal } from '../dialog';
import Login from '../dialog/login'
import CommentForm from '../comment/comment-form'

import './blog.single.css';
import { blockParams } from 'handlebars';
import ChildComponent from './childlist';

function SinglePost(props) {
  // const user = useSelector(state=>state.blog)
  const socialAuth = useSelector(state=>state.auths)
  console.log('socialAuth-------------', socialAuth)

  const [ textContent, setTextContent ] = useState('');
  // const [ userCount, setUsercount ] = useState();
  const [ blogContent, setBlogContent ] = useState();
  const [ commentContent, setCommentContent ] = useState();
  const [ childflag, setChildComment ] = useState();

  const API_URL = process.env.NODE_ENV === 'production'
      ? 'https://samdivtech.com'
      : 'http://localhost:3111'

  useEffect(()=>{
    getBlogAndCommentDataFromServer()
  },[])
  
  const goBack = () => {
    props.history.goBack()
  }
  const getBlogAndCommentDataFromServer = () =>{
    fetch(`${API_URL}/getBlogAndComment`, {
      method: 'post',
      headers: {
          accept: 'application/json',
          'content-type': 'application/json'
      },
      body: JSON.stringify({ blogId: props.match.params.id })
    })
    .then(res =>
      res.json()
    )
    .then(data => {
      console.log('response data: -------------', data)
      setBlogContent(data.blogData)
      setCommentContent(data.commentData)
    })
    .catch(err => console.log(err))
  }
  const setCommentDataToServer = (comment) =>{
    fetch(`${API_URL}/saveComment`, {
      method: 'post',
      headers: {
          accept: 'application/json',
          'content-type': 'application/json'
      },
      body: JSON.stringify({ comment })
    })
    .catch(err => console.log(err))
  }
  const handleAddComment = (commentBody) => {
    var today = new Date().toLocaleDateString(undefined, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    const comment = {
      blodId: blogContent[0]._id,
      parentId: '',
      childId: socialAuth.profile.id,
      userName: socialAuth.profile.name,
      avatarUrl: socialAuth.profile.profilePicURL,
      email: socialAuth.profile.email,
      content: commentBody,
      commentDate: today
    };
    console.log('commentContent-------', commentContent, comment)
    setCommentDataToServer(comment)
    
    commentContent.push(comment);
    setCommentContent(commentContent)
  }
 
  const commentnow =    
    <div className="read" >
        <button className="Button primary big" onClick={JwModal.open('auth-modal')} >
            Comment Now
        </button>
    </div>
  const commentNode =
    <div className="jsx-355375240 CommentLevel top">
      <div className="jsx-3466901772 Comment">
        <div id="comment-610" className="jsx-3466901772 anchor"></div>
        <div className="jsx-3466901772">
          <a href="/profile/mohamedaymanhassenabas42" target="_blank" className="jsx-3466901772">
            <div className="jsx-3208234818 Avatar" style="background-image: url(&quot;https://res.cloudinary.com/dyd911kmh/image/fetch/t_avatar_thumbnail/https://assets.datacamp.com/users/avatars/002/367/391/square?1560494487&quot;); border-radius: 20px; min-width: 40px; min-height: 40px;"></div>
          </a>
        </div>
        <div className="jsx-3466901772 right">
          <div className="jsx-3466901772 top">
            <div className="jsx-3466901772">
              <a href="/profile/mohamedaymanhassenabas42" target="_blank" className="jsx-3466901772 username">Mohamed Ayman</a>
            </div>
            <div className="jsx-3466901772 more"></div>
          </div>
          <span className="date mobileOnly">10/04/2018 10:34 AM</span>
          <div className="jsx-3466901772 message">
            <p>
              <strong>The Yahoo API doesn't work?</strong>
            </p>
          </div>
          <div className="jsx-3466901772 bottom">
            <div className="jsx-3466901772 left">
              <div className="jsx-1972554161 Upvote comment">
                <div className="jsx-1972554161">
                  <div className="jsx-1972554161 voted">
                    <span className="jsx-1972554161 icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                        <path id="a" d="M9.769.435a1.255 1.255 0 0 1 1.81-.094 1.35 1.35 0 0 1 .09 1.865l-6.457 7.36a1.257 1.257 0 0 1-1.934-.04l-2.98-3.68a1.348 1.348 0 0 1 .162-1.86 1.255 1.255 0 0 1 1.805.168L4.3 6.667 9.77.435z"></path>
                      </svg>
                    </span>
                    <span className="jsx-1972554161 count">1</span>
                  </div>
                </div>
              </div>
              <span className="jsx-3466901772 divider desktopOnly"></span>
              <a href="#comment-610" className="jsx-3466901772">
                <span className="date desktopOnly">10/04/2018 10:34 AM</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="jsx-355375240 CommentLevel">
        <div className="jsx-3466901772 Comment">
          <div id="comment-622" className="jsx-3466901772 anchor"></div>
          <div className="jsx-3466901772">
            <a href="/profile/appservice" target="_blank" className="jsx-3466901772">
              <div className="jsx-3208234818 Avatar" style="background-image: url(&quot;https://res.cloudinary.com/dyd911kmh/image/fetch/t_avatar_thumbnail/https://cdn.datacamp.com/community/assets/placeholder_avatar-7f673b5d40e159404a56b5931250cc73.png&quot;); border-radius: 20px; min-width: 40px; min-height: 40px;"></div>
            </a>
          </div>
          <div className="jsx-3466901772 right">
            <div className="jsx-3466901772 top">
              <div className="jsx-3466901772">
                <a href="/profile/appservice" target="_blank" className="jsx-3466901772 username">Phil Smithens</a>
              </div>
              <div className="jsx-3466901772 more"></div>
            </div>
            <span className="date mobileOnly">11/04/2018 06:25 AM</span>
            <div className="jsx-3466901772 message">
              <p>yes, &nbsp;Yahoo disabled it . The fix is explained in the tutorial.</p>
            </div>
            <div className="jsx-3466901772 bottom">
              <div className="jsx-3466901772 left">
                <div className="jsx-1972554161 Upvote comment">
                  <div className="jsx-1972554161">
                    <div className="jsx-1972554161 voted">
                      <span className="jsx-1972554161 icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                          <path id="a" d="M9.769.435a1.255 1.255 0 0 1 1.81-.094 1.35 1.35 0 0 1 .09 1.865l-6.457 7.36a1.257 1.257 0 0 1-1.934-.04l-2.98-3.68a1.348 1.348 0 0 1 .162-1.86 1.255 1.255 0 0 1 1.805.168L4.3 6.667 9.77.435z"></path>
                        </svg>
                      </span>
                      <span className="jsx-1972554161 count">1</span>
                    </div>
                  </div>
                </div>
                <span className="jsx-3466901772 divider desktopOnly"></span>
                <a href="#comment-622" className="jsx-3466901772">
                  <span className="date desktopOnly">11/04/2018 06:25 AM</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="jsx-355375240 CommentLevel">
          <div className="jsx-3466901772 Comment">
            <div id="comment-2927" className="jsx-3466901772 anchor"></div>
            <div className="jsx-3466901772">
              <a href="/profile/mohamedegabass2" target="_blank" className="jsx-3466901772">
                <div className="jsx-3208234818 Avatar" style="background-image: url(&quot;https://res.cloudinary.com/dyd911kmh/image/fetch/t_avatar_thumbnail/https://assets.datacamp.com/users/avatars/003/002/951/square?1549238738&quot;); border-radius: 20px; min-width: 40px; min-height: 40px;"></div>
              </a>
            </div>
            <div className="jsx-3466901772 right">
              <div className="jsx-3466901772 top">
                <div className="jsx-3466901772">
                  <a href="/profile/mohamedegabass2" target="_blank" className="jsx-3466901772 username">Mohamed Abass</a>
                </div>
                <div className="jsx-3466901772 more"></div>
              </div>
              <span className="date mobileOnly">19/11/2018 02:15 PM</span>
              <div className="jsx-3466901772 message">
                <p>Hi&nbsp;</p>
                <p>I have CSV format , but i fail when imort it into python 2.7 , could you help me ?</p>
                <p>Thanks in advance</p>
              </div>
              <div className="jsx-3466901772 bottom">
                <div className="jsx-3466901772 left">
                  <div className="jsx-1972554161 Upvote comment">
                    <div className="jsx-1972554161">
                      <div className="jsx-1972554161 voted">
                        <span className="jsx-1972554161 icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                            <path id="a" d="M9.769.435a1.255 1.255 0 0 1 1.81-.094 1.35 1.35 0 0 1 .09 1.865l-6.457 7.36a1.257 1.257 0 0 1-1.934-.04l-2.98-3.68a1.348 1.348 0 0 1 .162-1.86 1.255 1.255 0 0 1 1.805.168L4.3 6.667 9.77.435z"></path>
                          </svg>
                        </span>
                        <span className="jsx-1972554161 count">1</span>
                      </div>
                    </div>
                  </div>
                  <span className="jsx-3466901772 divider desktopOnly"></span>
                  <a href="#comment-2927" className="jsx-3466901772">
                    <span className="date desktopOnly">19/11/2018 02:15 PM</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>

  return (
    <div className="main-content">
      <PageTitle title="Blog Details" bgimg="/images/bg/services.jpg"/>
      
      <section>
        <div className="container mt-30 mb-30 pt-30 pb-30">
          <div className="row">
            <div className="col-md-8 col-md-offset-2">
              <div className="filter">
                <button className="Button iconButton noPadding">
                  <div className="icon">
                    <svg id="Réteg_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7 12">
                      <path id="path-1_1_" d="M5.9 0c.4 0 .9.3 1 .7s.1.9-.2 1.2L2.7 6l4 4.1c.3.5.3 1.1-.1 1.6s-1.1.4-1.5.1l-4.8-5c-.4-.4-.4-1.2 0-1.6L5.1.3c.2-.2.5-.3.8-.3z"></path>
                    </svg>
                  </div>
                  <div className="desktopOnly" onClick={(e)=>goBack(e)}>Back to News</div>
                </button>
              </div>
              <div className="blog-posts single-post">   
                <article className="post clearfix mb-0">
                  <h2 id="basics"> { blogContent ? blogContent[0].commenttitle : null } </h2>
                  <p><img src={ blogContent ? blogContent[0].commentimage : null } /></p>
                  <p>{ blogContent ? blogContent[0].commentdescription : null }</p>
                  { socialAuth.auth ? commentnow : 
                    <div>
                      <div className="cell">
                        <h2>Join The Discussion</h2>
                        <div className="comment-box">
                          <CommentForm addComment={handleAddComment}/>
                        </div>
                      </div>
                      {commentNode}
                    </div>
                  }
                  {/* <div className="entry-header">
                    <h2>
                      <div dangerouslySetInnerHTML={{ __html: allContent ? allContent.blogData[0].commenttitle : null }}></div>
                    </h2>
                    <div className="post-thumb thumb"> 
                      <img alt='' className="img-responsive " style={{height:'auto', width:'auto !important'}} src={ allContent ? allContent.blogData[0].commentimage : null } />
                    </div>
                  </div>
                  <div className="entry-content">
                    <p>{ allContent ? allContent.blogData[0].commentdescription : null }</p>
                  </div> */}

                  {/* <button className="btn btn-success reply" onClick={()=>reply1(0)}>Reply1</button> */}
                  {/* {user.profile ? commentList() : 
                    <div>
                      {commentList()}
                      
                    </div> 
                  }  */}
                          
                </article>
              </div>
            </div>
          </div>
        </div>
      </section> 

      <JwModal id="auth-modal">
        <Login />
      </JwModal>
    </div>
  );
}

export default SinglePost;