import React from "react";

import Itemlist from './adminlist';
import Routeurl from './router';

class AdminPage extends React.Component{
    constructor(props) {
        super(props)
        this.state = { isOwner: false }
    }
    handleConfirm = (e) => {
        var ownerSec = document.getElementById('ownerInput').value
        if (ownerSec === 'samdivtech') {
            this.setState({ isOwner: true })
        }
    }
    render() {
        return (
            <div>
                {this.state.isOwner ? 
                <div style={{ display: 'flex'}}>
                    <div style={{ backgroundColor: '#001529', paddingTop: '60px' }}>
                        <Itemlist />
                    </div>
                
                    <div style={{ width: '100%'}} >
                        <Routeurl />      
                    </div>
                </div>
                : 
                <div className='ownerConfirmContainer'> 
                    <div className='ownerConfirmDiv'>
                        <h3>Sign to Admin!</h3>

                        <input type='password' id='ownerInput' />
                        <button className='btn btn-primary' onClick={this.handleConfirm} >Confrim</button>
                    </div>
                </div>
                }
            </div>
        )
    }
}
export default AdminPage;