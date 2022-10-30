// global functions that are gonna be used constantly accross app

export const userQuery = (userId) => {
    // sanity query sintax
    // get a doc of type = user that corresponds to this unique userId
    const query = `*[_type == 'user' && _id == '${userId}']`

    return query;
}

export const collections = [
  {name: 'First Birthday'},
  {name: 'Pumpkin patch 2022'},
  {name: 'Silly moments'},
]

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

export const postDetailQuery = (postId) => {
    const query = `*[_type == 'imgpost' && _id == '${postId}']{
          image{
            asset->{
              url
            }
          },
          _id,
          title, 
          about,
          collection,
          postedBy->{
            _id,
            userName,
            image
          },
         save[]{
            postedBy->{
              _id,
              userName,
              image
            },
          },
          comments[]{
            comment,
            _key,
            postedBy->{
              _id,
              userName,
              image
            },
          }
        }`;
        return query;
      };
      
export const postDetailMorePinQuery = (post) => {
        const query = `*[_type == 'imgpost' && collection == '${post.collection}' && _id != '${post._id}' ]{
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
      

export const searchQuery = (searchTerm) => {
    const query = `*[_type == 'imgpost' && title match '${searchTerm}*' || collection match '${searchTerm}*' || about match '${searchTerm}*']{
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

  
export const userCreatedPostsQuery = (userId) => {
    const query = `*[ _type == 'imgpost' && userId == 'drafts.${userId}'] | order(_createdAt desc){
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
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };
  
export const userSavedPostsQuery = (userId) => {
    const query = `*[_type == 'imgpost' && 'drafts.${userId}' in save[].userId ] | order(_createdAt desc) {
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
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
    return query;
  };