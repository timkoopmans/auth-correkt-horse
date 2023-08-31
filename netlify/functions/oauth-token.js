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
                    token_type: "Bearer",
                    access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImU3NzZhNDQwIn0.eyJzdWIiOiJlNjI0MGEwZS03NWRiLTRkNDMtOWNjMy1kOWQwNGZlMmEyMDUiLCJuYW1lIjoiVGltIiwiZW1haWwiOiJ0aW0ua29vcHMrdGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6bnVsbCwibWV0YWRhdGEiOnt9LCJyb2xlcyI6WyJBZG1pbiJdLCJwZXJtaXNzaW9ucyI6WyJmZS5jb25uZWN0aXZpdHkuKiIsImZlLnNlY3VyZS4qIl0sInRlbmFudElkIjoiZjA5YmY2Y2ItYjliYy00NDhjLTkyY2UtMzdmZmQwMWVlZTQ1IiwidGVuYW50SWRzIjpbImYwOWJmNmNiLWI5YmMtNDQ4Yy05MmNlLTM3ZmZkMDFlZWU0NSJdLCJwcm9maWxlUGljdHVyZVVybCI6Imh0dHBzOi8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvZjc5NzVmNWM5ZmJiNDE0ZjY2MWU3YzYzYjM4NjY1ZDQ_ZD1odHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS9UaW0vMTI4L3JhbmRvbSIsInNpZCI6IjkxYzM5YWI5LWI4YjUtNGVmYy05ZWI0LTQ0NjNkYzIyZjY2MSIsInR5cGUiOiJ1c2VyVG9rZW4iLCJhdWQiOiJlNzc2YTQ0MC1kNzJmLTQ3ODMtOTMyZi1mMGZjMWJlNDVkZDYiLCJpc3MiOiJodHRwczovL2lkLmNvcnJla3QuaG9yc2UiLCJpYXQiOjE2OTM0ODA0OTUsImV4cCI6MTY5MzU2Njg5NX0.J-Vpc2bDuWlAB3BsqK5b7MZ_88IbA9bm9hxtxUSKvvr6r0il74gVi2xt-dEEIjJEpEUzPL5rN_QJd2xuZAbQvPpbwxMsRKO-cfCaLbCLIUgiZdq-NHc03laH4JcJ7qRjepi0htL0ed0Mpkpk1H6gIgHzPaITJrGGLWM1SeycxDjM2ryBEF_knsU6o3pejavVxuuOfoL8M0AyX26FBpGrzwBDPoxMiXxMiBAhTO20abi9Ld-3cT_vjR8DkWKT6oerkJB0Pzl0B98OGn9mHhwZ2ySYDqLPxl9v0RcYJyoNZAAjZ0qYe5wdOgJR98NfJMK6FYS6I1wsipB_NhLo921k5w",
                    refresh_token: "e9cbdf97-05fd-4c08-ad30-1c090b77e83c",
                    expires_in: 86400,
                    id_token: "e6240a0e-75db-4d43-9cc3-d9d04fe2a205"
                }),
            };
        // }
    }

    return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid credentials or missing parameters" }),
    };
};
