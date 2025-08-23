# import joblib
# from gensim.models import KeyedVectors
# from sentence_transformers import SentenceTransformer

# cat_model = joblib.load('ml_model/catboost_model.pkl')
# tfidf = joblib.load('ml_model/tfidf_vectorizer.pkl')
# label_encoder = joblib.load('ml_model/label_encoder.pkl')
# word2vec = KeyedVectors.load('ml_model/word2vec_model.kv')

# # Load BERT dynamically
# with open("ml_model/bert_model_name.txt", "r") as f:
#     bert_model_name = f.read().strip()
# bert_model = SentenceTransformer(bert_model_name)

# import re
# import numpy as np
# import joblib
# from sentence_transformers import SentenceTransformer
# from gensim.models import KeyedVectors

# # Load models and encoders
# cat_model = joblib.load('ml_model/catboost_model.pkl')
# label_encoder = joblib.load('ml_model/label_encoder.pkl')
# tfidf = joblib.load('ml_model/tfidf_vectorizer.pkl')
# word2vec = KeyedVectors.load('ml_model/word2vec_model.kv')

# # Load BERT model
# bert_model = SentenceTransformer('all-mpnet-base-v2')

# # Preprocessing function
# def clean_text(text):
#     text = text.lower()
#     text = re.sub(r'[^a-zA-Z\s]', '', text)
#     text = re.sub(r'\s+', ' ', text).strip()
#     return text

# # Get word2vec embedding
# def get_word2vec_embedding(text):
#     vectors = [word2vec[word] for word in text.split() if word in word2vec]
#     return np.mean(vectors, axis=0) if vectors else np.zeros(100)

# # Prediction function
# def predict_category(item_name):
#     cleaned_item = clean_text(item_name)

#     bert_emb = bert_model.encode([cleaned_item])
#     tfidf_emb = tfidf.transform([cleaned_item]).toarray()
#     w2v_emb = np.array([get_word2vec_embedding(cleaned_item)])

#     X_new = np.hstack([bert_emb, tfidf_emb, w2v_emb])

#     y_pred = cat_model.predict(X_new)
#     predicted_category = label_encoder.inverse_transform(y_pred)[0]

#     return predicted_category

# Example usage
# if __name__ == "__main__":
#     items = [
#         "Organic hand sanitizer",
#         "Bluetooth headphones",
#         "Notebook and pens",
#         "Sandwich",
#         "Protein Powder",
#         'Organic Bananas',
#         'Almond Milk',
#         'Apple Juice',
#         'USB-C Charger',
#         'Apple phone',
        
#     ]

#     for item in items:
#         category = predict_category(item)
#         print(f"Item: {item:<25} → Predicted Category: {category}")

import os
import re
import numpy as np
import joblib
from sentence_transformers import SentenceTransformer
from gensim.models import KeyedVectors

# Get the absolute path to the directory containing this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load models and encoders using safe path resolution
cat_model = joblib.load(os.path.join(BASE_DIR, 'ml_model', 'catboost_model.pkl'))
label_encoder = joblib.load(os.path.join(BASE_DIR, 'ml_model', 'label_encoder.pkl'))
tfidf = joblib.load(os.path.join(BASE_DIR, 'ml_model', 'tfidf_vectorizer.pkl'))
word2vec = KeyedVectors.load(os.path.join(BASE_DIR, 'ml_model', 'word2vec_model.kv'))

# Load BERT model (downloads automatically if not cached)
bert_model = SentenceTransformer('all-mpnet-base-v2')

# Clean text: lowercase, remove non-alphabet characters, normalize spaces
def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

# Get Word2Vec average vector for sentence
def get_word2vec_embedding(text):
    vectors = [word2vec[word] for word in text.split() if word in word2vec]
    return np.mean(vectors, axis=0) if vectors else np.zeros(100)
def predict_category(item_name):
    print(label_encoder.classes_)
    print('items name is ', item_name)
    
    cleaned_item = clean_text(item_name)

    bert_emb = bert_model.encode([cleaned_item])
    tfidf_emb = tfidf.transform([cleaned_item]).toarray()
    w2v_emb = np.array([get_word2vec_embedding(cleaned_item)])

    X_new = np.hstack([bert_emb, tfidf_emb, w2v_emb])

    y_pred = cat_model.predict(X_new)
    predicted_category = label_encoder.inverse_transform(y_pred)[0]
    
    print('Predicted category:', predicted_category)  # Optional debug

    return predicted_category  # ✅ FIXED


# Predict category for a given item name
# def predict_category(item_name):
#     print(label_encoder.classes_)
#     print('items name is ', item_name)
#     cleaned_item = clean_text(item_name)

#     bert_emb = bert_model.encode([cleaned_item])
#     tfidf_emb = tfidf.transform([cleaned_item]).toarray()
#     w2v_emb = np.array([get_word2vec_embedding(cleaned_item)])

#     X_new = np.hstack([bert_emb, tfidf_emb, w2v_emb])

#     y_pred = cat_model.predict(X_new)
