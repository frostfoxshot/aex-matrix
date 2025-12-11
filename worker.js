// worker.js
import { serveStatic } from 'worktop/serve-static';
import { Router } from 'worktop';

const API = new Router();

// Serve config.json
function matrixConfig() {
  return new Response(JSON.stringify({
    "default_server_config": {
      "m.homeserver": {
        "base_url": "https://matrix-client.matrix.org",
        "server_name": "matrix.org"
      }
    },
    "disable_custom_urls": true,
    "disable_guests": true
  }), {
    headers: { "Content-Type": "application/json" }
  });
}

// 1. Default config
API.add("GET", "/config.json", matrixConfig);

// 2. Hostname-based config (Element auto-loads this)
API.add("GET", "/config.:host.json", matrixConfig);

// 3. Static files
API.add("GET", "/*", serveStatic("webapp"));

export default {
  async fetch(request, env, ctx) {
    return API.run(request, env, ctx);
  }
};
