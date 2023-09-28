import {useState, useEffect} from 'react';
import {TailSpin} from 'react-loader-spinner';
import OrderCard from '../OrderCard';
import "./index.css";

function Orders() {
    let [Orders,setOrders] = useState([]);
    let [IsLoading, setIsLoading] = useState(true);
    let [OrdersPresent, setIsOrdersPresent] = useState(false);
    let [error, setError] = useState(false);

    let imageNotFound = "https://cdni.iconscout.com/illustration/premium/thumb/man-finding-nothing-in-order-4006350-3309936.png?f=webp";

    const GetOrders = async() => {
        let url = "https://localhost:7258/api/Order/BDB52F9F-92BE-44E3-BD23-61CD36B513BF";
        let response = await fetch(url);
        if(response.ok) {
            let responseData = await response.json();
            console.log(responseData)
            setOrders(responseData);
            setIsOrdersPresent(responseData.length > 0);
            setIsLoading(false);
        }
        else {
            setOrders([]);
            setIsOrdersPresent(false);
            setIsLoading(false);
        }
        setError(false);
    }

    useEffect(() => {
        try {
            GetOrders();
        }
        catch(error) {
            setError(true);
            setIsLoading(false);
        }
    }, [])

    return (
        <div className='page'>
            { IsLoading ? <div className='spinner-container'><TailSpin color="blue" radius={"8px"}/></div> : 
                (OrdersPresent ? 
                <div className='order-container'>
                    { Orders.map((order) => <OrderCard key={order.orderId} {...order}/>) }
                </div>
                : 
                <div className='not-found-card-container'>
                    <img src={imageNotFound} alt="Not Found" className='image-not-found'/>
                    <h2>No orders placed yet</h2>
                    <p>Looks like you have not placed an order yet.<br/>Add items to your cart and checkout when you are ready</p>
                    <button className='explore-button'>Explore products</button>
                </div>) 
            }
            {error && <h1>Something went wrong</h1>}
        </div>
    )
}

export default Orders;