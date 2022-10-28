// global functions that are gonna be used constantly accross app

export const userQuery = (userId) => {
    // sanity query sintax
    // get a doc of type = user that corresponds to this unique userId
    const query = `*[_type == 'user' && _id == '${userId}']`

    return query;
}

export const feedQuery = `*[_type == 'imgpost'] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
        _id,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          _key,
          postedBy->{
            _id,
            userName,
            image
          },
        },
      } `;

export const searchQuery = (searchTerm) => {
    const query = `*[_type == "postimg" && title match '${searchTerm}*' || collection match '${searchTerm}*' || about match '${searchTerm}*']{
          image{
            asset->{
              url
            }
          },
              _id,
              postedBy->{
                _id,
                userName,
                image
              },
              save[]{
                _key,
                postedBy->{
                  _id,
                  userName,
                  image
                },
              },
            }`;
    return query;
  };