import React from 'react'

const Product = () => {


    return (
        <div className="mobilePreviewContainer">
            <div className="header-main-mobile-preview-div">

                <div>

                    <div>
                        {/* <label htmlFor="menu-toggle" className="menu-icon">
              &#9776;
            </label> */}
                        <nav className="menu">
                            <ul>
                                <li>
                                    <a href="#">Account</a>
                                </li>
                                <li>
                                    <a href="#">Orders</a>
                                </li>
                                <li>
                                    <a href="#">Addresses</a>
                                </li>
                                <li>
                                    <a href="#">Login</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>{shopify.config.shop.split(".")[0] || "Renergii"}</div>
                    {/* <div>cart</div> */}


                    <div className="footer-main-mobile-preview-div">
                        <div className="search-footer-icon">&#128269;</div>

                        <div>
                            <label htmlFor="home-btn" className="home-footer-icon">
                                &#8962;
                            </label>
                        </div>

                        <div className="cart-footer-icon">&#128722;</div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Product