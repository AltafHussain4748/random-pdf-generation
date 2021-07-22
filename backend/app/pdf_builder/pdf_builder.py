import random
import string
from app.utilities.utility import generate_random_number, get_size_of
from app.utilities.constants import FILE_SIZE, SEPARATOR, NUM_OF_OBJECTS, STATIC_PATH
import pdfkit
from app.utilities.utility import get_size_of, generate_file_name


class ObjectGenerator:
    RANDOM_DECIMALS = 10
    REAL_NUMBER_DIGITS = 100000

    @staticmethod
    def gen_alphabetical():
        return ''.join(random.choices(
            string.ascii_letters, k=generate_random_number()))

    @classmethod
    def gen_real_number(cls):
        return round(random.uniform(cls.REAL_NUMBER_DIGITS, generate_random_number(
        )), generate_random_number(limit=cls.RANDOM_DECIMALS))

    @staticmethod
    def gen_integer():
        return ''.join(random.choices(
            string.digits, k=generate_random_number()))

    @staticmethod
    def gen_alphanumeric():
        return ''.join(random.choices(
            string.ascii_letters + string.digits, k=generate_random_number()))


class ContentBuilder:

    def __init__(self) -> None:
        self.object_generator = {
            1: ObjectGenerator.gen_alphabetical,
            2: ObjectGenerator.gen_real_number,
            3: ObjectGenerator.gen_integer,
            4: ObjectGenerator.gen_alphanumeric,
        }
        self.counter = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
        }
        self.content = []

    def build_content(self):
        skip_seprator = True
        memory_size = 0
        separator_size = get_size_of(SEPARATOR)
        while(memory_size < FILE_SIZE):
            if not skip_seprator:
                memory_size += separator_size
                random_number = generate_random_number(limit=NUM_OF_OBJECTS)
                value = self.object_generator[random_number]()
                self.content.append(str(value))
                self.counter.update(
                    {random_number: self.counter[random_number]+1})
                generated_size = get_size_of(value)
                memory_size += generated_size
            skip_seprator = False
        return self.counter, self.content


class PdfBuilder:

    def __init__(self) -> None:
        self.content_builer = ContentBuilder()

    def generate_pdf(self):
        try:
            generate_file_name()
            counter, content = self.content_builer.build_content()
            file_content = SEPARATOR.join(content)
            file_name = generate_file_name()
            pdfkit.from_string(file_content, file_name)
            return counter, file_name
        except Exception:
            return {'error': True}, None
