export type Certification = {
  title: string;
  issuer: string;
  kind: string;
  date: string; // ISO date
  credentialId?: string;
  verifyUrl: string;
  /** Courses inside a specialization, in the order they were taken. */
  courses?: string[];
  topics?: string[];
};

/** The headline credential, shown large with its course track. */
export const featuredCertification: Certification = {
  title: "Deep Learning Specialization",
  issuer: "DeepLearning.AI",
  kind: "Professional certificate",
  date: "2026-10-19",
  credentialId: "8eec4813-9a8a-4a2c-98c5-c740ac1aba1e",
  verifyUrl: "https://www.deeplearning.ai/certificates/8eec4813-9a8a-4a2c-98c5-c740ac1aba1e",
  courses: [
    "Neural Networks and Deep Learning",
    "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
    "Structuring Machine Learning Projects",
    "Convolutional Neural Networks",
    "Sequence Models",
  ],
};

/** Everything else, newest first. */
export const certifications: Certification[] = [
  {
    title: "Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning",
    issuer: "DeepLearning.AI",
    kind: "Course certificate",
    date: "2026-10-10",
    credentialId: "903d02ce-72f1-4ccd-9a78-f94ffaa3b27d",
    verifyUrl: "https://www.deeplearning.ai/certificates/903d02ce-72f1-4ccd-9a78-f94ffaa3b27d",
  },
  {
    title: "Building toward Computer Use with Anthropic",
    issuer: "DeepLearning.AI",
    kind: "Short course",
    date: "2026-09-30",
    credentialId: "8f486c4e-b957-4b8a-92e4-76f85b6e3d4f",
    verifyUrl: "https://www.deeplearning.ai/accomplishments/8f486c4e-b957-4b8a-92e4-76f85b6e3d4f",
    topics: ["Agents", "Multimodal", "AI safety"],
  },
  {
    title: "Generative AI with Large Language Models",
    issuer: "DeepLearning.AI",
    kind: "Course certificate",
    date: "2026-09-22",
    credentialId: "31511b24-c86b-4cff-ab1c-43f45721293d",
    verifyUrl: "https://www.deeplearning.ai/certificates/31511b24-c86b-4cff-ab1c-43f45721293d",
  },
  {
    title: "Registered Computer Engineer",
    issuer: "Nepal Engineering Council",
    kind: "Professional registration",
    date: "2024",
    credentialId: "89492",
    verifyUrl: "https://nec.gov.np/registration/89492?programName=Computer%20Engineering",
    topics: ["Pokhara University, 2024"],
  },
];
