// global functions that are gonna be used constantly accross app

export const userQuery = (userId) => {
    // sanity query sintax
    // get a doc of type = user that corresponds to this unique userId
    const query = `*[_type == 'user' && _id == '${userId}']`

    return query;
}