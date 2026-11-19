export function createSpring(position = 0) {
  let velocity = 0;

  return {
    step(target: number) {
      velocity = (velocity + (target - position) * 0.16) * 0.72;
      position += velocity;

      if (Math.abs(target - position) < 0.05 && Math.abs(velocity) < 0.05) {
        position = target;
        velocity = 0;
      }

      return position;
    },
  };
}
