#!/usr/bin/env python3
"""Serve the planner on :8765 and tell the browser to check for a newer copy every time.

`python3 -m http.server` sends no cache headers, so a browser keeps index.html for hours and keeps loading the old
app.js version it names: after the v279 update on 2026-09-30 the planner tab went on running v278 until the cache
was cleared by hand. `Cache-Control: no-cache` makes the browser revalidate each file on every load; an unchanged
file costs a 304 and nothing else, and a changed one arrives at once.

Usage: python3 tools/serve.py [port]   (serves ../app, default port 8765)
"""
import http.server
import os
import sys

APP = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "app")


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()


class Server(http.server.ThreadingHTTPServer):
    # 2026-11-04: the standard queue holds 5 waiting connections. Six headless renders at once (tools/plans_changed.js)
    # open more than that, the extra ones were dropped, and those renders printed a blank 1-page PDF.
    request_queue_size = 128


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    Server(("", port), NoCacheHandler).serve_forever()
