import pandas as pd
df = pd.read_csv("ml/new_data.csv")
print("Min cognitive score:", df["cognitive_score"].min())
print("Max cognitive score:", df["cognitive_score"].max())
print(df.describe())
