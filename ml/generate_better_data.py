import pandas as pd
import numpy as np

def generate_better_data(n=2000):
    np.random.seed(42)

    # 1. Generate realistic but highly varied input features
    # Games scored 0 to 100
    memory_match = np.random.randint(0, 101, n)
    word_recall = np.random.randint(0, 101, n)
    pattern_recognition = np.random.randint(0, 101, n)
    face_recognition = np.random.randint(0, 101, n)
    
    # Reaction time: 200ms to 3500ms
    # To add realism, usually worse scores correlate with slower reaction times
    # but we will just generate an independent distribution 
    # to let the model figure out the multivariate relationships.
    reaction_time = np.random.randint(200, 3501, n)

    data = pd.DataFrame({
        "memory_match": memory_match,
        "word_recall": word_recall,
        "pattern_recognition": pattern_recognition,
        "face_recognition": face_recognition,
        "reaction_time": reaction_time,
    })

    # The formula to map these 5 inputs to a `cognitive_score` [0, 100]:
    # We will weigh the 4 game scores at ~20% each, and the reaction time at ~20%.
    # Fast reaction time (e.g., 200-500ms) gets ~20 points.
    # Slow reaction time (e.g., 3000ms+) gets ~0 points.

    # 1. Calculate accuracy component (up to 80 points)
    accuracy_sum = (memory_match + word_recall + pattern_recognition + face_recognition) / 4
    accuracy_points = accuracy_sum * 0.8  # Max 80

    # 2. Calculate reaction time component (up to 20 points)
    # Clip reaction time to a realistic bounding box for scaling purposes
    rx_time_clipped = np.clip(reaction_time, 200, 3000)
    
    # Scale rx_time_clipped onto a 0-20 scale where lower ms = higher points
    # (3000 - 200) = 2800 ms range
    # Best rx time = 20 points. Worst rx time = 0 points.
    rx_points = ((3000 - rx_time_clipped) / 2800) * 20

    # Total cognitive score
    cognitive_score = accuracy_points + rx_points
    
    # Add a tiny bit of random noise (gaussian, standard deviation 2.0) to make it look real
    # but constrain strictly within 0-100 bounding box
    cognitive_score += np.random.normal(0, 2.0, n)
    cognitive_score = np.clip(cognitive_score, 0, 100).round(2)

    data["cognitive_score"] = cognitive_score

    return data

if __name__ == "__main__":
    df = generate_better_data()
    # Save the file (overwrite the existing new_data.csv that was too narrow)
    import os
    BASE_DIR = os.path.dirname(__file__)
    DATA_PATH = os.path.join(BASE_DIR, "new_data.csv")
    df.to_csv(DATA_PATH, index=False)
    
    print(f"Generated {len(df)} realistic records. Range: [{df['cognitive_score'].min()} - {df['cognitive_score'].max()}]")
    print("New dataset created correctly at", DATA_PATH)
