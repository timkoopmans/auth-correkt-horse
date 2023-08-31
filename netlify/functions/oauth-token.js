const querystring = require("querystring");

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Parse the request body
    const parsedBody = querystring.parse(event.body);

    // Extract the 'redirect_uri' from the body
    const redirectUri = parsedBody.redirect_uri;

    // Extract the 'Authorization' header
    const authHeader = event.headers["authorization"] || event.headers["Authorization"];

    // Parse the 'Authorization' header to get key and secret
    if (authHeader && authHeader.startsWith("Basic ")) {
        const base64Credentials = authHeader.split(" ")[1];
        const credentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
        const [key, secret] = credentials.split(":");

        // Now you have the key, secret, and redirectUri
        console.log(`Key: ${key}, Secret: ${secret}, Redirect URI: ${redirectUri}`);

        // Replace this with actual OAuth token generation logic
        // if (key === "your-key-here" && secret === "your-secret-here") {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    id: 3200,
                    permalink: "jwagener",
                    username: "Johannes Wagener",
                    uri: "https://api.soundcloud.com/users/3207",
                    permalink_url: "http://soundcloud.com/jwagener",
                    avatar_url: "http://i1.sndcdn.com/avatars-000001552142-pbw8yd-large.jpg?142a848",
                    country: "Germany",
                    full_name: "Johannes Wagener",
                    city: "Berlin"
                }),
            };
        // }
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials or missing parameters" }),
    };
};
