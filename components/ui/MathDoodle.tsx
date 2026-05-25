"use client";

const MATH = [
    "θ ← θ - α∇L(θ)",
    "Attention = softmax(QKᵀ/√d)·V",
    "BLEU = BP·exp(Σwₙlog pₙ)",
    "S = (Rₚ-Rƒ)/σₚ",
    "∂L/∂w = δ·xᵀ",
    "KL(P‖Q) = Σ P log(P/Q)",
    "x_{t} = √ᾱ·x₀ + √(1-ᾱ)·ε",
    "E[Rₚ] = Σ wᵢμᵢ",
    "∇²f(x) ≻ 0",
    "P(A|B) = P(B|A)·P(A)/P(B)",
    "σ(x) = 1/(1+e⁻ˣ)",
    "Var(Rₚ) = wᵀΣw",
];

// Deterministic positions to avoid hydration errors
const POSITIONS = [
    { top: "8%",  left: "2%",  rot: -12 },
    { top: "18%", left: "78%", rot: 8  },
    { top: "32%", left: "5%",  rot: -6 },
    { top: "44%", left: "82%", rot: 14 },
    { top: "57%", left: "3%",  rot: -9 },
    { top: "67%", left: "75%", rot: 7  },
    { top: "76%", left: "8%",  rot: -14 },
    { top: "85%", left: "70%", rot: 5  },
    { top: "22%", left: "88%", rot: -8 },
    { top: "50%", left: "88%", rot: 11 },
    { top: "12%", left: "60%", rot: -4 },
    { top: "90%", left: "15%", rot: 9  },
];

interface Props {
    count?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function MathDoodle({ count = 8, className = "", style }: Props) {
    const items = MATH.slice(0, Math.min(count, MATH.length));
    const positions = POSITIONS.slice(0, items.length);

    return (
        <div
            className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}
            aria-hidden="true"
            style={style}
        >
            {items.map((eq, i) => {
                const pos = positions[i % positions.length];
                return (
                    <span
                        key={i}
                        className="math-doodle"
                        style={{
                            top: pos.top,
                            left: pos.left,
                            transform: `rotate(${pos.rot}deg)`,
                            fontSize: "0.68rem",
                        }}
                    >
                        {eq}
                    </span>
                );
            })}
        </div>
    );
}
