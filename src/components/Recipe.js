import React, { Component } from 'react'
import { connect } from 'react-redux'

//import { addShipping } from './actions/cartActions'
class Recipe extends Component{
    
   sumPrice =(t,d) =>{
       return t - d;

   }

  

    render(){
  
        return(
            <div className="container col-md-4">
                <div className="collection">
                    <p>Total</p>


                            <table className="rece-tbl">
                                <tbody>
                                <tr>
                                    <td>Item ({this.props.length})</td><td>:</td><td>${this.props.total}</td>
                                </tr>
                                <tr>
                                    <td>Discount</td><td>:</td><td>{this.props.newdiscount}$</td>
                                </tr>
                                <tr><td>Type Discount</td><td>:</td><td>-$0</td></tr>
                                <tr style={{backgroundColor:"whitesmoke", padding:"4px 0px"}}>
                                    <td>Order Total</td><td>:</td><td>${Number(this.props.total) + Number(this.props.newdiscount)  }</td>
                                </tr>
                                </tbody>
                            </table>           
                                     
                    </div>
                  
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total,
        length: state.length,
        newdiscount : state.newdiscount
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Recipe)
