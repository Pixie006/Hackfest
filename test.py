# actions/actions.py
from gtts import gTTS
import os
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

class ActionVoiceOutput(Action):

    def name(self) -> str:
        return "action_voice_output"

    def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: dict) -> list:
        text = tracker.latest_message.get('text')
        response = self.get_response(text)
        tts = gTTS(response, lang='en')
        tts.save("response.mp3")
        os.system("mpg321 response.mp3")
        dispatcher.utter_message(response)
        return []

    def get_response(self, text: str) -> str:
        # Implement your response logic here
        responses = {
            "hi": "Hello!, I am Mitra How can I assist you today?",
            "hello": "Hi there! What can I do for you?",
            "loan": "Are you interested in learning more about our home loans or personal loans?",
            "contact": "You can reach us at contact@mybank.com or call us at (123) 456-7890.",
            "account": "Need help with your account? I can assist with account queries and transactions.",
            "default": "I'm sorry, I didn't understand that. Could you please rephrase?"
        }
        return responses.get(text.lower(), responses["default"])
