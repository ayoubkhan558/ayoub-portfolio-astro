import Matter from "matter-js";

// Keep the simulation and physics dependency out of the initial About bundle.
export function startGravityLogos(stage: HTMLElement) {
  const pieces = [
    ...stage.querySelectorAll<HTMLElement>(".gravity-logos__piece"),
  ];
  const { Bodies, Composite, Constraint, Engine, Body, Sleeping } =
    Matter;
  const sizes = pieces.map((piece) => ({
    width: piece.offsetWidth,
    height: piece.offsetHeight,
  }));
  const engine = Engine.create({ enableSleeping: true });
  let frame = 0;
  let previous = 0;
  let width = 0;
  let height = 0;
  let bodies: ReturnType<typeof Bodies.rectangle>[] = [];
  let drag:
    | { pointerId: number; joint: ReturnType<typeof Constraint.create> }
    | undefined;
  const listeners = new AbortController();
  const { signal } = listeners;

  function render() {
    pieces.forEach((piece, index) => {
      const { position, angle } = bodies[index];
      const { width, height } = sizes[index];
      piece.style.transform = `translate(${position.x - width / 2}px, ${position.y - height / 2}px) rotate(${angle}rad)`;
    });
  }

  function tick(now: number) {
    const delta = previous
      ? Math.max(1, Math.min(1000 / 60, now - previous))
      : 1000 / 60;
    Engine.update(engine, delta);
    previous = now;
    render();
    frame =
      !drag && bodies.every((body) => body.isSleeping)
        ? 0
        : requestAnimationFrame(tick);
  }

  function release(pointerId?: number) {
    if (
      !drag ||
      (pointerId !== undefined && drag.pointerId !== pointerId)
    )
      return;
    const active = drag;
    drag = undefined;
    Composite.remove(engine.world, active.joint);
    stage.classList.remove("gravity-logos--dragging");
    if (stage.hasPointerCapture(active.pointerId)) {
      stage.releasePointerCapture(active.pointerId);
    }
  }

  function getPoint(event: PointerEvent) {
    const bounds = stage.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(width, event.clientX - bounds.left)),
      y: Math.max(0, Math.min(height, event.clientY - bounds.top)),
    };
  }

  stage.addEventListener(
    "pointerdown",
    (event) => {
      if (
        drag ||
        event.button !== 0 ||
        !(event.target instanceof Element)
      )
        return;
      const index = pieces.findIndex((piece) =>
        piece.contains(event.target as Node),
      );
      const body = bodies[index];
      if (!body) return;
      const pointA = getPoint(event);
      const joint = Constraint.create({
        pointA,
        bodyB: body,
        pointB: {
          x: pointA.x - body.position.x,
          y: pointA.y - body.position.y,
        },
        length: 0,
        stiffness: 0.22,
        damping: 0.16,
      });
      Sleeping.set(body, false);
      Composite.add(engine.world, joint);
      drag = { pointerId: event.pointerId, joint };
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("gravity-logos--dragging");
      if (!frame) {
        previous = 0;
        frame = requestAnimationFrame(tick);
      }
    },
    { signal },
  );

  stage.addEventListener(
    "pointermove",
    (event) => {
      if (drag?.pointerId === event.pointerId)
        drag.joint.pointA = getPoint(event);
    },
    { signal },
  );

  for (const type of [
    "pointerup",
    "pointercancel",
    "lostpointercapture",
  ] as const) {
    stage.addEventListener(type, (event) => release(event.pointerId), {
      signal,
    });
  }

  function reset([entry]: ResizeObserverEntry[]) {
    // Use the observed dimensions after the animated layout is applied.
    const size = entry.borderBoxSize?.[0];
    const nextWidth = size?.inlineSize ?? stage.clientWidth;
    const nextHeight = size?.blockSize ?? stage.clientHeight;
    if (!nextWidth || (width === nextWidth && height === nextHeight))
      return;
    width = nextWidth;
    height = nextHeight;

    release();
    cancelAnimationFrame(frame);
    Composite.clear(engine.world, false);
    Engine.clear(engine);
    // Drop successive layers into the center so pieces collide and pile up.
    const columns = Math.max(3, Math.min(7, Math.floor(width / 112)));
    const spread = Math.min(width * 0.75, 620);
    const walls = [
      Bodies.rectangle(width / 2, height + 48, width + 192, 96, {
        isStatic: true,
        friction: 0.8,
      }),
      Bodies.rectangle(-48, height / 2, 96, height + 1200, {
        isStatic: true,
      }),
      Bodies.rectangle(width + 48, height / 2, 96, height + 1200, {
        isStatic: true,
      }),
    ];
    bodies = pieces.map((_, index) => {
      const { width: pieceWidth, height: pieceHeight } = sizes[index];
      const lane = (index % columns) / (columns - 1) - 0.5;
      const x =
        width / 2 + lane * spread + (Math.random() - 0.5) * 12;
      const y =
        -pieceHeight / 2 -
        Math.floor(index / columns) * 66 -
        Math.random() * 14;
      const body = Bodies.rectangle(x, y, pieceWidth, pieceHeight, {
        restitution: 0.18,
        frictionAir: 0.018,
        friction: 0.55,
        chamfer: { radius: Math.min(16, pieceHeight / 3) },
        sleepThreshold: 50,
      });
      Body.setAngle(body, (Math.random() - 0.5) * 1.8);
      Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.2, y: 0 });
      Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.13);
      return body;
    });
    Composite.add(engine.world, [...walls, ...bodies]);
    render();
    previous = 0;
    frame = requestAnimationFrame(tick);
  }

  stage.classList.add("gravity-logos--running");
  const resize = new ResizeObserver(reset);
  resize.observe(stage);
  return () => {
    release();
    listeners.abort();
    cancelAnimationFrame(frame);
    resize.disconnect();
    Composite.clear(engine.world, false);
    Engine.clear(engine);
    stage.classList.remove("gravity-logos--running");
    pieces.forEach((piece) => piece.style.removeProperty("transform"));
  };
}
