# FindYourMovie

# **Movie Recommender Web App**


## **Features**
- **Search by movie title** → get similar movies
- **Search by custom description** → find matching movies


## **Description**
- A movie recommendation website that uses AI-based semantic similarity.
- Users can:
  - Find movies similar to a selected movie.
  - Get recommendations based on a written description.
- The system uses NLP (Sentence Transformers) + cosine similarity.
- Retrieves extended movie info (plot, poster, genres, ratings).

## **How It Works**
- The backend converts movie descriptions into **vector embeddings** using Sentence Transformers.
- Uses **cosine similarity** to measure closeness between movie descriptions.
- Main movie data comes from a **local Kaggle movies.csv** file.
- Additional movie details like posters come from the **OMDb API**.

## **What the Project Is Made Of**

### **Backend**
- **Python and Flask**
- **OMDb API integration**

### **Frontend**
- **React with JavaScript**

