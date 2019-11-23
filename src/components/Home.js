import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import img from '../images/item1.jpg'
class Home extends Component{
    
    handleClick = (id, name)=>{
        this.props.addToCart(id); 
        let message = document.getElementById("message");
        message.innerText="Item "+ name +" is added to cart";
        message.style.display ="block";
        setTimeout(function () {message.style.display='none'}, 1000);
    
    }
    calculate = (rate, dis)=>{return rate-(Number(rate)*Number(dis)/100);}
    showDiscount =(dis)=>{if(dis!==0){return  <div className="dis-panel">{dis}% off</div>;}}
    showPrice =(dis, price) =>{
        if(dis!==0){return <span className="cut-price" style={{margin:"0px 12px 0px 0px"}}>${price}</span>}
    }


    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-border">
                                {this.showDiscount(item.discount)}
                                <div className="card-image">
                                    <img src={img} alt={item.name}/>
                                </div>
                                <div className="card-content">
                                   <div className="col-md-6">
                                        <span className="card-title">{item.name}</span>
                                        <p>
                                        {this.showPrice(item.discount, item.price)}
                                        <span className="actual-price">${this.calculate(item.price,item.discount)}</span>
                                        </p>
                                   </div>
                                   <div className="col-md-6 text-right">
                                        <button to="/" className="add-bth-cart" onClick={()=>{this.handleClick(item.id, item.name)}}><i className="material-icons">Add to cart</i></button>
                                   </div>
                                   <div className="clear"></div>
                                </div>
                        </div>
                 </div>

            )
        })

        return(
            <div className="container">
                
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items,
      length: state.length,
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)