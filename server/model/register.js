module.exports = async (body) => {
    let { name, password, phone, nickname, sex, portrait } = body;
    nickname = nickname ? nickname : '';
    sex = sex ? sex : -1;
    const addInfoSql = `INSERT INTO user_info ( user_uid, user_name, password, phone, nickname, sex, portrait, friends_list, friend_request ) VALUES ( 0, "${name}", "${md5(password)}", "${phone}", "${nickname}", "${sex}", "${portrait}", "[]", "[]" );`;
    return await db.query(addInfoSql);
};
