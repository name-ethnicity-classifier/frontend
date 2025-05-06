#!/bin/sh

cat <<EOF > /app/dist/config.js
window.env = {
    BACKEND_URL: "${BACKEND_URL}",
    API_DOC_URL: "${API_DOC_URL}"
};
EOF

exec "$@"
