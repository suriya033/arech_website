"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                }
            });
        }, observerOptions);

        const selectors = '.reveal, .reveal-left, .reveal-right, .scale-in, .stagger-container';

        // Initial observation
        const revealElements = document.querySelectorAll(selectors);
        revealElements.forEach(el => observer.observe(el));

        // Watch for new elements added to the DOM
        const mutationObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check if the node itself matches
                        if (node.matches(selectors)) {
                            observer.observe(node);
                        }
                        // Check children
                        node.querySelectorAll(selectors).forEach(el => observer.observe(el));
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    return null;
}
