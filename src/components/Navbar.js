import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Navbar extends React.Component {
    render(){
  
        return(
        <header className="nav-wrapper-top">
        <div className="container">
            <div className="col-md-4">
            <Link to="/" ><h1 className="brand-logo">All Items</h1></Link>
            </div>
            
            <div className="col-md-8 ">
            <div className="col-md-3 text-center">
                    <div id="message"></div>
            </div>
            <ul className="right text-right">
                    <li className="cart-link"><Link to="/cart"><i className="material-icons">Go to cart</i><span>{this.props.length}</span></Link></li>
            </ul>
            </div>
            <div className="clear"></div>
        </div>
    </header>)
    }

}


const mapStateToProps = (state)=>{
    return{
        length: state.length,
    }
}

export default connect(mapStateToProps)(Navbar)
