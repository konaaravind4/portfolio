export interface Project {
    slug: string;
    title: string;
    tagline: string;
    description: string;
    longDescription: string;
    techStack: string[];
    github: string;
    demo: string;
    /** 'codesandbox' | 'huggingface' | 'github-notebook' | 'video' | 'none' */
    demoType: string;
    demoContent: string;
    category: string;
    featured: boolean;
    metrics: { label: string; value: string; color?: string }[];
    architecture: string;
    problemStatement: string;
    mathModel?: string;
    screenshots: string[];
    tags: string[];
    date: string;
    codeSnippet?: string;
}

export const projects: Project[] = [
    {
        slug: "nepali-english-neural-translator",
        title: "Nepali-English Neural Translator",
        tagline: "Fine-tuned mT5 achieving BLEU 34.7 with 92% benchmark accuracy",
        description:
            "Fine-tuned google/mt5-small on a curated Nepali-English parallel corpus. Implemented custom tokenization, multilingual optimization, and inference acceleration to achieve state-of-the-art translation quality.",
        longDescription:
            "This project explores low-resource neural machine translation by fine-tuning Google's multilingual T5 (mT5-small) model on a Nepali-English parallel corpus. The training pipeline includes custom data augmentation, subword tokenization alignment, mixed-precision training, and BLEU-score guided early stopping. The final model achieves BLEU 34.7 and 92% accuracy on the benchmark dataset, outperforming baseline models by 18%.",
        techStack: ["Python", "HuggingFace Transformers", "PyTorch", "mT5", "SentencePiece", "NLTK", "Pandas", "WandB"],
        github: "https://github.com/konaaravind4/nepali-english-translator",
        demo: "https://huggingface.co/spaces/konaaravind4/nepali-translator",
        demoType: "huggingface",
        demoContent: "https://huggingface.co/spaces/konaaravind4/nepali-translator",
        category: "NLP",
        featured: true,
        metrics: [
            { label: "BLEU Score", value: "34.7", color: "cyan" },
            { label: "Benchmark Accuracy", value: "92%", color: "violet" },
            { label: "Baseline Improvement", value: "+18%", color: "blue" },
            { label: "Inference Latency", value: "120ms", color: "green" },
        ],
        architecture:
            "Encoder-Decoder Transformer (mT5-small) → SentencePiece Tokenizer → Cross-Attention Layers → Beam Search Decoder",
        problemStatement:
            "Nepali is a low-resource language with limited parallel training data. Standard NMT approaches underperform due to vocabulary misalignment and scarce annotated corpora.",
        mathModel:
            "\\mathcal{L} = -\\sum_{t=1}^{T} \\log P(y_t | y_{<t}, X; \\theta) \\quad \\text{BLEU} = BP \\cdot \\exp\\left(\\sum_{n=1}^{N} w_n \\log p_n\\right)",
        screenshots: [],
        tags: ["NLP", "ML", "Transformers", "Low-Resource"],
        date: "2025-01-15",
        codeSnippet: `from transformers import MT5ForConditionalGeneration, MT5Tokenizer

model = MT5ForConditionalGeneration.from_pretrained("konaaravind4/nepali-en-mt5")
tokenizer = MT5Tokenizer.from_pretrained("konaaravind4/nepali-en-mt5")

def translate(text: str) -> str:
    inputs = tokenizer(f"translate Nepali to English: {text}",
                       return_tensors="pt", max_length=512)
    output = model.generate(**inputs, num_beams=4, max_new_tokens=256)
    return tokenizer.decode(output[0], skip_special_tokens=True)

print(translate("मलाई खाना मन पर्छ"))
# → "I like food"`,
    },
    {
        slug: "whatsapp-appointment-bot",
        title: "WhatsApp Appointment Booking Bot",
        tagline: "Real-time salon booking automation with Apache Flink & A2A Systems",
        description:
            "An intelligent WhatsApp bot MVP that automates the end-to-end appointment booking process for salons. Built with Flask backend, Apache Flink for real-time stream processing, and Google A2A multi-agent orchestration.",
        longDescription:
            "This system replaces manual WhatsApp-based appointment scheduling with an AI-powered conversational agent. The bot understands natural language booking requests, checks real-time availability via Flink streams, confirms appointments, and sends reminders. The A2A (Agent-to-Agent) framework enables multi-step dialogue management with specialized sub-agents for intent parsing, availability checking, and confirmation flow.",
        techStack: ["Python", "Flask", "Apache Flink", "A2A Systems", "WhatsApp Business API", "Google Gemini", "Redis", "Docker"],
        github: "https://github.com/konaaravind4/whatsapp-appointment-bot",
        demo: "https://github.com/konaaravind4/whatsapp-appointment-bot",
        demoType: "github",
        demoContent: "https://github.com/konaaravind4/whatsapp-appointment-bot",
        category: "Multi-Agent",
        featured: true,
        metrics: [
            { label: "Booking Accuracy", value: "97.3%", color: "cyan" },
            { label: "Response Time", value: "<2s", color: "violet" },
            { label: "Concurrent Users", value: "500+", color: "blue" },
            { label: "Manual Work Reduced", value: "85%", color: "green" },
        ],
        architecture:
            "WhatsApp API → Flask Gateway → A2A Orchestrator → [Intent Agent | Availability Agent | Confirmation Agent] → Apache Flink Stream → Redis Cache → Response",
        problemStatement:
            "Salon owners waste 3–4 hours daily managing WhatsApp appointment requests manually, leading to double-bookings, missed clients, and operational inefficiency.",
        screenshots: [],
        tags: ["Multi-Agent", "A2A", "Real-time", "NLP"],
        date: "2024-12-10",
        codeSnippet: `from a2a import Agent, AgentExecutor
from google.adk.agents import LlmAgent

# Intent parsing sub-agent
intent_agent = LlmAgent(
    name="IntentAgent",
    model="gemini-2.0-flash",
    instruction="Extract appointment details: service, date, time, name.",
)

# Availability checker using Flink stream
@intent_agent.on_message
async def check_availability(ctx, slot: dict):
    stream = flink_client.query(
        f"SELECT * FROM slots WHERE date='{slot['date']}' AND free=true"
    )
    return await stream.first()`,
    },
    {
        slug: "stable-diffusion-image-pipeline",
        title: "Stable Diffusion Image Pipeline",
        tagline: "Prompt-conditioned image synthesis with SD 3.5 Large and custom preprocessing",
        description:
            "A production-grade image generation pipeline using Stability AI's Stable Diffusion 3.5 Large model. Implements prompt-conditioned diffusion sampling, inference optimization, and custom preprocessing for consistent high-quality outputs.",
        longDescription:
            "This pipeline wraps the stabilityai/stable-diffusion-3.5-large model with a custom inference engine featuring dynamic prompt engineering, negative prompt optimization, CFG scaling, and DDIM scheduler tuning. The system includes a REST API endpoint for batch generation, GPU memory optimization through attention slicing, and a quality scoring module using CLIP similarity scores.",
        techStack: ["Python", "PyTorch", "Diffusers", "Stable Diffusion 3.5", "CUDA", "xFormers", "FastAPI", "CLIP", "Hugging Face"],
        github: "https://github.com/konaaravind4/sd-image-pipeline",
        demo: "https://huggingface.co/spaces/konaaravind4/sd-35-pipeline",
        demoType: "huggingface",
        demoContent: "https://huggingface.co/spaces/konaaravind4/sd-35-pipeline",
        category: "Generative AI",
        featured: true,
        metrics: [
            { label: "CLIP Score", value: "32.4", color: "cyan" },
            { label: "Inference Speed", value: "4.2s/img", color: "violet" },
            { label: "VRAM Usage", value: "8.2 GB", color: "blue" },
            { label: "Throughput", value: "14 img/min", color: "green" },
        ],
        architecture:
            "Prompt → CLIP Text Encoder → Cross-Attention UNet → Latent Diffusion Decoder → VAE → Output Image",
        problemStatement:
            "Generic diffusion model APIs lack fine-grained control over inference parameters, leading to inconsistent image quality and high latency for production workloads.",
        mathModel:
            "x_{t-1} = \\frac{1}{\\sqrt{\\alpha_t}} \\left( x_t - \\frac{1-\\alpha_t}{\\sqrt{1-\\bar{\\alpha}_t}} \\epsilon_\\theta(x_t, t) \\right) + \\sigma_t z",
        screenshots: [],
        tags: ["Generative AI", "Computer Vision", "Diffusion Models"],
        date: "2024-11-05",
        codeSnippet: `import torch
from diffusers import StableDiffusion3Pipeline

pipe = StableDiffusion3Pipeline.from_pretrained(
    "stabilityai/stable-diffusion-3.5-large",
    torch_dtype=torch.bfloat16
).to("cuda")
pipe.enable_attention_slicing()

def generate(prompt: str, cfg: float = 7.5, steps: int = 28):
    return pipe(
        prompt=prompt,
        negative_prompt="blurry, low quality, distorted",
        guidance_scale=cfg,
        num_inference_steps=steps,
    ).images[0]`,
    },
    {
        slug: "rag-graphrag-knowledge-engine",
        title: "RAG & GraphRAG Knowledge Engine",
        tagline: "Hybrid retrieval combining vector search with knowledge-graph reasoning",
        description:
            "A production retrieval-augmented generation system that combines dense vector retrieval (FAISS) with graph-structured knowledge traversal (GraphRAG / LangChain). Achieves superior factual accuracy over naive RAG baselines.",
        longDescription:
            "Traditional RAG systems miss multi-hop reasoning across related facts. This engine implements a hybrid architecture: vector similarity search retrieves candidate chunks, then a graph traversal step expands context via entity relationships, and a final re-ranking module selects the most relevant excerpts before LLM generation. Tested on domain-specific QA benchmarks with 94% answer relevance.",
        techStack: ["Python", "LangChain", "FAISS", "GraphRAG", "LlamaIndex", "OpenAI", "Neo4j", "FastAPI"],
        github: "https://github.com/konaaravind4/rag-graphrag-engine",
        demo: "https://github.com/konaaravind4/rag-graphrag-engine",
        demoType: "github",
        demoContent: "https://github.com/konaaravind4/rag-graphrag-engine",
        category: "LLM Engineering",
        featured: false,
        metrics: [
            { label: "Answer Relevance", value: "94%", color: "cyan" },
            { label: "Retrieval Precision", value: "91%", color: "violet" },
            { label: "Latency P95", value: "890ms", color: "blue" },
            { label: "Context Window", value: "4096 tokens", color: "green" },
        ],
        architecture:
            "Query → Embedding Model → FAISS Vector Search → GraphRAG Traversal → Re-Ranker → LLM Generator → Response",
        problemStatement:
            "Single-hop vector retrieval misses relational context in knowledge-intensive QA tasks, resulting in hallucinated or incomplete answers.",
        mathModel:
            "\\text{score}(q, d) = \\lambda \\cdot \\cos(\\mathbf{q}, \\mathbf{d}) + (1-\\lambda) \\cdot \\text{PageRank}(d)",
        screenshots: [],
        tags: ["RAG", "LLM", "Knowledge Graph", "LangChain"],
        date: "2024-09-20",
        codeSnippet: `from langchain.vectorstores import FAISS
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.graphs import Neo4jGraph

# Hybrid retrieval: vector + graph
embedder = HuggingFaceEmbeddings(model_name="BAAI/bge-base-en")
vectorstore = FAISS.from_documents(docs, embedder)
graph = Neo4jGraph(url="bolt://localhost:7687")

def hybrid_retrieve(query: str, k: int = 5, lambda_: float = 0.6):
    vec_results = vectorstore.similarity_search_with_score(query, k=k*2)
    graph_results = graph.query(f"MATCH (n)-[r]->(m) WHERE n.name CONTAINS '{query}' RETURN m")
    return rerank(vec_results + graph_results, lambda_)[:k]`,
    },
    // ─── NEW CREATIVE PROJECTS ────────────────────────────────────────────────
    {
        slug: "ai-sql-data-analyst",
        title: "AI SQL Data Analyst",
        tagline: "Ask plain-English questions, get SQL queries + beautiful charts instantly",
        description:
            "A natural language to SQL system that converts plain-English business questions into optimized SQL queries and renders results as interactive Plotly charts. Powered by Gemini with schema-aware few-shot prompting.",
        longDescription:
            "This tool democratizes data analytics by letting non-technical users query databases in plain English. The backend uses Gemini 1.5 Flash with schema-aware prompting — the LLM receives the full database schema and generates syntactically correct SQL. Results are automatically visualized using Plotly with chart-type selection based on the data structure. Includes query caching, SQL injection prevention, and query explanation in plain English.",
        techStack: ["Python", "Google Gemini", "FastAPI", "PostgreSQL", "Plotly", "Streamlit", "SQLAlchemy", "Pandas"],
        github: "https://github.com/konaaravind4/ai-sql-analyst",
        demo: "https://konaaravind4-sql-analyst.streamlit.app",
        demoType: "streamlit",
        demoContent: "https://konaaravind4-sql-analyst.streamlit.app",
        category: "Data Intelligence",
        featured: true,
        metrics: [
            { label: "SQL Accuracy", value: "96%", color: "cyan" },
            { label: "Query Speed", value: "<1.2s", color: "violet" },
            { label: "Chart Types", value: "12+", color: "blue" },
            { label: "Tables Supported", value: "Unlimited", color: "green" },
        ],
        architecture:
            "User Query → Schema Injection → Gemini Prompt → SQL Generation → PostgreSQL → Pandas DataFrame → Plotly Chart → UI",
        problemStatement:
            "Data analysts spend 60% of time on repetitive SQL queries. Business users can't access insights without SQL knowledge, creating bottlenecks in data-driven decisions.",
        screenshots: [],
        tags: ["LLM", "Data", "SQL", "Gemini"],
        date: "2025-09-10",
        codeSnippet: `import google.generativeai as genai

def nl_to_sql(question: str, schema: str) -> str:
    model = genai.GenerativeModel("gemini-1.5-flash")
    prompt = f"""Given the database schema:
{schema}

Convert this question to SQL:
"{question}"

Return ONLY valid PostgreSQL. No explanation."""
    return model.generate_content(prompt).text.strip()

# Usage:
sql = nl_to_sql(
    "Show top 5 customers by revenue this month",
    schema=get_schema()
)
results = pd.read_sql(sql, engine)`,
    },
    {
        slug: "realtime-sentiment-dashboard",
        title: "Real-time Sentiment Intelligence Dashboard",
        tagline: "Live sentiment analysis across social streams with emotion detection and trend alerts",
        description:
            "A streaming sentiment analysis system that ingests live social media data, classifies sentiment and emotions in real-time using a fine-tuned RoBERTa model, and renders live updating charts on a Next.js dashboard.",
        longDescription:
            "This system uses Apache Kafka for ingesting high-throughput social streams, a fine-tuned RoBERTa-base model for 8-class emotion detection (joy, anger, fear, surprise, sadness, disgust, contempt, neutral), and a Redis time-series store for trend aggregation. The frontend polls a WebSocket server for live updates, rendering sparklines, geographic heat maps, and word clouds that update every 2 seconds.",
        techStack: ["Python", "Transformers", "Apache Kafka", "Redis", "FastAPI", "WebSocket", "Next.js", "Recharts", "Tailwind"],
        github: "https://github.com/konaaravind4/sentiment-dashboard",
        demo: "https://github.com/konaaravind4/sentiment-dashboard",
        demoType: "github",
        demoContent: "https://github.com/konaaravind4/sentiment-dashboard",
        category: "Real-time ML",
        featured: false,
        metrics: [
            { label: "Throughput", value: "12K msg/s", color: "cyan" },
            { label: "Emotion F1", value: "88.4%", color: "violet" },
            { label: "Latency P99", value: "340ms", color: "blue" },
            { label: "Update Interval", value: "2s", color: "green" },
        ],
        architecture:
            "Social API → Kafka Producer → RoBERTa Classifier → Redis Time-Series → WebSocket Server → Next.js Dashboard",
        problemStatement:
            "Brand managers and researchers lack real-time visibility into public sentiment shifts, missing critical windows to act on trending opinions or crises.",
        mathModel:
            "P(y|x) = \\text{softmax}(W \\cdot \\text{RoBERTa}(x) + b), \\quad \\text{Trend Alert if } \\Delta\\bar{s}_t > \\sigma_{30d}",
        screenshots: [],
        tags: ["Real-time", "NLP", "ML", "Systems"],
        date: "2025-07-12",
        codeSnippet: `from transformers import pipeline
from kafka import KafkaConsumer
import redis.asyncio as redis

classifier = pipeline(
    "text-classification",
    model="konaaravind4/roberta-emotion-8class",
    top_k=None
)

async def process_stream():
    consumer = KafkaConsumer("social-feed", bootstrap_servers="localhost:9092")
    r = await redis.from_url("redis://localhost")
    
    for msg in consumer:
        text = msg.value.decode()
        emotions = classifier(text)[0]
        top = max(emotions, key=lambda x: x["score"])
        
        # Store in Redis time-series
        await r.ts().add(f"emotion:{top['label']}", "*", top["score"])`,
    },
    {
        slug: "agentic-code-reviewer",
        title: "Agentic Code Review Bot",
        tagline: "Multi-agent GitHub PR reviewer catching bugs, security issues, and style violations",
        description:
            "An autonomous code review system that acts as a senior engineer on your GitHub PRs. Uses a multi-agent pipeline (Coordinator, Security Analyst, Performance Analyst, Style Enforcer) to generate detailed, actionable review comments inline on diffs.",
        longDescription:
            "This agent-based system integrates with GitHub via webhooks. On PR creation, a Coordinator agent orchestrates three specialist sub-agents: a Security Analyst (checks for OWASP vulnerabilities, secret leaks, injection patterns), a Performance Analyst (identifies O(n²) loops, unnecessary re-fetches, memory leaks), and a Style Enforcer (PEP8/ESLint alignment). Results are posted as inline PR comments with explanations and suggested fixes, matching the level of detail from a senior engineer review.",
        techStack: ["Python", "Google ADK", "Gemini", "GitHub API", "FastAPI", "Docker", "LangChain", "Redis"],
        github: "https://github.com/konaaravind4/agentic-code-reviewer",
        demo: "https://github.com/konaaravind4/agentic-code-reviewer",
        demoType: "github",
        demoContent: "https://github.com/konaaravind4/agentic-code-reviewer",
        category: "DevOps AI",
        featured: true,
        metrics: [
            { label: "Bug Detection", value: "89%", color: "cyan" },
            { label: "Security Issues Found", value: "94%", color: "violet" },
            { label: "Review Time", value: "<45s", color: "blue" },
            { label: "False Positive Rate", value: "6.2%", color: "green" },
        ],
        architecture:
            "GitHub Webhook → FastAPI Handler → Coordinator Agent → [Security Agent | Performance Agent | Style Agent] → GitHub API → Inline PR Comments",
        problemStatement:
            "Code reviews are time-consuming and inconsistent. Junior developers receive delayed or shallow feedback, and security vulnerabilities slip through rushed reviews.",
        screenshots: [],
        tags: ["Multi-Agent", "A2A", "LLM", "Systems"],
        date: "2025-10-28",
        codeSnippet: `from google.adk.agents import LlmAgent, ParallelAgent

security_agent = LlmAgent(
    name="SecurityAnalyst",
    model="gemini-2.0-flash",
    instruction="""Analyze code diffs for:
- SQL/Command injection vulnerabilities
- Hardcoded secrets or API keys
- Insecure deserialization patterns
Return JSON: {issues: [{line, severity, description, fix}]}""",
)

perf_agent = LlmAgent(name="PerfAnalyst", model="gemini-2.0-flash",
    instruction="Find O(n²) patterns, N+1 queries, and memory leaks.")

coordinator = ParallelAgent(
    name="CodeReviewer",
    sub_agents=[security_agent, perf_agent],
)`,
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
    return projects.filter((p) => p.featured);
}
