import tools from "../../data/toolCatalog.json";

const emoji = ["✨", "⚡", "💡", "🚀", "🌐", "⌛", "🛠️", "👋"];

const skills = [
tools.html,
tools.css,
tools.javascript,
tools.typescript,
tools.figma,
tools.nextjs,
tools.graphql,
tools.redux,
tools["material-ui"],
tools.bootstrap,
tools.bulma,
tools.tailwind,
tools.gsap,
tools.swiperjs,
tools.accessibility,
tools.php,
tools["rest-api"],
tools.plyr,
tools.scrollreveal,
tools.jquery,
tools.postcss,
tools.sass,
tools.shopify,
tools.webflow,
tools.vite,
tools.vercel,
tools.git,
tools.npm,
tools.postman,
tools.json,
tools.seo,
tools["rank-math"],
tools["yoast-seo"],
tools["vs-code"],
tools.mysql,
tools.phpmyadmin,
tools["admin-columns-pro"],
tools.chaty,
tools["litespeed-cache"],
tools["meta-pixel"],
tools["microsoft-clarity"],
tools["bricks-builder"],
tools["advanced-custom-fields"],
tools["slim-seo"],
tools.seopress,
tools["fluent-smtp"],
tools["google-site-kit"],
tools.happyfiles,
tools.wordpress,
tools.woocommerce,
tools.elementor
].map((tool) => tool?.logo).filter((logo): logo is string => typeof logo === "string");

export function attachEmojiTrail(area: HTMLElement, motion: MediaQueryList) {
  const layer = area.querySelector<HTMLElement>(".emoji-trail");
  if (!layer) return;
  const useSkills = area.dataset.emojiTrail !== "emoji";
  const choices = useSkills ? skills : emoji;

  let origin: { left: number; top: number } | undefined;
  let lastX = 0;
  let lastY = 0;
  let lastTime = -Infinity;
  let previous = -1;
  area.addEventListener(
    "pointermove",
    (event) => {
      if (!motion.matches || event.pointerType !== "mouse") return;
      const now = performance.now();
      if (
        now - lastTime < 160 ||
        Math.hypot(event.clientX - lastX, event.clientY - lastY) < 80
      )
        return;
      lastX = event.clientX;
      lastY = event.clientY;
      lastTime = now;
      // Measure only on the first move of a hover, before adding sprites.
      if (!origin) {
        const bounds = layer.getBoundingClientRect();
        origin = { left: bounds.left + scrollX, top: bounds.top + scrollY };
      }
      const sprite = document.createElement("span");
      sprite.className = "emoji-trail__sprite";
      previous =
        (previous + 1 + Math.floor(Math.random() * (choices.length - 1))) %
        choices.length;
      if (useSkills) {
        const logo = new Image();
        logo.className = "emoji-trail__logo";
        logo.src = choices[previous];
        logo.alt = "";
        sprite.append(logo);
      } else {
        sprite.textContent = choices[previous];
      }
      sprite.style.left = `${event.pageX - origin.left}px`;
      sprite.style.top = `${event.pageY - origin.top}px`;
      layer.append(sprite);
      const drop = sprite.animate(
        [
          { opacity: 1, transform: "translate(-50%, -50%) rotate(-12deg)" },
          { opacity: 0, transform: "translate(-35%, 190%) rotate(24deg)" },
        ],
        { duration: 700, easing: "cubic-bezier(.35, .05, .8, .45)" },
      );
      const remove = () => sprite.remove();
      drop.finished.then(remove, remove);
    },
    { passive: true },
  );

  area.addEventListener("pointerleave", () => {
    lastTime = -Infinity;
    origin = undefined;
  });
  motion.addEventListener("change", () => {
    if (!motion.matches) layer.replaceChildren();
  });
}
