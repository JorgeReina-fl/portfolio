"""Imágenes de las tarjetas de proyecto de jorgereina.com.

Salida: proyectos-img/<slug>.webp (1200x900, WebP q80) y preview-345.png
(las 8 al ancho real de la tarjeta, 345 px). Con --sin-balon se genera además
proyectos-img/rugbytrack-sin-balon.webp (variante de Rugbytrack sin balón).

Diseño: fondo azul noche #14122b con malla de degradados, brillo violeta
#8b5cf6 arriba a la izquierda, halo radial detrás del motivo y grano sutil.
Un acento por proyecto derivado del violeta. Título en Space Grotesk Bold
(100 px) y firma </> en JetBrains Mono, en la misma posición en las 8.
Todo el contenido queda dentro de la zona útil de 960x720 centrada.

Fuentes (OFL, de Fontsource; Pillow lee los .woff directamente):
    npm pack @fontsource/space-grotesk@5.3.0
        -> package/files/space-grotesk-latin-700-normal.woff
    npm pack @fontsource/jetbrains-mono@5.3.0
        -> package/files/jetbrains-mono-latin-500-normal.woff
Deja los dos .woff en ./fonts (o indica otra carpeta con FONTS_DIR).

Probado con Python 3, Pillow 12.3.0 y numpy 2.5.3. La salida es
determinista (semilla fija del grano).

Uso:
    python3 generar-proyectos-img.py [--sin-balon]
"""
import math
import os
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS_DIR = os.environ.get("FONTS_DIR", os.path.join(HERE, "fonts"))
TITLE_FONT = os.path.join(FONTS_DIR, "space-grotesk-latin-700-normal.woff")
MONO_FONT = os.path.join(FONTS_DIR, "jetbrains-mono-latin-500-normal.woff")

S = 2                                   # supermuestreo: se dibuja a 2400x1800
W, H = 1200 * S, 900 * S
TITLE_PX = 100
TITLE_MAX_W = 900

BG = (20, 18, 43)                       # #14122b
WHITE = (255, 255, 255)
VIOLET = (139, 92, 246)                 # #8b5cf6
LAV = (196, 181, 253)                   # #c4b5fd
INDIGO = (99, 102, 241)                 # #6366f1
MAGENTA = (217, 70, 239)                # #d946ef
PINK = (240, 171, 252)                  # #f0abfc
CYAN = (103, 232, 249)                  # #67e8f9
JOINT = (52, 46, 110)                   # juntas del azulejo


# ---------------------------------------------------------------- utilidades
def R(*v):
    """Coordenadas 1x -> lienzo supermuestreado."""
    return [x * S for x in v]


def P(pts):
    return [(x * S, y * S) for x, y in pts]


def rgba(c, a=255):
    return tuple(c) + (a,)


def new_layer():
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    return layer, ImageDraw.Draw(layer)


def mono(px):
    return ImageFont.truetype(MONO_FONT, int(px * S))


def dashed(d, a, b, col, width, dash=14, gap=10):
    (x0, y0), (x1, y1) = a, b
    length = math.hypot(x1 - x0, y1 - y0)
    pos = 0.0
    while pos < length:
        t0, t1 = pos / length, min(pos + dash, length) / length
        d.line(R(x0 + (x1 - x0) * t0, y0 + (y1 - y0) * t0,
                 x0 + (x1 - x0) * t1, y0 + (y1 - y0) * t1), fill=col, width=width)
        pos += dash + gap


def drop_shadow(im, layer, blur=12, strength=0.55):
    alpha = layer.split()[3].filter(ImageFilter.GaussianBlur(blur * S))
    alpha = alpha.point(lambda p: int(p * strength))
    black = Image.new("L", (W, H), 0)
    return Image.alpha_composite(im, Image.merge("RGBA", (black, black, black, alpha)))


def glow(im, cx, cy, rx, ry, col, alpha, blur):
    layer, d = new_layer()
    d.ellipse(R(cx - rx, cy - ry, cx + rx, cy + ry), fill=rgba(col, alpha))
    return Image.alpha_composite(im, layer.filter(ImageFilter.GaussianBlur(blur * S)))


def background(accent):
    im = Image.new("RGBA", (W, H), rgba(BG))
    im = glow(im, 170, 90, 520, 380, VIOLET, 95, 200)     # brillo violeta del hero
    im = glow(im, 1120, 880, 520, 360, INDIGO, 70, 220)   # malla: esquina opuesta
    im = glow(im, 600, 365, 420, 320, accent, 85, 170)    # halo radial del motivo
    return im


def grain(img, amount=4.5, seed=7):
    a = np.asarray(img).astype(np.float32)
    noise = np.random.default_rng(seed).normal(0, amount, a.shape[:2])[..., None]
    return Image.fromarray(np.clip(a + noise, 0, 255).astype(np.uint8))


def ramp(t, stops):
    out = np.zeros(t.shape + (3,), np.float32)
    xs = [s[0] for s in stops]
    for ch in range(3):
        out[..., ch] = np.interp(t, xs, [s[1][ch] for s in stops])
    return out


# ------------------------------------------------------------------ motivos
def m_obras(im):
    """Plano de planta con cotas."""
    layer, d = new_layer()
    x0, y0, x1, y1 = 300, 205, 900, 525
    wall = rgba(WHITE, 235)
    thin = rgba(LAV, 190)
    d.rectangle(R(560, y0, x1, 385), fill=rgba(CYAN, 40))          # estancia resaltada
    d.rectangle(R(x0, 385, 560, y1), fill=rgba(VIOLET, 45))
    d.rectangle(R(x0, y0, x1, y1), outline=wall, width=12 * S)
    # tabiques (los huecos son las puertas)
    for seg in ((x0, 385, 400, 385), (480, 385, 640, 385), (720, 385, x1, 385),
                (560, y0, 560, 285), (560, 365, 560, y1), (770, 385, 770, y1)):
        d.line(R(*seg), fill=wall, width=8 * S)
    # puertas: hoja = ancho del hueco, arco dentro de una sola estancia
    for (hx, hy, lx, ly, a0, a1) in ((560, 285, 640, 285, 0, 90),      # entre las dos de arriba
                                     (400, 385, 400, 305, 270, 360),   # arriba-izquierda / abajo
                                     (720, 385, 720, 465, 90, 180)):   # estancia central inferior
        d.line(R(hx, hy, lx, ly), fill=thin, width=3 * S)
        d.arc(R(hx - 80, hy - 80, hx + 80, hy + 80), a0, a1, fill=thin, width=3 * S)
    d.rectangle(R(630, y0 - 7, 730, y0 + 7), fill=rgba(CYAN))       # ventana
    # cotas
    c = rgba(CYAN)
    f = mono(22)

    def tick(x, y, vertical):
        d.line(R(x - 8, y + 8, x + 8, y - 8), fill=c, width=3 * S)
        if vertical:
            d.line(R(x - 14, y, x + 14, y), fill=c, width=2 * S)
        else:
            d.line(R(x, y - 14, x, y + 14), fill=c, width=2 * S)

    def label(x, y, text):
        tw = d.textlength(text, font=f) / S
        d.rectangle(R(x - tw / 2 - 8, y - 14, x + tw / 2 + 8, y + 14), fill=rgba(BG))
        d.text((x * S, y * S), text, font=f, fill=c, anchor="mm")

    def cota_h(xa, xb, y, text):
        d.line(R(xa, y, xb, y), fill=c, width=3 * S)
        tick(xa, y, False)
        tick(xb, y, False)
        label((xa + xb) / 2, y, text)

    def cota_v(ya, yb, x, text):
        d.line(R(x, ya, x, yb), fill=c, width=3 * S)
        tick(x, ya, True)
        tick(x, yb, True)
        label(x, (ya + yb) / 2, text)

    cota_h(x0, x1, y0 - 48, "12.40")
    cota_h(x0, 560, y1 + 44, "5.20")
    cota_h(560, x1, y1 + 44, "7.20")
    cota_v(y0, y1, x0 - 56, "6.40")
    for x in (x0, x1):
        dashed(d, (x, y0 - 62), (x, y0 - 14), rgba(CYAN, 140), 2 * S, 6, 6)
    return Image.alpha_composite(im, layer)


def m_rugby(im, ball=True):
    """Campo con mapa de calor de carga (ACWR) en isolíneas."""
    x0, y0, x1, y1 = 190, 160, 1010, 570
    w, h = x1 - x0, y1 - y0
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    heat = np.zeros((H, W), np.float32)
    spots = [(.30, .38, .85), (.52, .60, 1.0), (.70, .30, .8), (.40, .74, .55),
             (.83, .62, .6), (.17, .60, .5), (.62, .46, .55), (.24, .20, .35), (.88, .22, .4)]
    r = 0.075 * w * S
    for u, v, k in spots:
        cx, cy = (x0 + u * w) * S, (y0 + v * h) * S
        heat += k * np.exp(-((xx - cx) ** 2 + (yy - cy) ** 2) / (2 * r * r))
    heat = np.floor(heat / heat.max() * 6) / 6                       # bandas
    heat = np.asarray(Image.fromarray((heat * 255).astype(np.uint8))
                      .filter(ImageFilter.GaussianBlur(1.5 * S))).astype(np.float32) / 255
    color = ramp(heat, [(0, INDIGO), (.45, VIOLET), (.75, MAGENTA), (1, (255, 214, 240))])
    alpha = np.where(heat > 0.1, 90 + heat * 150, 0).astype(np.float32)
    mask = Image.new("L", (W, H), 0)
    ImageDraw.Draw(mask).rounded_rectangle(R(x0, y0, x1, y1), radius=18 * S, fill=255)
    alpha *= np.asarray(mask, np.float32) / 255
    im = Image.alpha_composite(im, Image.fromarray(np.dstack([color, alpha]).astype(np.uint8), "RGBA"))

    layer, d = new_layer()
    line = rgba(LAV, 150)
    d.rounded_rectangle(R(x0, y0, x1, y1), radius=18 * S, outline=line, width=4 * S)
    ingoal = w * 0.07
    fx0, fx1 = x0 + ingoal, x1 - ingoal
    fw = fx1 - fx0
    for x in (fx0, fx1):                                               # líneas de ensayo
        d.line(R(x, y0, x, y1), fill=line, width=4 * S)
    for t in (0.22, 0.5, 0.78):                                       # 22 y medio campo
        d.line(R(fx0 + fw * t, y0, fx0 + fw * t, y1), fill=line, width=(6 if t == .5 else 4) * S)
    for t in (0.40, 0.60):                                            # 10 m
        dashed(d, (fx0 + fw * t, y0 + 10), (fx0 + fw * t, y1 - 10), rgba(LAV, 110), 3 * S, 16, 18)
    for v in (0.08, 0.22, 0.78, 0.92):                                # 5 y 15 m
        dashed(d, (fx0 + 20, y0 + h * v), (fx1 - 20, y0 + h * v), rgba(LAV, 90), 3 * S, 14, 32)
    im = Image.alpha_composite(im, layer)

    if ball:
        layer, d = new_layer()
        bx, by, rx, ry = x0 + w * 0.52, y0 + h * 0.58, 92, 54
        d.ellipse(R(bx - rx, by - ry, bx + rx, by + ry), fill=rgba(WHITE))
        d.ellipse(R(bx - rx, by - ry * 0.42, bx + rx, by + ry * 0.42),
                  outline=rgba(LAV), width=4 * S)                     # costuras de los paneles
        d.line(R(bx - 44, by, bx + 44, by), fill=rgba(BG), width=6 * S)  # línea del logo
        layer = layer.rotate(28, center=(bx * S, by * S), resample=Image.BICUBIC)
        im = drop_shadow(im, layer, blur=12, strength=0.5)
        im = Image.alpha_composite(im, layer)
    return im


def m_infra(im):
    """Cloudflare -> nginx -> 16 contenedores, con el origen cerrado."""
    cloud, d = new_layer()
    for cx, cy, r in ((268, 380, 50), (312, 350, 62), (356, 382, 46)):
        d.ellipse(R(cx - r, cy - r, cx + r, cy + r), fill=rgba(CYAN))
    d.rectangle(R(230, 382, 392, 420), fill=rgba(CYAN))
    flat = Image.new("L", (W, H), 0)
    ImageDraw.Draw(flat).rectangle(R(0, 0, 1200, 420), fill=255)    # base plana
    cloud.putalpha(Image.fromarray(np.minimum(np.asarray(cloud.split()[3]), np.asarray(flat))))
    im = Image.alpha_composite(im, cloud)

    layer, d = new_layer()
    ng = (520, 365)
    gx0, gy0, cs, gp = 700, 215, 62, 18
    cells = [(gx0 + c * (cs + gp), gy0 + r * (cs + gp)) for r in range(4) for c in range(4)]
    d.line(R(392, ng[1], ng[0] - 58, ng[1]), fill=rgba(CYAN, 230), width=6 * S)
    for x, y in (cells[i] for i in (0, 4, 8, 12)):
        d.line(R(ng[0] + 58, ng[1], x, y + cs / 2), fill=rgba(LAV, 150), width=3 * S)
    hexagon = [(ng[0] + 60 * math.cos(math.pi / 3 * k), ng[1] + 60 * math.sin(math.pi / 3 * k)) for k in range(6)]
    inner = [(ng[0] + 30 * math.cos(math.pi / 3 * k), ng[1] + 30 * math.sin(math.pi / 3 * k)) for k in range(6)]
    d.polygon(P(hexagon), fill=rgba(VIOLET))
    d.polygon(P(inner), outline=rgba(WHITE, 230), width=5 * S)
    for i, (x, y) in enumerate(cells):
        hot = i in (1, 6, 11, 13)
        d.rounded_rectangle(R(x, y, x + cs, y + cs), radius=12 * S,
                            fill=rgba(LAV, 235) if hot else rgba(INDIGO, 200))
        d.ellipse(R(x + 12, y + 12, x + 24, y + 24), fill=rgba(BG if hot else CYAN))
    px = (392 + ng[0] - 58) / 2                                       # paquete en tránsito
    d.ellipse(R(px - 9, ng[1] - 9, px + 9, ng[1] + 9), fill=rgba(WHITE))
    dashed(d, (630, 180), (630, 560), rgba(LAV, 120), 3 * S, 12, 10)  # origen cerrado
    return Image.alpha_composite(im, layer)


def m_admin(im):
    """Teselas de tenants conectadas a una BD central."""
    layer, d = new_layer()
    cx, cy = 600, 365
    tiles = []
    for k in range(6):
        a = math.radians(-60 + 60 * k)
        tiles.append((cx + 280 * math.cos(a), cy + 189 * math.sin(a)))
    for i, (x, y) in enumerate(tiles):
        hot = i == 1
        d.line(R(cx, cy, x, y), fill=rgba(LAV, 255 if hot else 130), width=(5 if hot else 3) * S)
        mx, my = (cx + x) / 2, (cy + y) / 2
        d.ellipse(R(mx - 6, my - 6, mx + 6, my + 6), fill=rgba(LAV, 220))
    for i, (x, y) in enumerate(tiles):
        hot = i == 1
        tw, th = 124, 92
        d.rounded_rectangle(R(x - tw / 2, y - th / 2, x + tw / 2, y + th / 2), radius=16 * S,
                            fill=rgba(MAGENTA) if hot else rgba(INDIGO, 225))
        d.rounded_rectangle(R(x - tw / 2 + 14, y - th / 2 + 14, x - tw / 2 + 38, y + th / 2 - 14),
                            radius=6 * S, fill=rgba(BG, 170))
        for j in range(3):
            d.rounded_rectangle(R(x - tw / 2 + 50, y - th / 2 + 18 + j * 20,
                                  x + tw / 2 - 14 - j * 18, y - th / 2 + 28 + j * 20),
                                radius=5 * S, fill=rgba(WHITE, 200 if hot else 140))
    d.ellipse(R(cx - 112, cy - 112, cx + 112, cy + 112), fill=rgba(VIOLET, 40))
    d.ellipse(R(cx - 88, cy - 88, cx + 88, cy + 88), fill=rgba(VIOLET), outline=rgba(LAV), width=4 * S)
    # cilindro de base de datos: cuerpo, tapa elíptica y dos aros
    bw, top, bot, ery = 44, cy - 42, cy + 42, 15
    d.ellipse(R(cx - bw, bot - ery, cx + bw, bot + ery), fill=rgba(WHITE))
    d.rectangle(R(cx - bw, top, cx + bw, bot), fill=rgba(WHITE))
    for yb in (cy - 14, cy + 14):
        d.arc(R(cx - bw, yb - ery, cx + bw, yb + ery), 0, 180, fill=rgba(VIOLET), width=4 * S)
    d.ellipse(R(cx - bw, top - ery, cx + bw, top + ery), fill=rgba(LAV), outline=rgba(WHITE), width=3 * S)
    return Image.alpha_composite(im, layer)


def m_educa(im):
    """Formas Montessori: arcoíris apilable y torre rosa."""
    layer, d = new_layer()
    base = 525
    arc_cx, tower_cx = 510, 865             # conjunto (460 + 70 + 110 px) centrado en x=600
    for i, col in enumerate((MAGENTA, PINK, VIOLET, INDIGO, CYAN)):
        ro = 230 - i * 40
        ri = ro - 34
        d.pieslice(R(arc_cx - ro, base - ro, arc_cx + ro, base + ro), 180, 360, fill=rgba(col))
        d.pieslice(R(arc_cx - ri, base - ri, arc_cx + ri, base + ri), 180, 360, fill=rgba(BG))
    d.pieslice(R(arc_cx - 26, base - 26, arc_cx + 26, base + 26), 180, 360, fill=rgba(LAV))
    y = base
    for i, side in enumerate((96, 78, 62, 48, 36)):
        col = MAGENTA if i % 2 == 0 else PINK
        d.rounded_rectangle(R(tower_cx - side / 2, y - side, tower_cx + side / 2, y),
                            radius=8 * S, fill=rgba(col))
        y -= side + 8
    d.line(R(250, base + 4, 950, base + 4), fill=rgba(LAV, 160), width=4 * S)
    return Image.alpha_composite(im, layer)


def draw_tile(d, x, y, ts, base, base_alpha):
    """Azulejo hidráulico: cuartos de círculo en las esquinas y rombo central."""
    d.rectangle(R(x, y, x + ts, y + ts), fill=rgba(base, base_alpha))
    for qx, qy, a0 in ((x, y, 0), (x + ts, y, 90), (x + ts, y + ts, 180), (x, y + ts, 270)):
        d.pieslice(R(qx - ts / 2, qy - ts / 2, qx + ts / 2, qy + ts / 2), a0, a0 + 90, fill=rgba(CYAN, 175))
        d.pieslice(R(qx - ts / 4, qy - ts / 4, qx + ts / 4, qy + ts / 4), a0, a0 + 90, fill=rgba(JOINT))
    m = ts / 2
    k = ts * 0.24
    d.polygon(P([(x + m, y + m - k), (x + m + k, y + m), (x + m, y + m + k), (x + m - k, y + m)]), fill=rgba(LAV))
    d.ellipse(R(x + m - 8, y + m - 8, x + m + 8, y + m + 8), fill=rgba(MAGENTA))


def m_tiles(im):
    """Pared alicatada con un hueco y una pieza colocándose."""
    ts, cols, rows = 124, 6, 3
    gx, gy = 600 - cols * ts / 2, 365 - rows * ts / 2
    empty = {(0, 4), (0, 5), (1, 5)}
    wall, d = new_layer()
    for r in range(rows):
        for c in range(cols):
            if (r, c) not in empty:
                draw_tile(d, gx + c * ts, gy + r * ts, ts, INDIGO if (r + c) % 2 else VIOLET, 110)
    for c in range(cols + 1):
        d.line(R(gx + c * ts, gy, gx + c * ts, gy + rows * ts), fill=rgba(BG), width=5 * S)
    for r in range(rows + 1):
        d.line(R(gx, gy + r * ts, gx + cols * ts, gy + r * ts), fill=rgba(BG), width=5 * S)
    for r, c in empty:                                                # hueco: solo la marca
        d.rectangle(R(gx + c * ts, gy + r * ts, gx + (c + 1) * ts, gy + (r + 1) * ts), fill=(0, 0, 0, 0))
        d.rectangle(R(gx + c * ts + 6, gy + r * ts + 6, gx + (c + 1) * ts - 6, gy + (r + 1) * ts - 6),
                    outline=rgba(LAV, 120), width=2 * S)
    im = Image.alpha_composite(im, wall)

    piece, d = new_layer()
    px, py = gx + 5 * ts + 8, gy - 6
    d.rectangle(R(px, py, px + ts, py + ts), fill=rgba(BG))          # pieza opaca
    draw_tile(d, px, py, ts, VIOLET, 110)
    piece = piece.rotate(-12, center=((px + ts / 2) * S, (py + ts / 2) * S), resample=Image.BICUBIC)
    im = drop_shadow(im, piece, blur=14, strength=0.6)
    return Image.alpha_composite(im, piece)


def shirt(dx=0.0, dy=0.0, scale=0.92):
    """Silueta de camiseta con cuello redondo."""
    outline = [(670, 190), (800, 240), (840, 330), (760, 360), (745, 330), (745, 560),
               (455, 560), (455, 330), (440, 360), (360, 330), (400, 240), (530, 190)]
    neck = [(600 - 70 * math.cos(math.radians(a)), 190 + 46 * math.sin(math.radians(a)))
            for a in range(10, 171, 10)]
    return [((x - 600) * scale + 600 + dx, (y - 375) * scale + 375 + dy) for x, y in outline + neck]


def m_saho(im):
    """Prenda con capas de color y un diseño seleccionado en el editor."""
    layer, d = new_layer()
    d.polygon(P(shirt(-34, 18)), fill=rgba(INDIGO, 230))
    d.polygon(P(shirt(34, 10)), fill=rgba(MAGENTA, 220))
    im = Image.alpha_composite(im, layer)
    layer, d = new_layer()
    d.polygon(P(shirt()), fill=rgba(LAV))
    px0, py0, px1, py1 = 520, 300, 680, 450
    for r in range(4):
        for c in range(4):
            x, y = px0 + 20 + c * 40, py0 + 18 + r * 38
            d.ellipse(R(x - 13, y - 13, x + 13, y + 13), fill=rgba((VIOLET, MAGENTA, INDIGO, CYAN)[(r + c) % 4]))
    sx0, sy0, sx1, sy1 = px0 - 16, py0 - 18, px1 - 4, py1 + 4
    corners = [(sx0, sy0), (sx1, sy0), (sx1, sy1), (sx0, sy1)]
    for a, b in zip(corners, corners[1:] + corners[:1]):
        dashed(d, a, b, rgba(CYAN), 3 * S, 10, 7)
    for hx, hy in corners:
        d.rectangle(R(hx - 9, hy - 9, hx + 9, hy + 9), fill=rgba(WHITE), outline=rgba(CYAN), width=3 * S)
    mid = (sx0 + sx1) / 2
    d.line(R(mid, sy0 - 28, mid, sy0), fill=rgba(CYAN), width=3 * S)
    d.ellipse(R(mid - 8, sy0 - 44, mid + 8, sy0 - 28), fill=rgba(WHITE), outline=rgba(CYAN), width=3 * S)
    for i, col in enumerate((MAGENTA, VIOLET, INDIGO, CYAN)):           # capas
        y = 230 + i * 58
        d.rounded_rectangle(R(880, y, 936, y + 44), radius=10 * S, fill=rgba(col),
                            outline=rgba(WHITE) if i == 0 else None, width=3 * S)
    return Image.alpha_composite(im, layer)


def m_prio(im):
    """Matriz 2x2 de prioridades (impacto x urgencia) con tareas como puntos."""
    layer, d = new_layer()
    x0, y0, x1, y1 = 360, 180, 840, 560
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    d.rounded_rectangle(R(mx, y0, x1, my), radius=14 * S, fill=rgba(MAGENTA, 70))
    d.rounded_rectangle(R(x0, y0, mx, my), radius=14 * S, fill=rgba(VIOLET, 45))
    d.rounded_rectangle(R(mx, my, x1, y1), radius=14 * S, fill=rgba(INDIGO, 45))
    axis = rgba(LAV, 200)
    d.line(R(x0, my, x1 + 30, my), fill=axis, width=4 * S)
    d.line(R(mx, y1, mx, y0 - 30), fill=axis, width=4 * S)
    d.polygon(P([(x1 + 40, my), (x1 + 22, my - 10), (x1 + 22, my + 10)]), fill=axis)
    d.polygon(P([(mx, y0 - 40), (mx - 10, y0 - 22), (mx + 10, y0 - 22)]), fill=axis)
    colors = {1: rgba(MAGENTA), 2: rgba(VIOLET), 3: rgba(INDIGO), 0: rgba(LAV, 120)}
    points = [(.78, .18, 30, 1), (.66, .30, 22, 1), (.88, .38, 18, 1), (.70, .10, 14, 1),
              (.25, .22, 18, 2), (.38, .35, 14, 2), (.12, .40, 11, 2),
              (.72, .70, 16, 3), (.60, .85, 12, 3), (.85, .62, 10, 3),
              (.20, .75, 10, 0), (.35, .88, 8, 0), (.10, .62, 8, 0)]
    for u, v, r, q in points:
        x, y = x0 + u * (x1 - x0), y0 + v * (y1 - y0)
        if q == 1:
            d.ellipse(R(x - r - 10, y - r - 10, x + r + 10, y + r + 10), outline=rgba(MAGENTA, 120), width=3 * S)
        d.ellipse(R(x - r, y - r, x + r, y + r), fill=colors[q])
    return Image.alpha_composite(im, layer)


PROJECTS = [  # slug, título corto, acento del halo, motivo
    ("mivia-obras", "Mivia Obras", CYAN, m_obras),
    ("rugbytrack", "Rugbytrack", MAGENTA, m_rugby),
    ("infraestructura", "Infraestructura", INDIGO, m_infra),
    ("admin-panel", "Admin Panel", VIOLET, m_admin),
    ("educabea", "EducaBea", MAGENTA, m_educa),
    ("alicatados-jr", "Alicatados JR", CYAN, m_tiles),
    ("creative-lav-saho", "Creative Lav Saho", MAGENTA, m_saho),
    ("freelance-priority-viz", "Priority Viz", LAV, m_prio),
]


def render(title, accent, motif):
    im = motif(background(accent))
    d = ImageDraw.Draw(im)
    d.text((1080 * S, 96 * S), "</>", font=mono(30), fill=rgba(LAV, 200), anchor="ra")   # firma
    size = TITLE_PX
    font = ImageFont.truetype(TITLE_FONT, size * S)
    while d.textlength(title, font=font) > TITLE_MAX_W * S:
        size -= 4
        font = ImageFont.truetype(TITLE_FONT, size * S)
    d.text((600 * S, 705 * S), title, font=font, fill=rgba(WHITE), anchor="mm")
    return grain(im.convert("RGB").resize((1200, 900), Image.LANCZOS))


def save(img, path):
    img.save(path, "WEBP", quality=80, method=6)
    kb = os.path.getsize(path) / 1024
    assert img.size == (1200, 900) and kb <= 200, f"{path}: {img.size}, {kb:.0f} KB"
    print(f"{os.path.basename(path):30s} {kb:5.0f} KB")


def main():
    out = os.path.join(HERE, "proyectos-img")
    os.makedirs(out, exist_ok=True)
    thumbs = []
    for slug, title, accent, motif in PROJECTS:
        img = render(title, accent, motif)
        save(img, os.path.join(out, slug + ".webp"))
        thumbs.append(img.resize((345, 259), Image.LANCZOS))
    if "--sin-balon" in sys.argv:
        save(render("Rugbytrack", MAGENTA, lambda im: m_rugby(im, ball=False)),
             os.path.join(out, "rugbytrack-sin-balon.webp"))
    sheet = Image.new("RGB", (4 * 345 + 5 * 16, 2 * 259 + 3 * 16), (236, 236, 240))
    for i, t in enumerate(thumbs):
        sheet.paste(t, (16 + (i % 4) * 361, 16 + (i // 4) * 275))
    sheet.save(os.path.join(HERE, "preview-345.png"))


if __name__ == "__main__":
    main()
