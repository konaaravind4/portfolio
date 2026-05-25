interface Props {
    name: string;
    emoji?: string;
    color: string;        // background hex
    rotation?: number;    // degrees
    size?: "sm" | "md" | "lg";
}

export default function TechSticker({ name, emoji, color, rotation = 0, size = "md" }: Props) {
    const sizes = {
        sm: { fontSize: "0.8rem",  padding: "0.2rem 0.55rem" },
        md: { fontSize: "0.95rem", padding: "0.3rem 0.75rem" },
        lg: { fontSize: "1.1rem",  padding: "0.4rem 0.9rem"  },
    };

    // Determine text color based on background luminance
    const hex = color.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.6 ? "#1e1b4b" : "#ffffff";

    return (
        <span
            className="sticker"
            style={{
                background: color,
                color: textColor,
                transform: `rotate(${rotation}deg)`,
                fontSize: sizes[size].fontSize,
                padding: sizes[size].padding,
            }}
        >
            {emoji && <span aria-hidden="true">{emoji}</span>}
            {name}
        </span>
    );
}
