from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

import torch
import numpy as np
import pandas as pd
import joblib

from model import FTTransformer


# ============================================================
# CONFIGURATION
# ============================================================

MODEL_PATH = "models/cardiosecure_model.pth"
SCALER_PATH = "models/cardiosecure_scaler.pkl"
FEATURES_PATH = "models/cardiosecure_features.pkl"

DEVICE = torch.device("cpu")


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="CardioSecure API",
    description="AI-powered cardiovascular prediction API",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# LOAD SCALER
# ============================================================

try:
    scaler = joblib.load(SCALER_PATH)

    print("\nScaler loaded successfully!")

    if hasattr(scaler, "n_features_in_"):
        print("Scaler expects:", scaler.n_features_in_)

except Exception as e:
    print(f"\nERROR loading scaler: {e}")
    raise


# ============================================================
# LOAD FEATURE ORDER
# ============================================================

try:
    feature_columns = joblib.load(FEATURES_PATH)

    # Convert to normal Python list if needed
    feature_columns = list(feature_columns)

    print("\nFeature columns loaded successfully!")
    print("Number of model features:", len(feature_columns))

    print("\nFeature order:")

    for i, feature in enumerate(feature_columns, start=1):
        print(f"{i}. {feature}")

except Exception as e:
    print(f"\nERROR loading feature columns: {e}")
    raise


# ============================================================
# VALIDATE FEATURE COUNT
# ============================================================

if len(feature_columns) != 11:
    raise RuntimeError(
        f"Expected 11 features, but found {len(feature_columns)}."
    )

if hasattr(scaler, "n_features_in_"):
    if scaler.n_features_in_ != len(feature_columns):
        raise RuntimeError(
            "Scaler feature count does not match feature_columns count. "
            f"Scaler expects {scaler.n_features_in_}, "
            f"but feature_columns has {len(feature_columns)}."
        )


# ============================================================
# CREATE MODEL
#
# IMPORTANT:
# These values must be EXACTLY the same as training.
# ============================================================

model = FTTransformer(
    num_features=len(feature_columns),
    d_token=64,
    n_heads=4,
    n_layers=3,
    dropout=0.2
).to(DEVICE)


# ============================================================
# LOAD TRAINED MODEL
# ============================================================

try:
    checkpoint = torch.load(
        MODEL_PATH,
        map_location=DEVICE
    )

    # Support checkpoints saved in different formats
    if isinstance(checkpoint, dict):

        if "model_state_dict" in checkpoint:
            state_dict = checkpoint["model_state_dict"]

        elif "state_dict" in checkpoint:
            state_dict = checkpoint["state_dict"]

        else:
            state_dict = checkpoint

    else:
        state_dict = checkpoint

    # Remove "module." prefix if model was trained with DataParallel
    cleaned_state_dict = {}

    for key, value in state_dict.items():

        if key.startswith("module."):
            new_key = key.replace("module.", "", 1)
        else:
            new_key = key

        cleaned_state_dict[new_key] = value

    model.load_state_dict(
        cleaned_state_dict,
        strict=True
    )

    model.eval()

    print("\nCardioSecure model loaded successfully!")
    print("Model is ready for prediction.\n")

except Exception as e:
    print(f"\nERROR loading model: {e}")
    raise


# ============================================================
# INPUT SCHEMA
# ============================================================

class PatientData(BaseModel):
    features: list[float] = Field(
        ...,
        min_length=11,
        max_length=11,
        description=(
            "Exactly 11 features in this order: "
            "age, sex, chest pain type, resting bp s, cholesterol, "
            "fasting blood sugar, resting ecg, max heart rate, "
            "exercise angina, oldpeak, ST slope"
        )
    )


# ============================================================
# HOME ROUTE
# ============================================================

@app.get("/")
def home():

    return {
        "message": "CardioSecure API is running!",
        "model": "FT-Transformer",
        "expected_features": len(feature_columns),
        "feature_order": feature_columns
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "model_loaded": True,
        "scaler_loaded": True,
        "expected_features": len(feature_columns)
    }


# ============================================================
# PREDICTION ROUTE
# ============================================================

@app.post("/predict")
def predict(data: PatientData):

    try:

        # ----------------------------------------------------
        # VALIDATE FEATURE COUNT
        # ----------------------------------------------------

        if len(data.features) != len(feature_columns):

            raise HTTPException(
                status_code=400,
                detail=(
                    f"Exactly {len(feature_columns)} "
                    "input features are required."
                )
            )


        # ----------------------------------------------------
        # CHECK FOR INVALID NUMBERS
        # ----------------------------------------------------

        features_array = np.array(
            data.features,
            dtype=np.float64
        )

        if not np.isfinite(features_array).all():

            raise HTTPException(
                status_code=400,
                detail="All features must be valid finite numbers."
            )


        # ----------------------------------------------------
        # DEBUG: SHOW RECEIVED FEATURES
        # ----------------------------------------------------

        print("\n" + "=" * 70)
        print("NEW PREDICTION REQUEST")
        print("=" * 70)

        print("\nReceived features:")

        for index, (name, value) in enumerate(
            zip(feature_columns, data.features),
            start=1
        ):
            print(
                f"{index}. {name}: {value}"
            )


        # ----------------------------------------------------
        # CREATE DATAFRAME
        #
        # EXACT SAME FEATURE ORDER AS TRAINING
        # ----------------------------------------------------

        input_data = pd.DataFrame(
            [data.features],
            columns=feature_columns
        )


        print("\nInput DataFrame:")

        print(input_data.to_string(index=False))


        # ----------------------------------------------------
        # SCALE DATA
        #
        # EXACT SAME SCALER USED DURING TRAINING
        # ----------------------------------------------------

        input_scaled = scaler.transform(
            input_data
        )


        print("\nScaled input:")

        print(
            np.round(
                input_scaled,
                6
            )
        )


        # ----------------------------------------------------
        # CONVERT TO PYTORCH TENSOR
        # ----------------------------------------------------

        x = torch.tensor(
            input_scaled,
            dtype=torch.float32,
            device=DEVICE
        )


        print("\nTensor shape:")

        print(x.shape)


        # ----------------------------------------------------
        # MODEL PREDICTION
        # ----------------------------------------------------

        with torch.no_grad():

            logits = model(x)

            # Handle models that return shape [batch, 1]
            logits = logits.squeeze()

            probability = torch.sigmoid(
                logits
            ).item()


        # ----------------------------------------------------
        # CLASSIFICATION
        # ----------------------------------------------------

        prediction = (
            "High Risk"
            if probability >= 0.5
            else "Low Risk"
        )


        # ----------------------------------------------------
        # DEBUG: SHOW RESULT
        # ----------------------------------------------------

        print("\n" + "-" * 70)

        print(
            "Model logit:",
            round(float(logits.item()), 6)
        )

        print(
            "Probability:",
            round(float(probability), 6)
        )

        print(
            "Prediction:",
            prediction
        )

        print("=" * 70 + "\n")


        # ----------------------------------------------------
        # RETURN RESULT
        # ----------------------------------------------------

        return {
            "prediction": prediction,
            "probability": round(
                float(probability),
                6
            ),
            "logit": round(
                float(logits.item()),
                6
            )
        }


    except HTTPException:
        raise


    except Exception as e:

        print("\nPREDICTION ERROR:")
        print(str(e))

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":

    import uvicorn
    import os

    print("\n" + "=" * 70)
    print("STARTING CARDIOSECURE API")
    print("=" * 70)

    print("API URL: http://127.0.0.1:8000")
    print("Swagger UI: http://127.0.0.1:8000/docs")

    print("\nExpected feature order:")

    for i, feature in enumerate(
        feature_columns,
        start=1
    ):
        print(f"{i}. {feature}")

    print("=" * 70 + "\n")


    uvicorn.run(
        app,
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 8000))
    )