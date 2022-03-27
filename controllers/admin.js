import pool from '../database/keys';

const administrator = {};

administrator.createProduct = async (req, res) => {
    const {name, price, amount, info, img, category} = req.body;

    try {
        await pool.query('INSERT INTO product (p_name, p_price, p_amount, p_info, p_img, p_category) VALUES ($1, $2, $3, $4, $5, $6)', [name, price, amount, info, img, category]);
        res.status(200).json({
            message: 'Successful added product',
            product: {name, price, amount, info, img, category}
        });

    } catch(error){
        res.status(500).json({
            message: 'An error has ocurred',
            error
        });
    }
};

administrator.readProduct = async (req, res) => {
    const id = req.params.id_p;
    try {
        const product = await (await pool.query('SELECT * FROM product WHERE id_p=$1', [id])).rows;
        console.log(product);
        res.status(200).json({product});
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred.',
            error
        })
    }
};

administrator.updateProduct = async (req, res) => {
    const id = req.params.id_p;

    const {p_name, p_price, p_amount, p_info, p_img, p_category} = req.body;

    try {
        await pool.query('UPDATE product SET p_name =$1, p_price=$2, p_amount=$3, p_info=$4, p_img=$5, p_category=$6 WHERE id_p=$7', [p_name, p_price, p_amount, p_info, p_img, p_category, id])
        res.status(200).json({
            message: 'Successful edited product'
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred.',
            error
        });
    }



};

administrator.deleteProduct = async (req, res) => {
    const id = req.params.id_p;
    
    try {
        await pool.query('DELETE FROM product WHERE id_p=$1', [id]);
        res.status(200).json({
            message: 'Successful deleted product'
        })
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred.',
            error
        });
    }

};

administrator.getProducts = async (req, res) => {
    const {id} = req.body;

    try {
        const products = await ( await pool.query('SELECT * FROM product')).rows;
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({
            message: 'An error has ocurred.',
            error
        });
    }
}

module.exports = administrator;