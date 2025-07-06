const questions = [
  // Anxiety
  {
    id: 1,
    question: "I feel anxious all the time. Is this normal?",
    answer: "Anxiety is common, but if it interferes with daily life, coping tools or therapy may help.",
    tag: "Anxiety"
  },
  {
    id: 2,
    question: "Why do I overthink every situation?",
    answer: "Overthinking is a common symptom of anxiety. Mindfulness and grounding can help reduce it.",
    tag: "Anxiety"
  },
  {
    id: 3,
    question: "I get panic attacks randomly. What can I do?",
    answer: "Breathing techniques, identifying triggers, and CBT can be effective in managing panic attacks.",
    tag: "Anxiety"
  },
  {
    id: 4,
    question: "Why do I feel nervous even in safe situations?",
    answer: "Your nervous system may be hypersensitive. Consider relaxation strategies and therapy.",
    tag: "Anxiety"
  },
  {
    id: 5,
    question: "Can anxiety affect physical health?",
    answer: "Yes, chronic anxiety can impact sleep, digestion, immunity, and heart health.",
    tag: "Anxiety"
  },

  // Depression
  {
    id: 6,
    question: "How do I know if I'm depressed or just sad?",
    answer: "Sadness is temporary, but depression lingers and affects motivation, appetite, and sleep.",
    tag: "Depression"
  },
  {
    id: 7,
    question: "I don’t enjoy things anymore. Why?",
    answer: "This could be a sign of anhedonia, a core symptom of depression. You're not alone.",
    tag: "Depression"
  },
  {
    id: 8,
    question: "Why do I feel tired no matter how much I sleep?",
    answer: "Excessive fatigue can be both a symptom and consequence of depression.",
    tag: "Depression"
  },
  {
    id: 9,
    question: "Is it okay to take antidepressants?",
    answer: "Yes. When prescribed, they can help balance brain chemicals and improve mood.",
    tag: "Depression"
  },
  {
    id: 10,
    question: "Can I overcome depression without therapy?",
    answer: "Some manage through self-care, but therapy increases chances of recovery and coping.",
    tag: "Depression"
  },

  // Addiction
  {
    id: 11,
    question: "Is addiction always about substances?",
    answer: "No. Behavioral addictions like gaming or social media can also be harmful.",
    tag: "Addiction"
  },
  {
    id: 12,
    question: "How do I know if I have an addiction?",
    answer: "If a habit causes distress or interferes with life, it might be an addiction.",
    tag: "Addiction"
  },
  {
    id: 13,
    question: "Can someone get addicted to food?",
    answer: "Yes. Emotional eating and binge patterns may indicate food addiction.",
    tag: "Addiction"
  },
  {
    id: 14,
    question: "I use substances to cope. Is that bad?",
    answer: "It’s understandable, but alternative coping methods are healthier long-term.",
    tag: "Addiction"
  },
  {
    id: 15,
    question: "Can therapy help with addiction?",
    answer: "Absolutely. Behavioral therapies like CBT and group support are effective.",
    tag: "Addiction"
  },

  // ADHD
  {
    id: 16,
    question: "I can't focus on tasks. Could it be ADHD?",
    answer: "Difficulty focusing, organizing, or sitting still can signal ADHD. A diagnosis helps.",
    tag: "ADHD"
  },
  {
    id: 17,
    question: "Can adults have undiagnosed ADHD?",
    answer: "Yes. Many adults discover ADHD later in life after struggling for years.",
    tag: "ADHD"
  },
  {
    id: 18,
    question: "Why do I get distracted even during things I enjoy?",
    answer: "This can be a sign of ADHD or cognitive overload. Mindful techniques may help.",
    tag: "ADHD"
  },
  {
    id: 19,
    question: "Is ADHD just about hyperactivity?",
    answer: "No. It also includes inattentiveness, impulsivity, and emotional dysregulation.",
    tag: "ADHD"
  },
  {
    id: 20,
    question: "Can ADHD affect relationships?",
    answer: "Yes, it can lead to misunderstandings, but awareness and tools help communication.",
    tag: "ADHD"
  },

  // OCD
  {
    id: 21,
    question: "I have repetitive thoughts. Is this OCD?",
    answer: "Intrusive thoughts and compulsive behaviors are classic signs. Diagnosis is key.",
    tag: "OCD"
  },
  {
    id: 22,
    question: "Can OCD be about cleanliness only?",
    answer: "No. OCD can involve thoughts, rituals, checking, counting, and more.",
    tag: "OCD"
  },
  {
    id: 23,
    question: "Are OCD thoughts dangerous?",
    answer: "They're not dangerous, just distressing. Mindfulness and ERP therapy help.",
    tag: "OCD"
  },
  {
    id: 24,
    question: "Do I need medication for OCD?",
    answer: "Some find meds useful. Others rely on exposure therapy or CBT.",
    tag: "OCD"
  },
  {
    id: 25,
    question: "How do I manage OCD in daily life?",
    answer: "Routine, therapy, journaling, and support systems are helpful.",
    tag: "OCD"
  },

  // PTSD
  {
    id: 26,
    question: "I get flashbacks often. Is this PTSD?",
    answer: "Flashbacks after trauma can be PTSD-related. Talk to a mental health professional.",
    tag: "PTSD"
  },
  {
    id: 27,
    question: "Can PTSD come from emotional abuse?",
    answer: "Yes. PTSD can result from various types of trauma, not just physical events.",
    tag: "PTSD"
  },
  {
    id: 28,
    question: "Why do certain sounds trigger me?",
    answer: "Triggers can be linked to traumatic memories. Grounding techniques may help.",
    tag: "PTSD"
  },
  {
    id: 29,
    question: "Can PTSD show up years later?",
    answer: "Yes. It’s not unusual for symptoms to emerge long after the trauma.",
    tag: "PTSD"
  },
  {
    id: 30,
    question: "How is PTSD treated?",
    answer: "Therapies like EMDR, trauma-informed CBT, and support groups are effective.",
    tag: "PTSD"
  },

  // General Mental Health
  {
    id: 31,
    question: "Why do I feel numb emotionally?",
    answer: "Emotional numbness can result from stress, trauma, or depression. You're not alone.",
    tag: "Depression"
  },
  {
    id: 32,
    question: "How do I talk to my family about mental health?",
    answer: "Be honest and use “I” statements. Share how they can support you.",
    tag: "Anxiety"
  },
  {
    id: 33,
    question: "Does therapy actually work?",
    answer: "Yes. Therapy provides tools, support, and insight tailored to your situation.",
    tag: "Depression"
  },
  {
    id: 34,
    question: "I’m afraid to ask for help. What should I do?",
    answer: "You're brave for considering it. Start with a trusted person or helpline.",
    tag: "Anxiety"
  },
  {
    id: 35,
    question: "Can journaling improve mental health?",
    answer: "Yes. It helps release emotions, track patterns, and reflect mindfully.",
    tag: "OCD"
  },
  {
    id: 36,
    question: "Is it normal to cry for no reason?",
    answer: "Unexpected crying can be emotional overload, hormonal shifts, or depression-related.",
    tag: "Depression"
  },
  {
    id: 37,
    question: "Why do I isolate myself when I'm stressed?",
    answer: "It's a common coping response, but reaching out helps faster recovery.",
    tag: "Depression"
  },
  {
    id: 38,
    question: "Do mental health conditions go away on their own?",
    answer: "Some may improve with lifestyle changes, but many need professional guidance.",
    tag: "PTSD"
  },
  {
    id: 39,
    question: "What’s the first step to healing?",
    answer: "Acknowledging your struggle and choosing to seek support. You're already doing it!",
    tag: "Anxiety"
  },
  {
    id: 40,
    question: "Can I fully recover from mental illness?",
    answer: "Yes. Many people live fulfilling lives through treatment, support, and self-care.",
    tag: "Depression"
  }
];

export default questions;
