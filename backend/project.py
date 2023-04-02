import numpy as np
from sklearn.svm import SVC
import pandas as pd
from sklearn.model_selection import train_test_split as train_data_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import _multilayer_perceptron as nmp
#pd.set_option('display.max_rows', None)
#pd.set_option('display.max_columns', None)
#df is the training model
df = pd.read_csv("C:\\Users\\khann\\Desktop\\disease_prediction_new\\backend\\Training.csv")
#tes is the testing model
tes = pd.read_csv("C:\\Users\\khann\\Desktop\\disease_prediction_new\\backend\\Testing.csv")
#print(df.head())
df = df.drop(["Unnamed: 133"],axis=1)
#print("Chekcing null valeus in train_df: ", df.isnull().sum().any())
#print(df['prognosis'].unique())
df['prognosis'].replace(['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis',
       'Drug Reaction', 'Peptic ulcer diseae', 'AIDS', 'Diabetes ',
       'Gastroenteritis', 'Bronchial Asthma', 'Hypertension ', 'Migraine',
       'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice',
       'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
       'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E',
       'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia',
       'Dimorphic hemmorhoids(piles)', 'Heart attack', 'Varicose veins',
       'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia',
       'Osteoarthristis', 'Arthritis',
       '(vertigo) Paroymsal  Positional Vertigo', 'Acne',
       'Urinary tract infection', 'Psoriasis', 'Impetigo'],
                        [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40], inplace=True)
#print(df['prognosis'])
#print(tes)
"""tes['prognosis'].replace(['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis',
       'Drug Reaction', 'Peptic ulcer diseae', 'AIDS', 'Diabetes ',
       'Gastroenteritis', 'Bronchial Asthma', 'Hypertension ', 'Migraine',
       'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice',
       'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
       'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E',
       'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia',
       'Dimorphic hemmorhoids(piles)', 'Heart attack', 'Varicose veins',
       'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia',
       'Osteoarthristis', 'Arthritis',
       '(vertigo) Paroymsal  Positional Vertigo', 'Acne',
       'Urinary tract infection', 'Psoriasis', 'Impetigo'],
                        [0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40], inplace=True)
"""
X=df
X = df.drop(['prognosis'], axis=1)
X_test=tes
#X_test = tes.drop(['prognosis'], axis=1)
y = df['prognosis']
#y_test = tes['prognosis']
#print(X.head())
#print👍
X_train,X_tes, y_train,y_tes = train_data_split(X,y,test_size=0.1,random_state=True)
#print(X)
#sklearn.model_selection.train_test_split(*arrays, test_size=None,random_state=None)
models_accuracy = {}
#print(X_test)
#Creating a prediction model on KNN(K NearestNeighbour)
kn_model = KNeighborsClassifier(n_neighbors=12)
kn_model.fit(X_train, y_train)
#kn_model.predict(X_test)
#print(X_test.head())
#kn_score = kn_model.score(X_test, y_test)
#models_accuracy['Knn'] = kn_score*100
#print(models_accuracy)
#print(X_test)
#print(kn_model.predict(X_test))
#print(y_test.values)
l1=list(kn_model.predict(X_test))
#print(l1)
n=len(l1)
st=['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis',
       'Drug Reaction', 'Peptic ulcer diseae', 'AIDS', 'Diabetes ',
       'Gastroenteritis', 'Bronchial Asthma', 'Hypertension ', 'Migraine',
       'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice',
       'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A',
       'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E',
       'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia',
       'Dimorphic hemmorhoids(piles)', 'Heart attack', 'Varicose veins',
       'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia',
       'Osteoarthristis', 'Arthritis',
       '(vertigo) Paroymsal  Positional Vertigo', 'Acne',
       'Urinary tract infection', 'Psoriasis', 'Impetigo']
for j in l1:
       print(st[j])