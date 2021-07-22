from random import randrange
from app.utilities.constants import RANDOM_NUMBER_LIMIT, STATIC_PATH
import sys
from datetime import datetime


def generate_random_number(limit=RANDOM_NUMBER_LIMIT):
    return randrange(1, limit)


def get_size_of(value):
    return sys.getsizeof(value)


def generate_file_name():
    current_time = datetime.now().strftime("%m-%d-%Y, %H:%M:%S").replace(', ', '-')
    return f'{STATIC_PATH}report-content-{current_time}.pdf'
