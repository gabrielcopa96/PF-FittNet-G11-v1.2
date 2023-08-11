// eslint-disable-next-line
// import { Action } from "history";
import { latBA, lngBA } from "../../asets/helpers/goeDefaults";
import CalcDist from "../../components/MapsAndGeo/controlers/calcDist"

import { 
  GET_ALL_USERS, GET_ALL_PARTNERS, GET_AVATARS, SET_CURRENT_PAGE, SET_PAGE_NUMBER,
  SET_CURRENT_LIMIT, GET_ALL_GYMS, GET_GYM_DETAIL, SET_USER_GEO, POST_USER_GOOGLE,
  GET_USER, POST_AVATAR, GET_USER_TOKEN_GOOGLE, PUT_USER_INFO, ADD_TO_CART, REMOVE_FROM_CART,
  CLEAR_GYM_DETAIL, GET_ATTRIBUTE_DESEASE, PUT_FAVOURITE,
  CLEAR_CART, GET_CART, GET_ADMIN, GET_LOCK_ACCOUNTS, GET_MARKETING, SORT_QUALIFICATION,
  FILTER_CATEGORY, SORT_PRICE, SEARCH, SORT_DISTANCE, GET_PLANS, GET_PARTNER_ID,
  GET_MY_GYMS, GET_PARTNER, SET_GYMS_GEO, POST_GYM, GET_MY_SALES, GET_ALL_SALES
} from "../actions/actionTypes";

const initialState = {
  users: [], // Acá guardo mis users de la página
  user: {},
  usersToShow: [],
  currentUserDetails: {
  },
  currentGeo: {
    latitude: latBA,
    longitude: lngBA,
  },
  gymsGeo: {
    latitude: 0,
    longitude: 0,
  },  
  currentGymCreated: {},
  gymCreaded: {},
  gyms: [],
  myGyms: {},
  gymsToShow: [],
  gymDetail: {},
  partners: [],
  partnersToShow: [],
  partnerDetails: {},
  partnerSales: {},
  avatars: [],
  pageToShow: [],
  currentLimit: 6,
  currentPage: 1,
  errors: "",
  products: [],
  cart: [],
  getCart: [],
  deseaseAttribute: [],
  lockAccounts: [],
  adminSales: {},
  plans: [],
  allCart:[]
};

export default function rootReducer(state = initialState, {
  type,
  payload
}: any) {
  switch (type) {
    case SET_USER_GEO:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      return {
        ...state,
        currentGeo: {
          latitude: payload.latitude ? payload.latitude : latBA,
          longitude: payload.longitude ? payload.longitude : lngBA,
        },
      };
    case GET_ALL_USERS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        users: payload,
        usersToShow: payload,
      };
    case GET_ALL_PARTNERS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        partners: payload,
        partnersToShow: payload,
      };
    case GET_PARTNER:
      // if (payload.error) {
      //   return {
      //     ...state,
      //     errors: payload.error,
      //   };
      // }
      return {
        ...state,
        partnerDetails: payload,
      };
    case GET_MY_SALES:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        partnerSales: payload,
      };
    case GET_ALL_SALES:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        adminSales: payload,
      };
    case GET_USER_TOKEN_GOOGLE:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        user: payload,
      };
    case PUT_USER_INFO:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        user: {...state.user, info: payload}
      };
    case GET_PARTNER_ID:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      return {
        ...state,
        user: payload
      };
    case GET_ALL_GYMS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      const newPage1 = payload.slice(payload.offset, payload.limit);
      return {
        ...state,
        gyms: payload,
        gymsToShow: payload,
        pageToShow: newPage1,
      };
    case SET_GYMS_GEO:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      return {
        ...state,
        gymsGeo: {
          latitude: payload.latitude,
          longitude: payload.longitude,
        },
      };
    case POST_GYM:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      };
      return {
        ...state,
        gymCreaded: payload,
      };
    case SORT_QUALIFICATION:
      const qualification = state.gyms;
      const all =
        payload === "ascendente"
          ? qualification.sort(function (a, b) {
            // @ts-expect-error TS(2339): Property 'raiting' does not exist on type 'never'.
            if (b.raiting > a.raiting) {
              return -1;
            }
            // @ts-expect-error TS(2339): Property 'raiting' does not exist on type 'never'.
            if (a.raiting > b.raiting) {
              return 1;
            }
            return 0;
          })
          : qualification.sort(function (a, b) {
            // @ts-expect-error TS(2339): Property 'raiting' does not exist on type 'never'.
            if (a.raiting > b.raiting) {
              return -1;
            }
            // @ts-expect-error TS(2339): Property 'raiting' does not exist on type 'never'.
            if (b.raiting > a.raiting) {
              return 1;
            }
            return 0;
          });
      const newPage2 = all.slice(payload.offset, payload.limit);
      return {
        ...state,
        gymsToShow: all,
        pageToShow: newPage2,
      };
    case SORT_PRICE:
      const price = state.gyms;
      const sortPrice =
        payload === "ascendente"
          ? price.sort((a, b) => {
            if (
              // @ts-expect-error TS(2339): Property 'price' does not exist on type 'never'.
              Number(b.price.$numberDecimal) > Number(a.price.$numberDecimal)
            ) {
              return -1;
            }
            if (
              // @ts-expect-error TS(2339): Property 'price' does not exist on type 'never'.
              Number(a.price.$numberDecimal) > Number(b.price.$numberDecimal)
            ) {
              return 1;
            }
            return 0;
          })
          : price.sort((a, b) => {
            if (
              // @ts-expect-error TS(2339): Property 'price' does not exist on type 'never'.
              Number(a.price.$numberDecimal) > Number(b.price.$numberDecimal)
            ) {
              return -1;
            }
            if (
              // @ts-expect-error TS(2339): Property 'price' does not exist on type 'never'.
              Number(b.price.$numberDecimal) > Number(a.price.$numberDecimal)
            ) {
              return 1;
            }
            return 0;
          });
      const newPage4 = sortPrice.slice(payload.offset, payload.limit);
      return {
        ...state,
        gymsToShow: sortPrice,
        pageToShow: newPage4,
      };
    case SORT_DISTANCE:
      const gym = state.gyms;
      const geo = state.currentGeo;
      const gymsDist = gym.map((g) => {
        // @ts-expect-error TS(2339): Property 'latitude' does not exist on type 'never'... Remove this comment to see the full error message
        let distanceCalc = CalcDist(geo.latitude, geo.longitude, g.latitude.$numberDecimal, g.longitude.$numberDecimal)
        let newGymD = {
          // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
          _id: g._id,
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          name: g.name,
          // @ts-expect-error TS(2339): Property 'price' does not exist on type 'never'.
          price: g.price,
          // @ts-expect-error TS(2339): Property 'raiting' does not exist on type 'never'.
          raiting: g.raiting ? g.raiting : 0,
          // @ts-expect-error TS(2339): Property 'image' does not exist on type 'never'.
          image: g.image,
          // @ts-expect-error TS(2339): Property 'logo' does not exist on type 'never'.
          logo: g.logo,
          // @ts-expect-error TS(2339): Property 'phone' does not exist on type 'never'.
          phone: g.phone,
          // @ts-expect-error TS(2339): Property 'email' does not exist on type 'never'.
          email: g.email,
          // @ts-expect-error TS(2339): Property 'services' does not exist on type 'never'... Remove this comment to see the full error message
          services: g.services,
          // @ts-expect-error TS(2339): Property 'trainers' does not exist on type 'never'... Remove this comment to see the full error message
          trainers: g.trainers ? g.trainer : [],
          // @ts-expect-error TS(2339): Property 'clients' does not exist on type 'never'.
          clients: g.clients ? g.clients : [],
          // @ts-expect-error TS(2339): Property 'latitude' does not exist on type 'never'... Remove this comment to see the full error message
          latitude: g.latitude,
          // @ts-expect-error TS(2339): Property 'longitude' does not exist on type 'never... Remove this comment to see the full error message
          longitude: g.longitude,
          // @ts-expect-error TS(2339): Property 'socialNetworks' does not exist on type '... Remove this comment to see the full error message
          socialNetworks: g.socialNetworks,
          // @ts-expect-error TS(2339): Property 'gymActive' does not exist on type 'never... Remove this comment to see the full error message
          gymActive: g.gymActive,
          // @ts-expect-error TS(2339): Property 'favourite' does not exist on type 'never... Remove this comment to see the full error message
          favourite: g.favourite,
          // @ts-expect-error TS(2339): Property 'address' does not exist on type 'never'.
          address: g.address,
          // @ts-expect-error TS(2339): Property 'uEnd' does not exist on type 'never'.
          uEnd: g.uEnd,
          distance: distanceCalc
        }
        return newGymD
      })
      gymsDist.sort((a, b) => {
        if (a.distance > b.distance) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      })
      const newPage6 = gymsDist.slice(payload.offset, payload.limit);
      return {
          ...state,
          gymsToShow: gymsDist,
          pageToShow: newPage6,
        };
     
    case FILTER_CATEGORY:
      const category = state.gyms;
      const filtCateg =
        payload === "all"
          ? category
          : category.filter((e) =>
            // @ts-expect-error TS(2339): Property 'services' does not exist on type 'never'... Remove this comment to see the full error message
            e.services.map((e: any) => e.name).includes(payload)
          );
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log("Esto es en redux", filtCateg);
      const newPage3 = filtCateg.slice(payload.offset, payload.limit);
      return {
        ...state,
        gymsToShow: filtCateg,
        pageToShow: newPage3,
      };
    case SEARCH:
      const searc = state.gyms;
      const buscador = payload
        ? searc.filter((e) =>
          // @ts-expect-error TS(2339): Property 'name' does not exist on type 'never'.
          e.name.toLowerCase().includes(payload.toLowerCase())
        )
        : searc;
      const newPage5 = buscador.slice(payload.offset, payload.limit);
      return {
        ...state,
        gymsToShow: buscador,
        pageToShow: newPage5,
      };
    case POST_USER_GOOGLE:
      // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
      console.log(payload);
      return {
        ...state,
        user: payload,
      };
    case GET_USER:
      return {
        ...state,
        user: payload,
      };
    case GET_GYM_DETAIL:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        gymDetail: payload,
        products: payload.services,
      };

    case POST_AVATAR:
      return {
        ...state,
        user: payload,
      };
    case GET_AVATARS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        avatars: payload,
      };
    case SET_CURRENT_PAGE:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      const newPage = state.gymsToShow.slice(payload.offset, payload.limit);
      return {
        ...state,
        pageToShow: newPage,
        currentPage: payload.currentPage,
      };
    case SET_PAGE_NUMBER:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        currentPage: payload,
      };
    case SET_CURRENT_LIMIT:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }

      return {
        ...state,
        currentLimit: payload,
      };
    case GET_CART:
      const idCart = payload ? payload[payload.length - 1]._id : {}
      return {
        ...state,
        getCart: idCart,
        allCart: payload
      }
    case ADD_TO_CART:
      // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
      const item = state.products.find(prod => prod._id === payload.id) //la clase q me matche con el id
      // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
      const inCart = state.cart.find(item => item._id === payload.id)
      return {
        ...state,
        cart: inCart ?
          state.cart.map(item =>
            // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
            item._id === payload.id
              // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
              ? { ...item, qty: item.qty + 1 }
              : item
          )
          // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
          : [...state.cart, { ...item, qty: 1 }]
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.map(item =>
          // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
          item._id === payload.id
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            ? { ...item, qty: item.qty === 0 ? 0 : item.qty - 1 }
            : item
        )
      };
    case CLEAR_GYM_DETAIL:
      return {
        ...state,
        gymDetail: payload,
      };
    case CLEAR_CART:
      return {
        ...state,
        cart: []
      };
    case GET_ATTRIBUTE_DESEASE:
      return {
        ...state,
        deseaseAttribute: payload,
      };
    case PUT_FAVOURITE:
      const objFav: any = []
      state.pageToShow.forEach(x => {
        // @ts-expect-error TS(2339): Property '_id' does not exist on type 'never'.
        if (x._id === payload.gym._id) {
          // @ts-expect-error TS(2339): Property 'favourite' does not exist on type 'never... Remove this comment to see the full error message
          x.favourite = payload.gym.favourite
        }
        objFav.push(x)
      })
      return {
        ...state,
        pageToShow: objFav,
        gyms: objFav,
        gymsToShow: objFav,
        user: { ...state.user, favourite: payload.user.favourite }
      }
    case GET_ADMIN:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        user: payload
      };
    case GET_LOCK_ACCOUNTS:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        lockAccounts: payload
      };
    case GET_MARKETING:
      if (payload.error) {
        return {
          ...state,
          errors: payload.error,
        };
      }
      return {
        ...state,
        users: payload
      }
    case GET_PLANS:
      return {
        ...state,
        plans: payload
      }
    case GET_MY_GYMS:
      return {
        ...state,
        myGyms: payload
      }
    default:
      return state;
  }
}
