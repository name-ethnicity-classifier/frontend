interface AppConfig {
    BACKEND_URL: string;
    API_DOC_URL: string;
}

const hostname = window.location.hostname;

let BACKEND_URL: string;
let API_DOC_URL: string;

if (hostname === 'localhost') {
    BACKEND_URL = 'http://localhost:8080';
    API_DOC_URL = 'http://localhost:3000';
} else if (hostname === 'www.name-to-ethnicity.com' || hostname === 'name-to-ethnicity.com') {
    BACKEND_URL = 'https://api.name-to-ethnicity.com';
    API_DOC_URL = 'https://docs.api.name-to-ethnicity.com';
} else {
    BACKEND_URL = 'https://api.dev.name-to-ethnicity.com';
    API_DOC_URL = 'https://docs.dev.name-to-ethnicity.com';
}

const config: AppConfig = {
    BACKEND_URL,
    API_DOC_URL,
};

export default config;
