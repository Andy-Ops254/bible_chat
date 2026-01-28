import random

# emotion_verses.py

EMOTION_VERSES = {
    "anxious": [
        "PHP.4.6", "PHP.4.7", "MAT.6.34", "1PE.5.7", "ISA.41.10",
        "PSA.94.19", "PSA.37.7", "PRO.12.25", "LUK.12.22",
        "JHN.14.1", "PSA.46.10", "ISA.26.3"
    ],

    "worried": [
        "PHP.4.6", "MAT.6.34", "1PE.5.7",
        "LUK.10.41", "PRO.3.5", "PSA.55.22"
    ],

    "stressed": [
        "MAT.11.28", "PHP.4.6", "PSA.55.22",
        "EXO.18.18", "NUM.11.14", "1KI.19.4",
        "PSA.61.2", "ISA.40.29"
    ],

    "sad": [
        "PSA.34.18", "JHN.16.33", "2CO.1.3", "PSA.147.3", "MAT.5.4",
        "1SA.1.10", "JOB.3.26", "PSA.42.3", "ROM.12.15",
        "REV.21.4"
    ],

    "depressed": [
        "PSA.42.11", "ISA.41.10", "DEU.31.8",
        "1KI.19.4", "JOB.30.25", "PSA.88.3",
        "LAM.3.31", "2CO.4.16"
    ],

    "down": [
        "PSA.34.18", "2CO.1.3",
        "PSA.143.7", "ISA.57.15"
    ],

    "angry": [
        "EPH.4.26", "JAM.1.19", "PRO.15.1", "PRO.16.32", "COL.3.8",
        "GEN.4.6", "NUM.20.10", "PSA.37.8",
        "ECC.7.9", "MAT.5.22"
    ],

    "frustrated": [
        "JAM.1.19", "PRO.15.1",
        "NUM.11.11", "JOB.7.11", "PSA.73.21"
    ],

    "upset": [
        "EPH.4.26", "PSA.37.8",
        "JON.4.9", "HAB.1.2"
    ],

    "grateful": [
        "1TH.5.18", "PSA.100.4", "COL.3.17", "PSA.107.1",
        "DEU.8.10", "1CH.16.34", "PSA.136.1",
        "HEB.12.28"
    ],

    "thankful": [
        "1TH.5.18", "PSA.100.4",
        "PSA.95.2", "EPH.5.20"
    ],

    "blessed": [
        "JAM.1.17", "PSA.103.2",
        "GEN.12.2", "DEU.28.2", "MAT.5.3",
        "LUK.1.45", "EPH.1.3"
    ],

    "lonely": [
        "DEU.31.6", "PSA.23.4", "HEB.13.5", "MAT.28.20",
        "GEN.2.18", "PSA.25.16", "PSA.68.6",
        "2TI.4.16"
    ],

    "alone": [
        "DEU.31.6", "HEB.13.5",
        "PSA.102.7", "JHN.16.32"
    ],

    "isolated": [
        "PSA.68.6", "PSA.23.4",
        "LEV.13.46", "LAM.3.28"
    ],

    "fearful": [
        "ISA.41.10", "PSA.56.3", "2TI.1.7", "PSA.27.1", "JHN.14.27",
        "GEN.15.1", "DEU.20.1", "PSA.118.6",
        "ROM.8.15", "REV.1.17"
    ],

    "afraid": [
        "ISA.41.10", "PSA.56.3", "2TI.1.7",
        "GEN.26.24", "JOS.1.9"
    ],

    "scared": [
        "PSA.27.1", "PSA.56.3",
        "EXO.14.13", "MRK.4.40"
    ],

    "joyful": [
        "PSA.118.24", "PHP.4.4", "NEH.8.10", "PSA.16.11",
        "DEU.16.15", "PSA.30.5", "ISA.12.3",
        "LUK.2.10", "JHN.15.11"
    ],

    "happy": [
        "PSA.118.24", "PHP.4.4", "PRO.17.22",
        "ECC.3.12", "ROM.14.17"
    ],

    "excited": [
        "PSA.16.11", "NEH.8.10",
        "1SA.18.6", "LUK.1.44"
    ],

    "hopeless": [
        "JER.29.11", "ROM.15.13", "PSA.42.11", "LAM.3.22",
        "JOB.14.7", "PSA.130.5", "MIC.7.7",
        "1PE.1.3"
    ],

    "discouraged": [
        "ISA.41.10", "JOS.1.9",
        "DEU.1.21", "GAL.6.9", "HEB.12.11"
    ],

    "defeated": [
        "2CO.4.8", "PSA.42.11",
        "ROM.8.37", "1JN.5.4"
    ],

    "confused": [
        "JAM.1.5", "PRO.3.5", "ISA.30.21",
        "EXO.14.15", "PSA.77.19",
        "1CO.14.33"
    ],

    "lost": [
        "PRO.3.5", "PSA.119.105",
        "ISA.53.6", "LUK.19.10"
    ],

    "uncertain": [
        "JAM.1.5", "PRO.3.6",
        "PSA.32.8", "ROM.8.28"
    ],

    "tired": [
        "MAT.11.28", "ISA.40.31", "PSA.23.2",
        "EXO.33.14", "PSA.127.2"
    ],

    "exhausted": [
        "MAT.11.28", "ISA.40.31",
        "1KI.19.5", "JDG.8.4"
    ],

    "weary": [
        "ISA.40.31", "MAT.11.28",
        "GAL.6.9", "REV.14.13"
    ],

    "guilty": [
        "1JN.1.9", "PSA.103.12", "ISA.1.18",
        "PSA.32.5", "ROM.5.1"
    ],

    "ashamed": [
        "1JN.1.9", "ROM.8.1",
        "PSA.25.3", "ROM.10.11"
    ],

    "regretful": [
        "PSA.51.10", "1JN.1.9",
        "2CO.7.10", "LUK.22.62"
    ]
}

DEFAULT_VERSES = [
    "PSA.46.1", "JHN.3.16", "PSA.23.1",
    "PRO.3.5", "JER.29.11",
    "GEN.1.1", "REV.22.21"
]

#creating a function that analyzes emotion and matches it to the right one
def detect_emotion(emotion_text):
    #convert to lowercase for matching
    text_lower = emotion_text.lower()
    for emotion, verses in EMOTION_VERSES.item():
        if emotion in text_lower:
            return emotion
    #if no emotion detected return none
    return None


def get_verse_for_emotion(emotion):
    #function checks the users input then loops through the text for emotion,
    #it checks to see if the user's input matches the emotion key in the dictionary
    #generates a list for that emotion and picks a random verse based on the emotion
    emotion = emotion.strip().lower()
    if emotion in EMOTION_VERSES:
        verse_List = EMOTION_VERSES['emotion']
        return random.choice(verse_List)
    else:
        return random.choice(DEFAULT_VERSES)