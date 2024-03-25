import { Link, Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";


// Este action es nuevo a partir del React Router v6.4
// Con esta nueva modalidad no se usa el useState
export async function action({ request }: ActionFunctionArgs) {
  //De esta forma recupero el nombre y el precio de mis inputs
    const data = Object.fromEntries(await request.formData());
    let error = ''
    if (Object.values(data).includes('')) {
      error = 'Todos los campos son obligatorios'
    }

    //Si hay un error, se pone disponible a partir de un hook llamado useActionData()
    if (error.length) {
      return error
    }
    await addProduct(data)
    return redirect('/')
}

export default function NewProduct() {

  //Con este hook obtengo la información que me devuelve el action anterior. En este caso es el de error
  const error = useActionData() as string


  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to={"/"}
          className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-s hover:bg-indigo-500">
          Volver a productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form
        className="mt-10"
        method="POST"
      >
        <ProductForm/>
        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
