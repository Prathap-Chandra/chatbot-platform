from flask import request
from .service import chat_with_your_pdf, upload_your_pdf, search_visually_similar_images, generate_image_from_text, send_image

def init_routes(app):

    @app.route('/conversation', methods=['POST'])
    def get_conversations():
        data = request.get_json()
        return data
