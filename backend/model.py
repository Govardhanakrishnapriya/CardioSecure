import torch
import torch.nn as nn


class FTTransformer(nn.Module):

    def __init__(
        self,
        num_features,
        d_token=64,
        n_heads=4,
        n_layers=3,
        dropout=0.2
    ):
        super().__init__()

        self.feature_embeddings = nn.Parameter(
            torch.randn(
                num_features,
                d_token
            ) * 0.02
        )

        self.cls_token = nn.Parameter(
            torch.randn(
                1,
                1,
                d_token
            ) * 0.02
        )

        encoder_layer = nn.TransformerEncoderLayer(
            d_model=d_token,
            nhead=n_heads,
            dim_feedforward=d_token * 4,
            dropout=dropout,
            activation="gelu",
            batch_first=True,
            norm_first=True
        )

        self.transformer = nn.TransformerEncoder(
            encoder_layer,
            num_layers=n_layers
        )

        self.norm = nn.LayerNorm(
            d_token
        )

        self.classifier = nn.Sequential(
            nn.Linear(
                d_token,
                32
            ),
            nn.GELU(),
            nn.Dropout(
                dropout
            ),
            nn.Linear(
                32,
                1
            )
        )


    def forward(self, x):

        x = (
            x.unsqueeze(-1)
            *
            self.feature_embeddings.unsqueeze(0)
        )

        batch_size = x.size(0)

        cls = self.cls_token.expand(
            batch_size,
            -1,
            -1
        )

        x = torch.cat(
            [cls, x],
            dim=1
        )

        x = self.transformer(x)

        x = x[:, 0, :]

        x = self.norm(x)

        output = self.classifier(x)

        return output.squeeze(-1)