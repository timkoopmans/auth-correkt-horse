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
                    mfaRequired: false,
                    accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImU3NzZhNDQwIn0.eyJzdWIiOiIyNzhiODZlZC1lODUzLTQ3YjQtOGQxOC0xOTc2NTE2OTMzMzMiLCJuYW1lIjoiQ29ycmVrdCBIb3JzZSIsImVtYWlsIjoiY29ycmVrdGhvcnNlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJtZXRhZGF0YSI6e30sInJvbGVzIjpbIkFkbWluIl0sInBlcm1pc3Npb25zIjpbImZlLmNvbm5lY3Rpdml0eS4qIiwiZmUuc2VjdXJlLioiXSwidGVuYW50SWQiOiI2MjAzZTBhYy00NmNmLTQxYjItOTY2ZS1hODlmZDFkNjllN2QiLCJ0ZW5hbnRJZHMiOlsiNjIwM2UwYWMtNDZjZi00MWIyLTk2NmUtYTg5ZmQxZDY5ZTdkIl0sInByb2ZpbGVQaWN0dXJlVXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFjSFR0Y3JrNXg2SUZrSW9nam84X1h6QW9jS3ZCT3VkTXZ4cF9nOXJKY1hXS0dUOHc9czk2LWMiLCJzaWQiOiI4YjQyNDIwZS0xNTdmLTQ2NTQtYTcyYy0wZDY0NTcxOTZhMDkiLCJ0eXBlIjoidXNlclRva2VuIiwiYXVkIjoiZTc3NmE0NDAtZDcyZi00NzgzLTkzMmYtZjBmYzFiZTQ1ZGQ2IiwiaXNzIjoiaHR0cHM6Ly9pZC5jb3JyZWt0LmhvcnNlIiwiaWF0IjoxNjkzNDc2OTYzLCJleHAiOjE2OTM1NjMzNjN9.Dvr-ouUwTA9taCPVyyNnSwcDXtzj9DnUL2vV3RJdO4-I9QNAGLBXDZOX_0Jix0ZtxJcvyAC2XOnVughXN4BxC778aIYceVKsb6XR48MwrCS9rI_ObiMYfl18PPmcUZF9yn1fpq_u4D4Fi3ciDDN97oXm7BwUbYWbkuyWaDhfh-FhAm_nlEtVqGxD5L5fjxgOM_oEJgKbwgeM4TMoHrC2KEoDpvdoOR5j50mnO-UmH09C-CywGxWRc9GN91RIeY8XGqq1nxkrMkHJTv5WrSil43EilAtqGrCoekfS69p2QI040TtVOhvU62f7n1H8JNAl8hugWC7aYtRNpjYhCdVODQ",
                    refreshToken: "64982fcf-e3f5-40dc-928e-425e68f9608e",
                    expiresIn: 86400,
                    expires: "Fri, 01 Sep 2023 10:16:03 GMT",
                    userId: "278b86ed-e853-47b4-8d18-197651693333"
                }),
            };
        // }
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials or missing parameters" }),
    };
};
