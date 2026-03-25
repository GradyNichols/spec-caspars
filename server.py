#!/usr/bin/env python3
"""
Simple HTTP server that serves index.html for SPA routes
"""
import http.server
import socketserver
import os
from urllib.parse import urlparse

class SPAServer(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the requested path
        parsed_path = urlparse(self.path)
        path = parsed_path.path

        # If the path doesn't start with /pages/ and doesn't exist as a file,
        # serve index.html (for SPA routing)
        if not path.startswith('/pages/') and not os.path.exists('.' + path) and path != '/':
            self.path = '/index.html'

        # Call the parent handler
        return super().do_GET()

if __name__ == '__main__':
    PORT = 8000

    with socketserver.TCPServer(("", PORT), SPAServer) as httpd:
        print(f"Serving SPA at http://localhost:{PORT}")
        print("Press Ctrl+C to stop")
        httpd.serve_forever()