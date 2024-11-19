'use client'
import { ComponentProps, useEffect, useRef, useState } from "react";

function AnimatedIn ({ children, className, ...props }: ComponentProps<'div'>) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null!);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current); // Deja de observar una vez que se hace visible
        }
      },
      { threshold: 0.3 } // Puedes ajustar el threshold para que se active antes o después
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      {...props}
      className={`
        transition-all duration-500 ease-in-out transform
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}
        ${className}
        `}
    >
      {children}
    </div>
  );
}

export default AnimatedIn;
