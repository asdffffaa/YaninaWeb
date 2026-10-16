export const STEP_COUNT = 4;
export const AUTO_STEP_MS = 5000;
export const MANUAL_STEP_MS = AUTO_STEP_MS;
export type StepTimeline = {
  step: number;
  elapsed: number;
  duration: number;
};
export function selectStep(step: number): StepTimeline {
  return {
    step: Math.max(0, Math.min(STEP_COUNT - 1, step)),
    elapsed: 0,
    duration: MANUAL_STEP_MS,
  };
}
export function advanceStep(timeline: StepTimeline, delta: number): void {
  timeline.elapsed += Math.max(0, delta);
  while (timeline.elapsed >= timeline.duration) {
    timeline.elapsed -= timeline.duration;
    timeline.step = (timeline.step + 1) % STEP_COUNT;
    timeline.duration = AUTO_STEP_MS;
  }
}
export function stepProgress(
  timeline: StepTimeline,
  width = 402,
  padding = 32,
  circle = 58,
): number {
  // Animate only the visible gap between circle edges, not beneath the circles.
  const stride = (width - padding * 2 - circle) / (STEP_COUNT - 1);
  const start = (padding + circle + timeline.step * stride) / width;
  const end =
    timeline.step === STEP_COUNT - 1 ? 1 : (padding + (timeline.step + 1) * stride) / width;
  return start + (end - start) * Math.min(1, timeline.elapsed / timeline.duration);
}
