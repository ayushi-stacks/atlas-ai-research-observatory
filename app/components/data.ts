export type Topic = {
  id: string;
  label: string;
  shortLabel: string;
  papers: string;
  tone: string;
  x: number;
  y: number;
  summary: string;
};

export const topics: Topic[] = [
  { id: "transformers", label: "Transformers", shortLabel: "Transformers", papers: "1,284", tone: "rose", x: 18, y: 20, summary: "Architectures that made attention the primary mechanism for sequence modeling." },
  { id: "rag", label: "Retrieval Augmented Generation", shortLabel: "RAG", papers: "642", tone: "gold", x: 60, y: 9, summary: "Systems that ground generation in retrieved, traceable knowledge." },
  { id: "multimodal", label: "Multimodal AI", shortLabel: "Multimodal AI", papers: "913", tone: "cyan", x: 70, y: 31, summary: "Models that reason across language, vision, audio, and embodied signals." },
  { id: "diffusion", label: "Diffusion Models", shortLabel: "Diffusion Models", papers: "533", tone: "violet", x: 68, y: 76, summary: "Generative methods that learn to reverse a gradual noising process." },
  { id: "generative", label: "Generative Models", shortLabel: "Generative Models", papers: "1,781", tone: "mint", x: 8, y: 71, summary: "The broad lineage of models that synthesize new data and representations." },
  { id: "agents", label: "AI Agents", shortLabel: "AI Agents", papers: "389", tone: "blue", x: 77, y: 57, summary: "Language-model systems that plan, use tools, and act toward long-horizon goals." },
  { id: "safety", label: "AI Safety", shortLabel: "AI Safety", papers: "724", tone: "amber", x: 35, y: 87, summary: "Research into alignment, robustness, oversight, and societal consequences." },
  { id: "evaluation", label: "LLM Evaluation", shortLabel: "LLM Evaluation", papers: "476", tone: "lilac", x: 2, y: 42, summary: "Methods for measuring capability, reliability, bias, and real-world utility." },
];

export const collections = [
  { title: "The Rise of RAG", papers: 120, code: "rag", kicker: "Grounded intelligence" },
  { title: "Transformers: The Evolution", papers: 98, code: "transformers", kicker: "Attention, scaled" },
  { title: "Multimodal Frontiers", papers: 150, code: "multimodal", kicker: "Beyond language" },
  { title: "AI Safety Research", papers: 86, code: "safety", kicker: "Systems we can trust" },
  { title: "LLM Evaluation Methods", papers: 72, code: "evaluation", kicker: "Measuring intelligence" },
];

export const timeline = [
  { year: "2017", title: "Attention Is All You Need", theme: "Transformers", impact: "Reframed sequence modeling around self-attention." },
  { year: "2018", title: "BERT", theme: "Pre-training", impact: "Established bidirectional language representation at scale." },
  { year: "2019", title: "GPT-2", theme: "Generative scale", impact: "Revealed fluent zero-shot behaviors from next-token prediction." },
  { year: "2020", title: "Scaling Laws", theme: "Scale", impact: "Mapped predictable relationships between compute, data, and loss." },
  { year: "2021", title: "CLIP & DALL·E", theme: "Multimodality", impact: "Connected language and visual representation." },
  { year: "2022", title: "Diffusion & ChatGPT", theme: "Interaction", impact: "Brought generative AI into everyday creative and conversational use." },
  { year: "2023", title: "RAG & Assistants", theme: "Grounding", impact: "Joined foundation models with current knowledge and useful tools." },
  { year: "2024", title: "Agentic Systems", theme: "Agency", impact: "Shifted focus from responses to plans, tools, and outcomes." },
  { year: "2025+", title: "Adaptive Intelligence", theme: "Emergence", impact: "Research converges on reasoning, autonomy, and scientific discovery." },
];
