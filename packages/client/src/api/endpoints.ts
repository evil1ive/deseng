const Endpoints = {
    APIURL:'https://newsapi.org/v2/everything?',
    APIKEY: import.meta.env.VITE_API_KEY,
    URL: import.meta.env.VITE_URL,
    AUTH:{
        REGISTRATE:'/registrate',
        LOGIN:'/auth',
        REFRESH:'/refresh',
        LOGOUT:'/logout',
        CHECKUSER:'/checkuser'
    },
    DATA:{
        NEWS:'?????',
        DIRECTIONS:'/directions',
        MATERIALS:'/materials',
        DICTIONARY:'/dictionary'
    }
}

export default Endpoints