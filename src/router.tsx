import { createBrowserRouter } from "react-router-dom";

import Products, { loader as productsLoader, action as updateAvailabilityAction} from "./views/Products";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import Layout from "./layouts/Layout";
import EditProduct, { loader as editProductLoader, action as editProductAction } from "./views/EditProduct";
import { action as deleteProduct} from "./components/ProductDetails";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Products/>,
                loader: productsLoader,
                action:updateAvailabilityAction
            },
            {
                path:'productos/nuevo',
                element: <NewProduct/>,
                action:  newProductAction
            },
            {
                path:'productos/:id/edit', //ROA Pattern
                element: <EditProduct/>,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path:'productos/:id/eliminar', //ROA Pattern
                action: deleteProduct

            }
        ]
    }
])