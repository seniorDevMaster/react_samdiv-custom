import React from "react";

import Itemlist from './adminlist';
import Routeurl from './router';

class AdminPage extends React.Component{
   
    render() {
        return (
            <div style={{ display: 'flex' }}>
                <div>
                    <Itemlist />
                </div>
            
                <div style={{    
                    paddingTop: '50px',
                    paddingRight: '50px',
                    paddingLeft: '140px'
                }} >
                    <Routeurl />      

                </div>

            </div>
        )
    }
}
export default AdminPage;