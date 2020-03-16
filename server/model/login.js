module.exports = async (data) => {
    const { name, password } = data;
    const searchSQL = `SELECT * FROM user_info WHERE user_name = "${name}" OR phone = "${name}" AND password = "${password}"`;
    return await db.query(searchSQL);
};
