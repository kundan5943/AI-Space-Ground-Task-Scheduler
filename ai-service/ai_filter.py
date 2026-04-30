# Simple domain keyword based AI filter

VALID_KEYWORDS = [
    # Earth & Environment
    "flood",
    "zone",
    "image",
    "analysis",
    "wildfire",
    "spread",
    "detection",
    "agricultural",
    "land",
    "mapping",
    "coastal",
    "erosion",
    "monitoring",
    "urban",
    "expansion",
    "glacier",
    "movement",
    "tracking",
    "Earth", 
    "observation",

    # Weather & Atmosphere
    "storm",
    "path",
    "prediction",
    "sea",
    "surface",
    "temperature",
    "air",
    "quality",
    "index",
    "computation",

    # Emergency & Defense
    "disaster",
    "damage",
    "assessment",
    "search",
    "rescue",
    "scanning",
    "border",
    "surveillance",
    "processing",

    # Satellite System
    "satellite",
    "health",
    "telemetry",
    "check",
    "onboard",
    "model",
    "retraining",
    "data",
    "compression",
    "transmission",
    "node",
    "battery",
    "optimization",
    "routine"
]


def is_valid_task(text: str) -> bool:
    text = text.lower()

    for keyword in VALID_KEYWORDS:
        if keyword in text:
            return True

    return False