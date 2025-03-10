import { destination, NearbyRestaurant } from './typeInterfaces';

export type RootStackParamList = {
  Home: undefined;
  search: undefined;
  destination: {
    dest_id: string;
  };
  restaurant: {
    rest_id: string;
  };
  wishList: undefined;
  settings: undefined;
  MytripPage: undefined;
  TabNavigator: undefined;
  destinationList: {
    keyword: string;
    destinations: destination[];
  };
  restaurantList: {
    destId: string;
    restaurants: NearbyRestaurant[];
  };
}; 