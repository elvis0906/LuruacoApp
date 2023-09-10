const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {

    const sql = `
    SELECT
    U.id,
    U.email,
    U.firstName,
    U.lastName,
    U.image,
    U.phone,
    U.password,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id',  CONVERT(R.id, char),
            'name', R.name,
            'image', R.image,
            'route', R.route
        )
    ) AS roles
FROM
    users AS U
INNER JOIN
    user_has_roles AS UHR
ON
    UHR.id_user = U.id
INNER JOIN
    roles AS R
ON
    UHR.id_rol = R.id
WHERE
    U.id = ?
GROUP BY
    U.id
`;


    db.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

User.findDeliveryMen = (result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.firstName,
        U.lastName,
        U.image,
        U.phone
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id 
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    );
}

User.getAll = (result) => {
    const sql = `
    SELECT
        CONVERT(U.id, char) AS id,
        U.email,
        U.firstName,
        U.lastName,
        U.image,
        U.phone
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id 
    INNER JOIN
        roles AS R
    ON
        R.id = UHR.id_rol
    WHERE
        R.id = 2;
    `;

    db.query(
        sql,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log("Id del nuevo repartidor", data)
                result(null, data);
            }
        }
    );
}


User.findByEmail = (email, result) => {

    const sql = `
    SELECT
        U.id,
        U.email,
        U.firstName,
        U.lastName,
        U.image,
        U.phone,
        U.password,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id',  CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
        ) AS roles
    FROM
        users AS U
    INNER JOIN
        user_has_roles AS UHR
    ON
        UHR.id_user = U.id
    INNER JOIN
        roles AS R
    ON
        UHR.id_rol = R.id
    WHERE
        email = ?
    GROUP BY
        U.id
    `;



    db.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}

User.create = async (user, result) => {
    
    const hash = await bcrypt.hash(user.password, 10);

    const sql = `
        INSERT INTO
            users(
                email,
                firstName,
                lastName,
                phone,
                image,
                password,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
            user.email,
            user.firstName,
            user.lastName,
            user.phone,
            user.image,
            hash,
            new Date(),
            new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )

}

    
User.update = (user, result) => {

    const sql = `
    UPDATE
        users
    SET
    firstName = ?,
        lastName = ?,
        phone = ?,
        image = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query
    (
        sql,
        [
            user.firstName,
            user.lastName,
            user.phone,
            user.image,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado:', user.id);
                result(null, user.id);
            }
        }
    )
}

User.updateWithoutImage = (user, result) => {

    const sql = `
    UPDATE
        users
    SET
        firstName = ?,
        lastName = ?,
        phone = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query
    (
        sql,
        [
            user.firstName,
            user.lastName,
            user.phone,
            new Date(),
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado:', user.id);
                result(null, user.id);
            }
        }
    )
}

User.updateNotificationToken = (id, token, result) => {
    const sql = `
    UPDATE
        users
    SET
        notificacion_token = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql,
        [
            token,
            new Date(),
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado:', id);
                result(null, id);
            }
        }
    )
}

User.delete = (id, result) => {
    const sql = `
    DELETE FROM
        users
    WHERE
        id = ?
    `;
    db.query(
        sql,
        id,
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del Repartidor ha sido eliminado:', id);
                result(null, id);
            }
        }
    )
}






module.exports = User;