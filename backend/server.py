from flask import Flask, request
from flask_restful import Resource, Api
from app.pdf_builder.pdf_builder import PdfBuilder
from app.utilities.constants import STATIC_PATH
from flask_cors import CORS

app = Flask(__name__, static_folder=STATIC_PATH)

# handle cors to access from different port and host
CORS(app)

api = Api(app)


class GeneratePdf(Resource):
    def get(self):
        pdf_builder = PdfBuilder()
        report, file_path = pdf_builder.generate_pdf()
        return {'report': report, 'link': file_path}


api.add_resource(GeneratePdf, '/generate-pdf')

if __name__ == '__main__':
    app.run(debug=True)
