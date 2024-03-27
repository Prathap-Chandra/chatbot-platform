intents = {
    "apply_leave": [
        "I need to apply for a leave",
        "How do I apply for leave?",
        "Leave application process",
    ],
    "holiday_calendar": [
        "Show the holiday calendar",
        "When is the next holiday?",
        "List of holidays this year",
    ],
    "schedule_meeting": [
        "Schedule a meeting with the team",
        "Set up a meeting for next week",
        "How to book a meeting room?",
    ],
    "search_employee": [
        "Find details of an employee",
        "How do I search for an employee's contact?",
        "Employee lookup",
    ],
}

from sentence_transformers import SentenceTransformer, util
import torch

embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Flatten the intents dictionary into a corpus list and remember the intent of each sentence
corpus = []
intent_labels = []  # Store the intent of each sentence
for intent, examples in intents.items():
    for example in examples:
        corpus.append(example)
        intent_labels.append(intent)

# Generate embeddings
corpus_embeddings = embedder.encode(corpus, convert_to_tensor=True)


# Example queries
queries = [
    "Can you tell me when I am off next?",
    "I need to take a sick day",
    "How do I find John Doe's phone number?",
]

# Process each query
for query in queries:
    query_embedding = embedder.encode(query, convert_to_tensor=True)
    cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
    top_result = torch.argmax(cos_scores).item()

    # Use the index of the top result to find the corresponding intent
    predicted_intent = intent_labels[top_result]
    print(f"Query: {query}")
    print(f"Predicted intent: {predicted_intent}\n")
