const querystring = require("querystring");

exports.handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Parse the request body
    const parsedBody = querystring.parse(event.body);

    // Extract the 'redirect_uri' from the body
    const redirectUri = parsedBody.redirect_uri;
   console.log(parsedBody);

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
};
