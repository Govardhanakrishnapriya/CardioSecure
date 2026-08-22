import torch
import numpy as np
import pandas as pd
import joblib

from model import FTTransformer


MODEL_PATH = "models/cardiosecure_model.pth"
SCALER_PATH = "models/cardiosecure_scaler.pkl"
FEATURES_PATH = "models/cardiosecure_features.pkl"


# Load scaler
scaler = joblib.load(SCALER_PATH)

# Load feature columns
feature_columns = joblib.load(FEATURES_PATH)

print("\nFeature columns:")
print(feature_columns)

print("\nNumber of features:", len(feature_columns))


# Create model
model = FTTransformer(
    num_features=len(feature_columns),
    d_token=64,
    n_heads=4,
    n_layers=3,
    dropout=0.2
)


# Load trained weights
checkpoint = torch.load(
    MODEL_PATH,
    map_location=torch.device("cpu")
)

model.load_state_dict(checkpoint)

model.eval()

print("\nModel loaded successfully!")


# ============================================================
# TEST INPUT 1
# ============================================================

input_1 = [
    40,
    0,
    1,
    110,
    180,
    0,
    0,
    170,
    0,
    0.0,
    2
]


# ============================================================
# TEST INPUT 2
# Very different values
# ============================================================

input_2 = [
    75,
    1,
    3,
    200,
    500,
    1,
    2,
    60,
    1,
    6.0,
    1
]


def predict(features, test_name):

    print("\n" + "=" * 60)
    print(test_name)
    print("=" * 60)

    print("\nOriginal input:")
    print(features)

    # Create dataframe
    input_df = pd.DataFrame(
        [features],
        columns=feature_columns
    )

    # Scale
    scaled_input = scaler.transform(input_df)

    print("\nScaled input:")
    print(np.round(scaled_input, 4))

    # Convert to tensor
    x = torch.tensor(
        scaled_input,
        dtype=torch.float32
    )

    # Predict
    with torch.no_grad():

        logit = model(x)

        probability = torch.sigmoid(logit).item()

    prediction = (
        "High Risk"
        if probability >= 0.5
        else "Low Risk"
    )

    print("\nLogit:", logit.item())

    print("Probability:", probability)

    print("Prediction:", prediction)


# Run tests

predict(input_1, "TEST 1 - LOWER RISK STYLE INPUT")

predict(input_2, "TEST 2 - HIGHER RISK STYLE INPUT")