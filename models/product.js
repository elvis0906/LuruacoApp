const db = require('../config/config')

const Product = {}

Product.create = (product, result) =>{
    const sql = `
    INSERT INTO
        products(
              name,
              descripcion,
              price,
              image1,
              created_at,
              updated_at  
        )

        VALUES(?, ?, ?, ?, ?, ?)    
`;
 
 db.query(
    sql,
    [
        product.name,
        product.descripcion,
        product.price,
        product.image1,
        new Date(),
        new Date()
    ], 
    (err, res) =>{
        if(err){
            console.log('Error:', err);
            result(err, null)
        }else{
            console.log("Id del nuevo Producto:", res.insertId)
            result(null, res.insertId)
        }
    }
 )
}



Product.update = (product, result) => {

    const sql = `
    UPDATE
        products
    SET
        name = ?,
        description = ?,
        price = ?,
        image1 = ?,        
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            product.name,
            product.description,
            product.price,
            product.image1,           
            new Date(),
            product.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }
    )
}
module.exports = Product;