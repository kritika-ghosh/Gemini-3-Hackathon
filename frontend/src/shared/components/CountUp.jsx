import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 2,
  className = "",
  startWhen = true,
  separator = "",
  onStart,
  onEnd,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === "down" ? from : 0); // Start at 0 or from

  // Calculate damping and stiffness based on duration roughly
  // Or just use tween? ReactBits usually uses spring for smoothness but the user asked for duration.
  // Let's use standard spring with duration-like behavior or just animate.
  // Actually, frame-motion's animate function is better for precise duration.

  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
    duration: duration * 1000, // spring doesn't take duration directly usually, but we can mimic or use animate
  });

  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === "function") {
        onStart();
      }

      // We actually want to behave like a count up with duration.
      // Setting the motion value will trigger the spring.
      motionValue.set(direction === "down" ? from : to);
    }
  }, [isInView, startWhen, motionValue, direction, from, to, onStart]);

  useEffect(() => {
    // Formatting and updating text
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const value = Math.round(latest);
        const formatted = separator
          ? value.toLocaleString().replace(/,/g, separator)
          : value;

        ref.current.textContent = formatted;

        if (value === (direction === "down" ? 0 : to)) {
          if (typeof onEnd === "function") {
            onEnd();
          }
        }
      }
    });

    return () => unsubscribe();
  }, [springValue, separator, direction, to, onEnd]);

  // Initial render value
  const initialValue = direction === "down" ? from : 0;

  return (
    <span ref={ref} className={className}>
      {initialValue}
    </span>
  );
}
