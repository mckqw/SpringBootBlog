import { BASE_URL } from "./config";


export const getToken = () => {
    return localStorage.getItem("jwtToken");
};

export const logout = () => {
    localStorage.removeItem("jwtToken");
};

export const isAuthenticated = () => {
    return !!getToken(); // Check if token exists
};

export const fetchWithAuth = async (url, options = {}, queryParams = {}) => {
    const token = getToken();
    if (token) {
        options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        };
    }

    const queryString = new URLSearchParams(queryParams).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    let response;

    try {
        response = await fetch(fullUrl, options);

        if (response.status === 401) {
            console.warn("Unauthorized access - logging out");
            logout();
        }
    } catch (error) {
        console.warn("Error fetching data:", error);
    }
    return response;
};

export const login = async (username, password) => {
    const credentials = btoa(`${username}:${password}`); // Encode credentials in Base64
    const response = await fetch(`${BASE_URL}/token`, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
        },
    });

    const status = await response.ok;

    if (!status) {
        if (response.status === 401) {
            return { error: "Invalid username or password" };
        }
        return { error: "Login failed. Please try again later." };
    }

    const data = await response.json();
    localStorage.setItem("jwtToken", data.token); // Store JWT token in localStorage
    return { success: true, data };
};

export const register = async (username, password, email) => {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
    });

    if (!response.ok) {
        if (response.status === 400) {
            return { error: "Registration failed. The username or email is likely already registered." };
        }
        return { error: "Registration failed. Please try again later." };
    }

    const data = await response.json();
    localStorage.setItem("jwtToken", data.token);
    return { success: true, data };
};

export const getUsername = () => {
    const token = getToken();
    if (!token) return "";

    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.sub;
};

export default {
    logout,
    getToken,
    isAuthenticated,
    fetchWithAuth,
    login,
    register,
    getUsername
}