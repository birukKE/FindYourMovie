
import heapq
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
import json
import numpy as np
import os




df = pd.read_csv("movies.csv")
df['overview'] = df['overview'].fillna('')


embeddings = []
if os.path.exists("movie_embeddings.npy"):
    embeddings = np.load("movie_embeddings.npy")
else:
    model = SentenceTransformer("all-MiniLM-L6-v2")
    embeddings = model.encode(df['overview'].tolist())
    np.save("movie_embeddings.npy", embeddings)

cs = []
if os.path.exists("cosinus_similarity"):
    cs = np.load("cosinus_similarity")
else:
    # model = SentenceTransformer("all-MiniLM-L6-v2")
    cs = cosine_similarity(embeddings, embeddings)
    np.save("cosine_similarity", cs)


def takeInput(fav_movie, isDescription):
    index = -1
    if isDescription:
        print("isDescription", isDescription)
        model = SentenceTransformer("all-MiniLM-L6-v2")
        embedding = model.encode(fav_movie).reshape(1, -1)
        descSimilarity = cosine_similarity(embedding, embeddings)
        return calculateSimilarity(descSimilarity, 0, 0.1)
    else:
        fav_movie = fixTitle(fav_movie)
        print("isDescription", isDescription)
        for i, original_title in enumerate(df["original_title"]):
            if original_title == fav_movie:
                found = True
                index = i
        if index!=-1:
            return calculateSimilarity(cs, index, 0.1)
        return [] #[f"Could not find the movie: {fav_movie}. Check the spelling!"]



def calculateSimilarity(descSimilarity, index, lowestSimilarity):
    store_sim_ind = [()]
    favSimilarities = descSimilarity[index]
    print("favSimilarities: ", favSimilarities)
    for i, sim in enumerate(favSimilarities):
        if lowestSimilarity < sim < 0.99999:
            store_sim_ind.append((float(sim), df["original_title"][i]))
    top_sim = heapq.nlargest(5, store_sim_ind)

    if len(top_sim) == 0:
        return []
    top_sim = [elem[1] for elem in top_sim]
    top_sim = json.dumps(top_sim)
    return top_sim


def fixTitle(title):
    titleList = title.split(" ")
    nonCapitalized = [ "a", "an", "the", "and", "but", "or", "nor", "yet", "so", "as", "at", "by", "for", 
                      "in", "of", "on", "per", "to", "up", "via", "from", "into", "over", "with" ]
    correctTitle = [""]*len(titleList)
    for i in range(len(titleList)):
        if i==0 or i == len(titleList)-1:
            correctTitle[i] = titleList[i][0].upper() + titleList[i][1:len(titleList[i])]
        elif i>0 and titleList[i] not in nonCapitalized:# and titleList[i] != ":":
            correctTitle[i] = titleList[i][0].upper() + titleList[i][1:len(titleList[i])]
        elif i>0 and titleList[i] in nonCapitalized and titleList[i-1][len(titleList[i-1])-1] == ":":
            correctTitle[i] = titleList[i][0].upper() + titleList[i][1:len(titleList[i])]
        else:
            correctTitle[i] = titleList[i]
    return " ".join(correctTitle)
