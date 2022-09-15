import React from 'react';
import '../assets/css/Clientes.css';
import axios from 'axios';

var sumatoria;

class DetalleFactura extends React.Component {

    constructor(props) { 
        super(props);

        this.state = {
            cliente: []
        }
        this.deleteRow = this.deleteRow.bind(this);
    };
    
    deleteRow(id) {

        axios({
            method: 'post',     //put
            url: `http://localhost:9000/clientes/deleteC`,
            //headers: {'Authorization': 'Bearer'+token}, 
            data: {
                CLI_ID_CLIENTE: id,
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.props.listado();
        });
       
    }
    
    

    render() {
        return (
            <div className="container">

                <table className="table table-striped table-dark mt-5">
                    <thead>
                        <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Precio Unitario</th>
                            <th scope="col">Precio Total</th>

                        </tr>
                    </thead>
                    <tbody>
                            {/*onclick="formVerAcuerdo(\''+datos.numeroAcuerdo+'\',\''+datos.fecha+'\',\''+datos.articulo+'\',\''+datos.numeroActa+'\',\''+datos.descripcion+'\',\''+datos.motivo+'\');"*/
                               
                               this.props.prod.map((pro, i) => {
                                    return (
                                        <tr key={'tr'+i+1} scope="row">
                                            <td key={'cod'+i+1}>{pro.PRO_CODIGO_PRODUCTO}</td>
                                            <td key={'cant'+i+1}>{pro.CANTIDAD}</td>
                                            <td key={'desc'+i+1}>{pro.PRO_DESCRIPCION}</td>
                                            <td key={'prec'+i+1}>{pro.PRO_PRECIO}</td>
                                            <td key={'precT'+i+1}>
                                                {parseInt(pro.CANTIDAD) * parseInt(pro.PRO_PRECIO) }
                                            </td>
                                             <td key={'delete'+i+1}> 
                                                <button type="submit"  className="btn btn-delete"  >
                                                
                                                    <i className="app-menu__icon fa fa-pencil-square-o"></i>
                                                </button>
                                            </td>
                                        </tr>
                                      
                                    );
                                })
                            }
                       
                    </tbody>
                </table>
                
                
            </div>

        )
    }

}
export default DetalleFactura;