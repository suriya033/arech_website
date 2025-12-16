"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
    useEffect(() => {
        const reveals = document.querySelectorAll(".reveal");

        function revealOnScroll() {
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            reveals.forEach((el) => {
                const revealTop = el.getBoundingClientRect().top;

                if (revealTop < windowHeight - revealPoint) {
                    el.classList.add("active");
                }
            });
        }

        window.addEventListener("scroll", revealOnScroll);
        // Trigger once on mount to check initial state
        revealOnScroll();

        return () => {
            window.removeEventListener("scroll", revealOnScroll);
        };
    }, []);

    return null;
}
