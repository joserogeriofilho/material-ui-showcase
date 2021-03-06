import Http from '../Http'
import { logout } from '../Auth'

const API_ENDPOINT = 'users';
const SORT_QUERY = '?_sort=lastName';


export default class UserService {

  static getUsers(_page, _limit, filterValue) {
    return new Promise( (resolve, reject) => {
      Http.get(API_ENDPOINT + SORT_QUERY, {
        params: {
          _page,
          _limit,
          'q': filterValue
        }
      })
      .then(response => {
        switch ( response.status ) {
          case 200:
            resolve( {data: response.data, totalCount: response.headers['x-total-count']} );
            break;
          case 401:
            logout();
            reject( new Error('Your session has expired') );
            break;
          default:
            reject( new Error('Something went wrong') );
            break;
        }
      })
      .catch( error => { 
        reject( error );
      });
    });
  }

  static getUser(id) {
    return new Promise( (resolve, reject) => {
      Http.get(API_ENDPOINT, {
        params: { id }
      })
      .then(response => {
        switch (response.status) {
          case 200:
            if (response.data.length > 0) {
              resolve(response.data[0]);
            } else {
              reject( new Error('No user found') );
            }
            break;
          case 401:
            logout();
            reject( new Error('Your session has expired') );
            break;
          default:            
            reject( new Error('Something went wrong') );
            break;
        }
      })
      .catch(error => {        
        reject(error);
      });
    });
  }

  static postUser(user) {
    return new Promise( (resolve, reject) => {
      Http.post(API_ENDPOINT,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email
        }
      ).then(response => {
        if(response.status === 201) {
          resolve(response);
        } else {
          reject( new Error('Something went wrong') );
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  }

  static putUser(user) {
    return new Promise( (resolve, reject) => {
      Http.put(`${API_ENDPOINT}/${user.id}`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          email: user.email
        }
      ).then(response => {
        if(response.status === 200) {
          resolve( response );
        } else {
          reject ( new Error('Something went wrong') );
        }
      })
      .catch(error => {
        console.log(error);
        
        reject (error)
      });
    });
  }

  static deleteUser(id){
    return new Promise( (resolve, reject) => {
      Http.delete(`${API_ENDPOINT}/${id}`)
      .then(response => {
        if (response.status === 200) {
          resolve(response);
        } else {
          reject( new Error('Something went wrong') );
        }
      })
      .catch(error => {
        reject(error);
      });
    });
  }

}