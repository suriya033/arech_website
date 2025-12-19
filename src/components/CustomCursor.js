"use client";

import { useEffect, useState } from "react";
import styles from "./CustomCursor.module.css";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    useEffect(() => {
        if (isTouch) return;
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === "A" ||
                target.tagName === "BUTTON" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("clickable")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [isVisible]);

    if (!isVisible || isTouch) return null;

    return (
        <>
            <div
                className={`${styles.cursor} ${isHovering ? styles.hover : ""}`}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                }}
            />
            <div
                className={`${styles.cursorFollower} ${isHovering ? styles.hover : ""}`}
                style={{
                    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                }}
            />
        </>
    );
}
