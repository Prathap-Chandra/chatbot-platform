from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer, util
import torch
import pickle
import os
import spacy
from spacy.matcher import PhraseMatcher
from spacy.tokens import Span
from spacy.language import Language

app = Flask(__name__)

# Initialize spaCy and the PhraseMatcher for entity extraction
nlp = spacy.load("en_core_web_sm")
matcher = PhraseMatcher(nlp.vocab, attr="LOWER")

# Load the SentenceTransformer model
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Add custom entities function
def add_custom_entities(entity_name, entity_patterns):
    patterns = [nlp.make_doc(text) for text in entity_patterns]
    matcher.add(entity_name, None, *patterns)

    @Language.component(entity_name)
    def component(doc):
        matches = matcher(doc)
        new_ents = []
        for match_id, start, end in matches:
            span = Span(doc, start, end, label=entity_name)
            new_ents.append(span)
        # Merge with existing entities, avoiding duplicates or overlaps
        filtered_ents = spacy.util.filter_spans(list(doc.ents) + new_ents)
        doc.ents = filtered_ents
        return doc

    nlp.add_pipe(entity_name, last=True)

# Example usage: Add leave type entities
leave_types = ["sick leave", "casual leave", "medical leave", "parental leave", "sabbatical leave", "annual leave"]
add_custom_entities("LEAVE_TYPE", leave_types)
    
# Predefined intents and their example sentences
intents = {
    "apply_leave": [
        "I need to apply for a leave",
        "Help me apply a casual leave?",
        "Leave application process",
        "How can I submit a leave request for personal reasons?",
        "I need to take some time off next week. What's the process?",
        "Could you guide me through applying for medical leave?",
        "I'm planning a vacation. How do I go about requesting time off?",
        "What's the procedure to get a few days off for a family emergency?",
        "I'd like to request parental leave starting next month. Who should I speak to?",
        "Is it possible to take a sabbatical leave? I'd like to apply.",
        "I must attend a personal matter and need to take leave. How do I proceed?",
        "Can you help me apply for annual leave?",
        "I'm feeling unwell and need to request sick leave. What steps do I follow?",
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

# Filenames for saved embeddings and labels
EMBEDDINGS_FILE = "corpus_embeddings.pt"
LABELS_FILE = "intent_labels.pkl"

# Function to load or generate embeddings and labels
def load_embeddings_and_labels():
    if os.path.exists(EMBEDDINGS_FILE) and os.path.exists(LABELS_FILE):
        return torch.load(EMBEDDINGS_FILE), pickle.load(open(LABELS_FILE, 'rb'))
    else:
        corpus = [example for intent_examples in intents.values() for example in intent_examples]
        intent_labels = [intent for intent, examples in intents.items() for _ in examples]
        corpus_embeddings = embedder.encode(corpus, convert_to_tensor=True)
        torch.save(corpus_embeddings, EMBEDDINGS_FILE)
        pickle.dump(intent_labels, open(LABELS_FILE, 'wb'))
        return corpus_embeddings, intent_labels


# Global variables to store embeddings and labels
corpus_embeddings, intent_labels = load_embeddings_and_labels()

@app.before_request
def initialize_model():
    """Loads embeddings, labels, and spaCy model at startup."""
    print("Loading embeddings, labels, and spaCy model...")
    load_embeddings_and_labels()

@app.route('/classify_intent', methods=['POST'])
def classify_intent():
    data = request.json
    query = data.get('query', '')
    if not query:
        return jsonify({"error": "Query is required"}), 400
    
    # Get embeddings and similarity scores for the query
    query_embedding = embedder.encode(query, convert_to_tensor=True)
    cos_scores = util.cos_sim(query_embedding, corpus_embeddings)[0]
    top_result = torch.argmax(cos_scores).item()
    predicted_intent = intent_labels[top_result]
    
    # Process the query with spaCy for entity recognition
    doc = nlp(query)
    
    # Return intent and all entities (default and custom)
    entities = [{"text": ent.text, "label": ent.label_} for ent in doc.ents]
    
    return jsonify({"query": query, "predicted_intent": predicted_intent, "entities": entities})

if __name__ == "__main__":
    app.run(debug=True)