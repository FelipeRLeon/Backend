import pool from '../database/keys';

const authentication = {};

authentication.signUp = async (req, res) => {
    const { name, email, password, role } = req.body;

    if(role == 'admin') {
        try {
            await pool.query("INSERT INTO admin (a_name, a_email, a_password) VALUES ($1, $2, $3)", [name, email, password]);
            res.status(200).json({
                message: 'Successful registred',
                admin: { name, email, password }
            });
        } catch (error) {
            if (error.constraint == 'admin_a_email_key') {
                res.status(500).json({
                    message: 'Someone is already using that email',
                    error
                });

            } else {
                res.status(500).json({
                    message: 'An error has ocurred',
                    error
                })
            }
        }

    } else {
        try {
            await pool.query("INSERT INTO client (c_name, c_email, c_password) VALUES ($1, $2, $3)", [name, email, password]);
            res.status(200).json({
                message: 'Successful registred',
                client: { name, email, password }
            });
        } catch (error) {
            if (error.constraint == 'client_c_email_key') {
                res.status(500).json({
                    message: 'Someone is already using that email',
                    error
                });

            } else {
                res.status(500).json({
                    message: 'An error has ocurred',
                    error
                })
            }
        }
    }
};


module.exports = authentication;