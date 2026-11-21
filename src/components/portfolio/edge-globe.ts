import land from "./globe-land.json";

type Point = [number, number, number];
export type City = { name: string; latitude: number; longitude: number };
export type Route = [number, number];

const routeLift = 0.15;
const markerClearance = 13;
const radians = Math.PI / 180;
const vector = (latitude: number, longitude: number): Point => {
  const lat = latitude * radians;
  const lon = longitude * radians;
  return [Math.cos(lat) * Math.sin(lon), Math.sin(lat), Math.cos(lat) * Math.cos(lon)];
};
// Land samples from Natural Earth 1:110m land polygons (public domain).
const landPoints = land.map(([lat, lon]) => vector(lat, lon));

class EdgeGlobe extends HTMLElement {
  private cleanup?: () => void;

  connectedCallback() {
    const canvas = this.querySelector("canvas");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { cities, routes, speed, tilt, longitude } = JSON.parse(this.dataset.config!) as {
      cities: City[]; routes: Route[]; speed: number; tilt: number; longitude: number;
    };
    const markers = cities.map(({ latitude, longitude }) => vector(latitude, longitude));
    const arcs = routes.flatMap(([from, to]) => {
      const a = markers[from];
      const b = markers[to];
      if (!a || !b) return [];
      const angle = Math.acos(Math.max(-1, Math.min(1, a.reduce((sum, v, i) => sum + v * b[i], 0))));
      if (angle < 0.001 || Math.PI - angle < 0.001) return [];
      return [Array.from({ length: 65 }, (_, i): Point => {
        const t = i / 64;
        const lift = 1 + routeLift * Math.sin(Math.PI * t);
        const start = Math.sin((1 - t) * angle) / Math.sin(angle);
        const end = Math.sin(t * angle) / Math.sin(angle);
        return [0, 1, 2].map(j => lift * (a[j] * start + b[j] * end)) as Point;
      })];
    });

    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const controller = new AbortController();
    const { signal } = controller;
    let rotation = -longitude * radians;
    let pitch = tilt * radians;
    let size = 0;
    let visible = false;
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let pointer: number | undefined;
    let lastMove = 0;
    let lastX = 0;
    let lastY = 0;
    let velocity = 0;

    const draw = () => {
      if (!size) return;
      const scale = devicePixelRatio || 1;
      const pixels = Math.round(size * scale);
      if (canvas.width !== pixels || canvas.height !== pixels) canvas.width = canvas.height = pixels;
      ctx.setTransform(pixels / size, 0, 0, pixels / size, 0, 0);
      ctx.clearRect(0, 0, size, size);

      const center = size / 2;
      const radius = Math.min(size / 2 - markerClearance, (size / 2 - 3) / (1 + routeLift));
      if (radius <= 0) return;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const up = Math.cos(pitch);
      const down = Math.sin(pitch);
      const project = ([x, y, z]: Point): Point => {
        const depth = z * cos - x * sin;
        return [center + radius * (x * cos + z * sin),
          center - radius * (y * up - depth * down), y * down + depth * up];
      };
      const circle = (x: number, y: number, r: number) => {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
      };

      circle(center, center, radius);
      ctx.fillStyle = "#15171b";
      ctx.fill();
      ctx.strokeStyle = "#363941";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.fillStyle = "#e0e3ea";
      for (const point of landPoints) {
        const [x, y, depth] = project(point);
        if (depth <= 0) continue;
        ctx.globalAlpha = 0.7 * Math.min(1, depth * 2);
        circle(x, y, 1);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      arcs.forEach((arc, index) => {
        const points = arc.map(project);
        const shown = ([x, y, depth]: Point) => depth >= 0 || Math.hypot(x - center, y - center) > radius;
        ctx.strokeStyle = "#2162b3";
        ctx.beginPath();
        let connected = false;
        for (const point of points) {
          const [x, y] = point;
          if (shown(point)) {
            if (connected) ctx.lineTo(x, y);
            else ctx.moveTo(x, y);
          }
          connected = shown(point);
        }
        ctx.stroke();
        const pulse = points[Math.floor(((elapsed + index * 0.47) % 3.8) * 52)];
        if (!motion.matches && pulse && shown(pulse)) {
          circle(pulse[0], pulse[1], 2.3);
          ctx.fillStyle = "#a9ddff";
          ctx.fill();
        }
      });

      markers.forEach((marker, index) => {
        const [x, y, depth] = project(marker);
        if (depth <= 0) return;
        circle(x, y, 3);
        ctx.fillStyle = "#3893ff";
        ctx.fill();
        const phase = motion.matches ? 0.35 : ((elapsed + index * 0.19) % 2.4) / 2.4;
        ctx.globalAlpha = (1 - phase) * 0.65;
        circle(x, y, 4 + phase * 8);
        ctx.strokeStyle = "#58a6ff";
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
    };

    const tick = (now: number) => {
      const dt = previous ? Math.min((now - previous) / 1000, 0.05) : 0;
      previous = now;
      elapsed += dt;
      if (pointer === undefined) {
        rotation += (speed * radians + velocity) * dt;
        velocity *= Math.exp(-3.5 * dt);
      }
      draw();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!visible || document.hidden) return;
      draw();
      if (!motion.matches) frame = requestAnimationFrame(tick);
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection.observe(this);
    const resize = new ResizeObserver(([entry]) => {
      size = entry.contentRect.width;
      if (visible) draw();
    });
    resize.observe(canvas);
    document.addEventListener("visibilitychange", sync, { signal });
    motion.addEventListener("change", sync, { signal });
    window.addEventListener("resize", sync, { signal });

    canvas.addEventListener("pointerdown", event => {
      if (pointer !== undefined || event.button !== 0) return;
      pointer = event.pointerId;
      lastMove = event.timeStamp;
      lastX = event.clientX;
      lastY = event.clientY;
      velocity = 0;
      canvas.setPointerCapture(pointer);
    }, { signal });
    canvas.addEventListener("pointermove", event => {
      if (event.pointerId !== pointer) return;
      const step = (event.clientX - lastX) * 0.009;
      velocity = Math.max(-8, Math.min(8, step * 1000 / Math.max(8, event.timeStamp - lastMove)));
      lastMove = event.timeStamp;
      rotation += step;
      pitch = Math.max(-1.4, Math.min(1.4, pitch - (event.clientY - lastY) * 0.009));
      lastX = event.clientX;
      lastY = event.clientY;
      draw();
    }, { signal });
    canvas.addEventListener("lostpointercapture", event => {
      if (event.pointerId !== pointer) return;
      if (event.timeStamp - lastMove > 90 || motion.matches) velocity = 0;
      pointer = undefined;
    }, { signal });
    canvas.addEventListener("keydown", event => {
      const direction = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: 1, ArrowDown: -1 }[event.key];
      if (!direction) return;
      event.preventDefault();
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") rotation += direction * 0.15;
      else pitch = Math.max(-1.4, Math.min(1.4, pitch + direction * 0.15));
      draw();
    }, { signal });
    this.cleanup = () => {
      controller.abort();
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
    };
  }

  disconnectedCallback() {
    this.cleanup?.();
  }
}

customElements.define("edge-globe", EdgeGlobe);

