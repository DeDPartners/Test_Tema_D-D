#!/usr/bin/env python3
"""Create a minimal theme_preview.png for the Odoo theme module."""
import os
import struct
import zlib

def create_minimal_png(path, width=800, height=600):
    """Create a minimal PNG with a dark blue background."""

    def png_chunk(chunk_type, data):
        c = struct.pack('>I', len(data))
        c += chunk_type
        c += data
        c += struct.pack('>I', zlib.crc32(chunk_type + data) & 0xffffffff)
        return c

    # PNG signature
    signature = b'\x89PNG\r\n\x1a\n'

    # IHDR chunk
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 2, 0, 0, 0)
    ihdr = png_chunk(b'IHDR', ihdr_data)

    # IDAT chunk - create raw image data
    # Dark navy background: #0A0F1E = (10, 15, 30)
    bg_r, bg_g, bg_b = 10, 15, 30

    raw_rows = []
    for y in range(height):
        row = b'\x00'  # filter type = None
        for x in range(width):
            # Add a subtle gradient effect
            r = min(255, bg_r + int((x / width) * 30))
            g = min(255, bg_g + int((y / height) * 10))
            b = min(255, bg_b + int((x / width) * 50))
            row += bytes([r, g, b])
        raw_rows.append(row)

    raw_data = b''.join(raw_rows)
    compressed = zlib.compress(raw_data, 9)
    idat = png_chunk(b'IDAT', compressed)

    # IEND chunk
    iend = png_chunk(b'IEND', b'')

    png_data = signature + ihdr + idat + iend

    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'wb') as f:
        f.write(png_data)

    print(f"Created {path} ({len(png_data)} bytes)")

if __name__ == '__main__':
    base = os.path.dirname(os.path.abspath(__file__))
    preview_path = os.path.join(base, 'theme_ded_partners', 'static', 'description', 'theme_preview.png')
    create_minimal_png(preview_path, 800, 600)
    print("Done!")
