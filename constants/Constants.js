// Constants.js (or another appropriate file)

export const CATEGORY_SUBCATEGORY_MAPPING = {
    FOOD: new Set(['GROCERIES', 'RESTAURANT', 'COFFEE']),
    TRANSPORT: new Set(['GAS', 'PUBLIC_TRANSPORT', 'TAXI']),
    ENTERTAINMENT: new Set(['MOVIES', 'CONCERTS', 'GAMES']),
    HEALTH: new Set(['MEDICAL', 'FITNESS', 'INSURANCE']),
    UTILITIES: new Set(['ELECTRICITY', 'WATER', 'INTERNET']),
    OTHER: new Set(['UNCATEGORIZED']),
};

export const CATEGORY_ICON_MAPPING = {
    FOOD: require('../assets/images/category/food.png'), // Replace with actual path
    TRANSPORT: require('../assets/images/category/transportation.png'),
    ENTERTAINMENT: require('../assets/images/category/entertainment.png'),
    HEALTH: require('../assets/images/category/health.png'),
    UTILITIES: require('../assets/images/category/utilities.png'),
    OTHER: require('../assets/images/category/other.png'),
};

export const SUBCATEGORY_ICON_MAPPING = {
    GROCERIES: require('../assets/images/subcategory/groceries.png'),
    RESTAURANT: require('../assets/images/subcategory/restaurant.png'),
    COFFEE: require('../assets/images/subcategory/coffee.png'),
    GAS: require('../assets/images/subcategory/gas.png'),
    PUBLIC_TRANSPORT: require('../assets/images/subcategory/public-transport.png'),
    TAXI: require('../assets/images/subcategory/taxi.png'),
    MOVIES: require('../assets/images/subcategory/movies.png'),
    CONCERTS: require('../assets/images/subcategory/concert.png'),
    GAMES: require('../assets/images/subcategory/games.png'),
    MEDICAL: require('../assets/images/subcategory/medical.png'),
    FITNESS: require('../assets/images/subcategory/fitness.png'),
    INSURANCE: require('../assets/images/subcategory/insurance.png'),
    ELECTRICITY: require('../assets/images/subcategory/electricity.png'),
    WATER: require('../assets/images/subcategory/water.png'),
    INTERNET: require('../assets/images/subcategory/internet.png'),
    UNCATEGORIZED: require('../assets/images/subcategory/uncategorized.png'),
};
