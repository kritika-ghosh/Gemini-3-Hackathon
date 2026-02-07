import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FeatureCard = ({ index, title, subtext, visual }) => {
  // Even index = Text Left, Visual Right
  // Odd index = Visual Left, Text Right (reverse)
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "flex flex-col gap-12 lg:gap-24 items-center w-full max-w-7xl mx-auto",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse",
      )}
    >
      {/* Text Content */}
      <div className="flex-1 w-full flex flex-col items-start gap-6 text-left">
        <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          Feature {index + 1}
        </span>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
          {title}
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {subtext}
        </p>
      </div>

      {/* Visual Content */}
      <div className="flex-1 w-full">
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-md shadow-2xl ring-1 ring-black/5 dark:ring-white/5">
          {/* Visual Placeholder or Component */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            {visual}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;
