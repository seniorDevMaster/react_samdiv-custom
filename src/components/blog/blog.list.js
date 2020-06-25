import React, {Component} from 'react';
import Articles from '../../data/articles';
import PageTitle from '../common/page.title';
import {Link} from 'react-router-dom';
/* import axios from 'axios';
import Config from '../../services/config';
 */

export default class BlogList extends Component{

      /* constructor(props){
        super(props);
        this.state = {articles : []}
      }
      
      componentDidMount(){
        axios.get(`${Config.API_URL}${Config.API_ENDPOINTS.articles}/latest`)
        .then((response)=>{          
          console.log(response, "Response articles");
          this.setState({articles: response.data});
        })
      } */

      render(){
            let list = Articles.map((article)=>{
                return <article className="post clearfix mb-30 pb-30" key={article.id}>
                <div className="row">
                  <div className="col-sm-5">
                    <div className="entry-header">
                      <div className="post-thumb">
                      
                        <img
                          className="img-responsive img-fullwidth"
                          src={`images/blog/${article.image}`}
                          alt=""
                        />
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-7">
                    <div className="entry-content mt-0">
                      <Link to={`/post/${article.id}`}>
                        <h4 className="entry-title mt-0 pt-0">
                          {article.title}
                        </h4>
                      </Link>
                      <ul className="list-inline font-12 mb-20 mt-10">
                       {/*  <li>
                          posted by
                          {' '}
                          <a href="#" className="text-theme-colored">Admin |</a>
                        </li> */}
                        <li>
                          <span className="text-theme-colored">SEP 12,15</span>
                        </li>
                      </ul>
                      <p className="mb-30" dangerouslySetInnerHTML={{__html: article.description}}></p>
                      {/* <ul className="list-inline like-comment pull-left font-12">
                        <li><i className="pe-7s-comment" />36</li>
                        <li><i className="pe-7s-like2" />125</li>
                      </ul> */}
                      <Link className="pull-right text-gray font-13" to={`/post/${article.id}`}>
                        <i className="fa fa-angle-double-right text-theme-colored" />
                       
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
        
            })
            return (
                <div className="main-content">
                  <PageTitle title="Our Blog" bgimg="images/bg/services.jpg" />
            
                  <section>
                    <div className="container mt-30 mb-30 pt-30 pb-30">
                      <div className="row multi-row-clearfix">
                        <div className="blog-posts">
                          <div className="col-md-12">
                            <div className="list-dashed">
                                { list }                             
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>                  
                </div>
            )
        }
}
