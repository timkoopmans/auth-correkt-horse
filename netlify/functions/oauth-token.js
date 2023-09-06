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
                    access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.S5CmpNYneK2Uf8sg479_HpLkwxY4g9VB4tNbfavQI3Q",
                    token_type: "Bearer",
                    expires_in: 3600,
                    refresh_token: "tGzv3JOkF0XG5Qx2TlKWIA",
                    id_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.OldKP0FJ4hSPo7xEKMYwvTylAof2iRyWui5qLqG2N90"

                }),
            };
        // }
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials or missing parameters" }),
    };
};
