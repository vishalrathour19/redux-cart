import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './actions/cartActions'
import Recipe from './Recipe'
import TblHeader from './TblHeader'
import img from '../images/item1.jpg'
class Cart extends Component{

    //to remove the item completely
    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    //to add the quantity
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    //to substruct from the quantity
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }

   
    render(){
        
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                       <React.Fragment key={item.id}>
                           <div className="tbl-res col-md-8">
                           <table>
                               <tbody>
                        <tr className="collection-item avatar" key={item.id}>
                                    <td>
                                            <div className="item-img border"> 
                                                <img src={img} alt={item.img} className="fl"/>
                                                <span className="title fl">{item.name}</span>
                                                <div className="clear"></div>
                                                <button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(item.id)}}>&times;</button>
                                            </div>
                                    </td>
                                    <td>
                                        <div className="add-remove">
                                            <Link to="/cart"><i className="fa fa-minus fl w-6" onClick={()=>{this.handleSubtractQuantity(item.id)}}></i></Link>
                                            <div className="cur-item-count border fl w-6">{item.quantity}</div>
                                            <Link to="/cart"><i className="fa fa-plus fl w-6" onClick={()=>{this.handleAddQuantity(item.id)}}></i></Link>
                                            
                                            <div className="clear"></div>
                                        </div>
                                    </td>
                                    <td>
                                            <div>${item.price}    </div>
                                    </td>
                                    
                                    
                                </tr>
                                </tbody>
                           </table>
                           </div>
                                </React.Fragment>
                    )
                })
            ):

             (
               <div className="col-md-8"> <p>Card is empty...</p></div>
             )
       return(
            <div className="container">
                <h1 className="order-heading"><a href="/"><i className="fa fa-angle-left"></i></a>Order Summary</h1>

                <TblHeader />
                <div className="clear"></div>
                <div className="mr-top col-md-8">
                    
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div> 
              
                <Recipe />  
                     
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        count : state.totalitem
        //addedItems: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (id)=>{dispatch(removeItem(id))},
        addQuantity: (id)=>{dispatch(addQuantity(id))},
        subtractQuantity: (id)=>{dispatch(subtractQuantity(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)