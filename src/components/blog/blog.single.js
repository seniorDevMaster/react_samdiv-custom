import React, {Component} from 'react';
import Articles from '../../data/articles';
import PageTitle from '../common/page.title';
/* import axios from 'axios';
import Config from '../../services/config';
 */
export default class SinglePost extends Component{

  /* constructor(props){
    super(props);
  }

  componentDidMount(){
  
  } */

  render() {
    let blogDetails = Articles.find((article)=>{return this.props.match.params.id == article.id});
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
                  <div className="entry-header">
                    <h2>{blogDetails.title}</h2>
                    <br/>
                    <div className="post-thumb thumb"> <img src={`/images/blog/${blogDetails.image}`} alt="" className="img-responsive img-fullwidth" />  </div>
                  </div>
                  <div className="entry-content">
                    <div className="entry-meta media no-bg no-border mt-15 pb-20">
                      {/* <div className="entry-date media-left text-center flip bg-theme-colored pt-5 pr-15 pb-5 pl-15">
                        <ul>
                          <li className="font-16 text-white font-weight-600">28</li>
                          <li className="font-12 text-white text-uppercase">Feb</li>
                        </ul>
                      </div> */}
                      <div className="media-body pl-15">
                        {/* <div className="event-content pull-left flip">
                          <h3 className="entry-title text-white text-uppercase pt-0 mt-0">{blogDetails.title}</h3>
                        </div> */}
                      </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: blogDetails.description}}></div>
                  </div>
                </article> : ''
              }
                </div>
            </div>
          </div>
        </div>
      </section> 
  
  
      </div>)
  
  }
      
    
    
    
}