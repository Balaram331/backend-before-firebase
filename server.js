import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

//  FULL DATA (NO CUT)
let posts = [
  {
    id: 1,
    name: "Arpita Singh",
    title: "Civic Discipline and System Failures Are Holding India Back",
    location: "Odisha",
    text: "India is facing a growing crisis in civic discipline and accountability. Basic safety rules are ignored, roads remain chaotic, and public spaces lack cleanliness due to weak enforcement and poor civic sense. Corruption continues to weaken trust in essential systems, while the education system fails to build responsible and aware citizens. Social judgment, especially towards women, reflects deep-rooted bias, and slow legal processes allow rule-breaking to go unpunished. As a result, everyday life becomes inefficient, unsafe, and frustrating for citizens.",
    likes: 34,
    supports: 12
  },
  {
    id: 2,
    name: "Sanjay Kumar",
    title: "Overcrowded Government Hospitals and Lack of Medical Staff",
    location: "Bihar",
    text: "Government hospitals in many parts of India, especially in states like Bihar, are heavily overcrowded and understaffed. Patients often have to wait for hours or even days to receive basic treatment. The shortage of doctors, nurses, and proper medical equipment creates serious challenges, particularly for low-income families who depend entirely on public healthcare. This leads to delayed treatment, poor patient care, and increased health risks.",
    likes: 45,
    supports: 16
  },
  {
    id: 3,
    name: "Dhiman Das",
    title: "Lack of Government Job Opportunities for Youth",
    location: "West Bengal",
    text: "Many young people in West Bengal are struggling due to the lack of sufficient government job opportunities. Despite years of preparation and education, candidates face limited vacancies, intense competition, and long delays in recruitment processes. This creates frustration among youth and uncertainty about their future, pushing many towards unemployment or unstable career paths.",
    likes: 10,
    supports: 5
  },
  {
    id: 4,
    name: "Rohit Sharma",
    title: "Unemployment and Endless Delays in Government Job Exams",
    location: "Uttar Pradesh",
    text: "Millions of young people across India are struggling with unemployment while waiting for government job opportunities. Exams are frequently delayed, results take years to be announced, and cases of paper leaks further destroy trust in the system. Aspirants spend years preparing, but uncertainty and lack of transparency leave them frustrated and mentally exhausted, affecting their careers and future stability.",
    likes: 17,
    supports: 8
  }
];

//  HOME
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

//  GET POSTS
app.get("/posts", (req, res) => {
  res.json(posts);
});

//  LIKE
app.post("/like/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  const { action } = req.body;

  if (!post) return res.status(404).json({ error: "Post not found" });

  if (action === "like") {
    post.likes += 1;
  } else if (action === "unlike") {
    post.likes -= 1;
    if (post.likes < 0) post.likes = 0;
  }

  res.json({ likes: post.likes });
});

//  SUPPORT
app.post("/support/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  const { action } = req.body;

  if (!post) return res.status(404).json({ error: "Post not found" });

  if (action === "support") {
    post.supports += 1;
  } else if (action === "unsupport") {
    post.supports -= 1;
    if (post.supports < 0) post.supports = 0;
  }

  res.json({ supports: post.supports });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
